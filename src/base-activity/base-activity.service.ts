import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActionEnum } from '../enums/action';
import { RedisService } from '../redis/redis.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class BaseActivityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityModel: string, // Optional dynamic activity model (e.g., 'accountActivity')
    private readonly redis: RedisService, // Inject the Redis service
  ) {}

  async logActivity(
    targetId: number,
    action: ActionEnum,
    data: string,
    actorId: number,
  ): Promise<any> {
    try {
      return await this.prisma[this.activityModel].create({
        data: {
          targetId,
          action,
          data,
          actorId,
          createdAt: new Date(),
        }
      });

      // Clear the cache
    } catch (error) {
      throw new Error(`Error logging activity: ${error.message}`);
    }
  }

  async buildAuthorizationFilter(user: any, filters?: any): Promise<any> {
    const { role, districtId, zoneId, villageId, mahalluId } = user;
    const baseFilter = filters || {};

    switch (role) {
      case RoleEnum.SUPER_ADMIN:
        // SuperAdmin has access to all events
        return baseFilter;

      case RoleEnum.DISTRICT_ADMIN:
        // Filter events by Mahallu within the district (indirect relationship via Zone and Village)
        const districtMahallus = await this.prisma.mahallu.findMany({
          where: {
            village: {
              zone: {
                districtId,
              },
            },
          },
          select: {
            id: true,
            village: {
              select: {
                zoneId: true,
                zone: {
                  select: {
                    districtId: true,
                  },
                },
              },
            },
          },
        });
        return {
          ...baseFilter,
          mahalluId: { in: districtMahallus.map((mahallu) => mahallu.id) },
        };

      case RoleEnum.ZONE_ADMIN:
        // Filter events by Mahallu within the zone (indirect relationship via Village)
        const zoneMahallus = await this.prisma.mahallu.findMany({
          where: {
            village: {
              zoneId,
            },
          },
          select: {
            id: true,
            villageId: true,
            village: {
              select: {
                zoneId: true,
              },
            },
          },
        });
        return {
          ...baseFilter,
          mahalluId: { in: zoneMahallus.map((mahallu) => mahallu.id) },
        };

      case RoleEnum.VILLAGE_ADMIN:
        // Filter events by Mahallu within the specific village
        const villageMahallus = await this.prisma.mahallu.findMany({
          where: {
            villageId,
          },
          select: {
            id: true,
            villageId: true,
          },
        });
        return {
          ...baseFilter,
          mahalluId: { in: villageMahallus.map((mahallu) => mahallu.id) },
        };

      case RoleEnum.MAHALLU_ADMIN:
        // Filter events created by the specific MahalAdmin
        return {
          ...baseFilter,
          mahalluId: mahalluId,
          active: false, // Only unverified events
        };

      default:
        throw new ForbiddenException(
          'User role not authorized to view events.',
        );
    }
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
    filters: { [key: string]: any } = {},
    sort: { field: string; direction: 'asc' | 'desc' } = {
      field: 'createdAt',
      direction: 'asc',
    },
    relationsToFilter?: { [key: string]: { [key: string]: any } }, // Filters on relationships
    relationsToInclude?: string[], // List of relationships to include dynamically
    user?:Credential
  ): Promise<any[]> {
    try {
      // Generate a granular Redis cache key
      const cacheKey = `${this.activityModel}:filters:${JSON.stringify(filters)}:relationFilters:${JSON.stringify(
        relationsToFilter,
      )}:relationsToInclude:${JSON.stringify(relationsToInclude)}:limit:${limit}:offset:${offset}`;

      // Check for cached result
      const cachedResult = await this.redis.get(cacheKey);

      if (cachedResult) {
        return cachedResult as any;
      }

      // Build the `where` clause for filters
      const whereClause: any = {
        ...filters, // Main model filters
      };

      // Add filters on relationships
      if (relationsToFilter) {
        for (const [relation, relationFilters] of Object.entries(
          relationsToFilter,
        )) {
          whereClause[relation] = {
            ...relationFilters,
          };
        }
      }

      // Dynamically include relationships
      const includeClause = relationsToInclude
        ? relationsToInclude.reduce((acc, relation) => {
            const parts = relation.split('.'); // Handle nested relations
            parts.reduce((nested, part, index) => {
              if (!nested[part])
                nested[part] = index === parts.length - 1 ? true : {};
              return nested[part];
            }, acc);
            return acc;
          }, {})
        : undefined;

      // Fetch data from Prisma
      const results = await this.prisma[this.activityModel].findMany({
        where: whereClause,
        take: limit,
        skip: offset,
        orderBy: { [sort.field]: sort.direction },
        include: includeClause,
      });

      // Cache the result
      await this.redis.set(cacheKey, results, 3600); // Cache for 1 hour
      return results;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to fetch ${this.activityModel} records.`,
      );
    }
  }
}
