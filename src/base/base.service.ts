import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { BaseActivityService } from '../base-activity/base-activity.service';
import { ActionEnum } from '../enums/action';
import { QueueService } from '../queue/queue.service';
import { Credential, RoleEnum } from '@prisma/client';
import { ValidationRule } from '../utils/types';

@Injectable()
export class BaseService<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly redis: RedisService,
    protected readonly queueProcessor: QueueProcessor,
    protected readonly queueService: QueueService,
    private readonly model: string, // Model name (e.g., 'user'),
    private readonly activityService?: BaseActivityService, // Optional dynamic activity service
  ) {}

  private async logActivity(
    targetId: number,
    action: ActionEnum,
    data: string,
    actorId: number,
  ) {
    if (this.activityService) {
      await this.activityService.logActivity(targetId, action, data, actorId);
    }
  }

  public async validateData(
    data: any,
    validationRules: ValidationRule[],
    existingRecord: any = null, // Existing record for updates
  ): Promise<void> {
    for (const rule of validationRules) {
      const value = data[rule.field];

      // Skip validation for required fields during updates
      if (
        !existingRecord &&
        rule.required &&
        (value === undefined || value === null)
      ) {
        throw new BadRequestException(`${rule.field} is required.`);
      }

      // Check data type
      if (
        value !== undefined &&
        !(
          (rule.type === 'array' && Array.isArray(value)) ||
          (rule.type === 'date' && value instanceof Date) ||
          (rule.type !== 'array' &&
            rule.type !== 'date' &&
            typeof value === rule.type)
        )
      ) {
        throw new BadRequestException(
          `${rule.field} must be of type ${rule.type}.`,
        );
      }

      // Check enum values
      if (rule.enum && value !== undefined) {
        if (!rule.enum.includes(value)) {
          throw new BadRequestException(
            `${rule.field} must be one of ${rule.enum.join(', ')}.`,
          );
        }
      }

      // Check uniqueness if provided
      if (rule.unique && value !== undefined) {
        // Skip uniqueness check if value matches the old value in updates
        if (existingRecord && value === existingRecord[rule.field]) {
          continue;
        }

        const exists = await this.prisma[this.model].findFirst({
          where: { [rule.field]: value },
        });

        if (exists) {
          throw new BadRequestException(
            `${rule.field} with value "${value}" already exists.`,
          );
        }
      }

      // Check references
      if (rule.reference) {
        const refField = rule.reference.field || 'id';
        const exists = await this.prisma[rule.reference.model].findFirst({
          where: { [refField]: value },
        });

        if (!exists) {
          throw new BadRequestException(
            `${rule.field} references a non-existent ${rule.reference.model} entity.`,
          );
        }
      }
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

  async count(
    filters: { [key: string]: any } = {},
    relationsToFilter?: { [key: string]: { [key: string]: any } },
  ): Promise<number> {
    try {
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

      // Fetch data from Prisma
      const count = await this.prisma[this.model].count({
        where: whereClause,
      });
      return count;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to fetch ${this.model} records.`,
      );
    }
  }

  async authorizeForUpdate(user: any, id: any): Promise<void> {
    const existingRecord = await this.prisma[this.model].findUnique({
      where: { id },
      select: {
        mahalluId: true,
      },
    });

    // Authorization Logic
    if (user.role === RoleEnum.SUPER_ADMIN) {
      // SuperAdmin can update any record
    } else if (user.role === RoleEnum.MAHALLU_ADMIN) {
      if (existingRecord.mahalluId !== user.mahalluId) {
        throw new ForbiddenException(
          `Access denied. You can only update records belonging to your Mahallu.`,
        );
      }
    } else {
      throw new ForbiddenException(
        `Access denied. Only SuperAdmin or MahalluAdmin can update records.`,
      );
    }
  }

  async create(
    data: any,
    validationRules: ValidationRule[],
    actor?: Credential,
  ): Promise<T> {
    try {
      await this.validateData(data, validationRules);

      const created = await this.prisma[this.model].create({ data });

      // Log activity (if activityService and activityModel are provided)
      await this.logActivity(
        created.id,
        ActionEnum.CREATE,
        `${JSON.stringify(data)}`,
        actor?.id || 0,
      );

      // delete cache for the model
      await this.redis.deleteByPattern(`${this.model}:*`);

      return created;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        error.message || `Failed to create ${this.model}.`,
      );
    }
  }

  async createMany(
    data: any[],
    validationRules: ValidationRule[],
    actor?: Credential,
  ): Promise<T[]> {
    try {
      for (const item of data) {
        await this.validateData(item, validationRules);
      }

      const created = await this.prisma[this.model].createMany({ data });

      // Log activity (if activityService and activityModel are provided)
      for (const entity of created) {
        await this.logActivity(
          entity.id,
          ActionEnum.CREATE,
          `${JSON.stringify(data)}`,
          actor?.id || 0,
        );
      }

      // Delete cache for the model
      await this.redis.deleteByPattern(`${this.model}:*`);

      return created;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to create ${this.model} records.`,
      );
    }
  }

  async findOne(
    value: any, // Value to search for
    field: string = 'id', // Field to search on (default: 'id')
    relationsToInclude?: string[], // Relationships to include dynamically
  ): Promise<T | null> {
    try {
      // Generate a granular Redis cache key based on the field and relations
      const cacheKey = `${this.model}:findOne:${field}:${value}:relationsToInclude:${JSON.stringify(
        relationsToInclude,
      )}`;

      // Check Redis cache for the result
      const cachedResult = await this.redis.get(cacheKey);
      if (cachedResult) {
        return cachedResult as any;
      }

      // Build the `where` clause dynamically based on the field
      const whereClause: any = { [field]: value };

      // Dynamically include relationships
      // const includeClause = relationsToInclude
      //   ? relationsToInclude.reduce((acc, relation) => {
      //       const parts = relation.split('.'); // Handle nested relations
      //       parts.reduce((nested, part, index) => {
      //         if (!nested[part])
      //           nested[part] = index === parts.length - 1 ? true : {};
      //         return nested[part];
      //       }, acc);
      //       return acc;
      //     }, {})
      //   : undefined;

      const buildIncludeClause = (relations: string[]) => {
        const includeClause: any = {};
        const processedRelations = new Set<string>();

        // First, determine which relations should be processed
        relations.forEach((relation) => {
          const isPrefixOfAnyOther = relations.some(
            (other) => other !== relation && other.startsWith(relation + '.'),
          );

          if (!isPrefixOfAnyOther) {
            processedRelations.add(relation);
          }
        });

        processedRelations.forEach((relation) => {
          const parts = relation.split('.');

          // Handle top-level relations
          if (parts.length === 1) {
            includeClause[parts[0]] = true;
            return;
          }

          // Nested relations handling
          let current = includeClause;

          for (let i = 1; i < parts.length; i++) {
            const part = parts[i];

            // Ensure the first parent exists
            if (i === 1) {
              if (!current[parts[0]]) {
                current[parts[0]] = { include: {} };
              }
              current = current[parts[0]].include;
            }

            // For subsequent nested parts
            if (i === parts.length - 1) {
              // Last part
              current[part] = true;
            } else {
              // Intermediate parts
              if (!current[part]) {
                current[part] = { include: {} };
              }
              current = current[part].include;
            }
          }
        });

        return includeClause;
      };

      // Dynamically include relationships
      const includeClause = relationsToInclude
        ? buildIncludeClause(relationsToInclude)
        : undefined;

      // Fetch the entity from Prisma
      const result = await this.prisma[this.model].findUnique({
        where: whereClause,
        include: includeClause,
      });

      if (!result) {
        throw new NotFoundException(
          `${this.model.charAt(0).toUpperCase() + this.model.slice(1)} not found with ${field}: ${value}.`,
        );
      }

      // Cache the result
      await this.redis.set(cacheKey, JSON.stringify(result), 3600); // Cache for 1 hour
      return result;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to fetch ${this.model} record.`,
      );
    }
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
    filters: { [key: string]: any } = {}, // Base filters
    sort: { field: string; direction: 'asc' | 'desc' } = {
      field: 'id',
      direction: 'asc',
    }, // Sorting options
    relationsToFilter?: { [key: string]: any }, // Nested filters for relations
    relationsToInclude?: string[], // Relationships to include dynamically
  ): Promise<T[]> {
    try {
      // Generate a granular Redis cache key
      const cacheKey = `${this.model}:filters:${JSON.stringify(filters)}:relationFilters:${JSON.stringify(
        relationsToFilter,
      )}:relationsToInclude:${JSON.stringify(relationsToInclude)}:limit:${limit}:offset:${offset}:sort:${JSON.stringify(sort)}`;

      // Check for cached result
      const cachedResult = await this.redis.get(cacheKey);

      // if (cachedResult) {
      //   return cachedResult as any;
      // }

      // Helper function to recursively build nested filters
      const buildNestedFilters = (filters: { [key: string]: any }) => {
        const whereClause: any = {};
        for (const key of Object.keys(filters)) {
          if (
            typeof filters[key] === 'object' &&
            !Array.isArray(filters[key])
          ) {
            // Nested relation filter
            whereClause[key] = buildNestedFilters(filters[key]);
          } else {
            // Base-level filter
            whereClause[key] = filters[key];
          }
        }
        return whereClause;
      };

      // Build the `where` clause for main filters and relationsToFilter
      const whereClause: any = {
        ...filters,
        ...buildNestedFilters(relationsToFilter || {}),
      };

      const buildIncludeClause = (relations: string[]) => {
        const includeClause: any = {};
        const processedRelations = new Set<string>();

        // First, determine which relations should be processed
        relations.forEach((relation) => {
          const isPrefixOfAnyOther = relations.some(
            (other) => other !== relation && other.startsWith(relation + '.'),
          );

          if (!isPrefixOfAnyOther) {
            processedRelations.add(relation);
          }
        });

        processedRelations.forEach((relation) => {
          const parts = relation.split('.');

          // Handle top-level relations
          if (parts.length === 1) {
            includeClause[parts[0]] = true;
            return;
          }

          // Nested relations handling
          let current = includeClause;

          for (let i = 1; i < parts.length; i++) {
            const part = parts[i];

            // Ensure the first parent exists
            if (i === 1) {
              if (!current[parts[0]]) {
                current[parts[0]] = { include: {} };
              }
              current = current[parts[0]].include;
            }

            // For subsequent nested parts
            if (i === parts.length - 1) {
              // Last part
              current[part] = true;
            } else {
              // Intermediate parts
              if (!current[part]) {
                current[part] = { include: {} };
              }
              current = current[part].include;
            }
          }
        });

        return includeClause;
      };

      // Dynamically include relationships
      const includeClause = relationsToInclude
        ? buildIncludeClause(relationsToInclude)
        : undefined;

      // console.log(whereClause);

      // Fetch data from Prisma
      const results = await this.prisma[this.model].findMany({
        where: whereClause,
        take: limit,
        skip: offset,
        orderBy: { [sort.field]: sort.direction },
        include: includeClause,
      });

      // Cache the result
      await this.redis.set(cacheKey, results, 3600); // Cache for 1 hour
      // return results;
      return results as any;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to fetch ${this.model} records.`,
      );
    }
  }

  async update(
    id: number,
    data: any,
    validationRules: ValidationRule[],
    actor?: Credential,
    isAuthorized?: boolean,
  ): Promise<T> {
    try {
      // if authorized then include mahalluId in existingRecord

      const existingRecord = await this.prisma[this.model].findUnique({
        where: { id },
      });

      if (!existingRecord) {
        throw new NotFoundException(`${this.model} with ID ${id} not found.`);
      }

      if (isAuthorized && actor) {
        await this.authorizeForUpdate(actor, id);
      }

      await this.validateData(data, validationRules, existingRecord);

      const updated = await this.prisma[this.model].update({
        where: { id },
        data,
      });

      // Log activity (if activityService and activityModel are provided)
      await this.logActivity(
        updated.id,
        ActionEnum.UPDATE,
        `${JSON.stringify(data)}`,
        actor?.id || 0,
      );

      // Delete cache for the model
      await this.redis.deleteByPattern(`${this.model}:*`);

      // Add update task to the queue
      // this.queueProcessor.attachWorker(
      //   `${this.model}Updates`,
      //   async (taskData) => {
      //     console.log(`Processing update for ${this.model}:`, taskData);
      //   },
      // );
      // await this.queueService.enqueueJob(`${this.model}Updates`, { id, data });

      return updated;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to update ${this.model} with ID ${id}.`,
      );
    }
  }

  async updateMany(
    ids: number[],
    data: any[],
    validationRules: ValidationRule[],
    actor?: Credential,
  ): Promise<T[]> {
    try {
      if (ids.length !== data.length) {
        throw new BadRequestException(`IDs and data array lengths must match.`);
      }

      const existingRecords = await this.prisma[this.model].findMany({
        where: { id: { in: ids } },
      });

      const results = [];
      for (let i = 0; i < ids.length; i++) {
        if (!existingRecords.find((r) => r.id === ids[i])) {
          throw new NotFoundException(
            `${this.model} with ID ${ids[i]} not found.`,
          );
        }
        await this.validateData(
          data[i],
          validationRules,
          existingRecords.find((r) => r.id === ids[i]),
        );
        const updated = await this.prisma[this.model].update({
          where: { id: ids[i] },
          data: data[i],
        });
        results.push(updated);

        // Log activity (if activityService and activityModel are provided)
        for (const entity of updated) {
          await this.logActivity(
            entity.id,
            ActionEnum.UPDATE,
            `${JSON.stringify(data)}`,
            actor?.id || 0,
          );
        }

        // Delete cache for the model
        await this.redis.deleteByPattern(`${this.model}:*`);

        // Add update task to the queue
        // this.queueProcessor.attachWorker(
        //   `${this.model}Updates`,
        //   async (taskData) => {
        //     console.log(`Processing update for ${this.model}:`, taskData);
        //   },
        // );
        // await this.queueService.enqueueJob(`${this.model}Updates`, {
        //   id: ids[i],
        //   data: data[i],
        // });
      }

      return results;
    } catch (error) {
      throw new BadRequestException(
        error.message || `Failed to update ${this.model} records.`,
      );
    }
  }

  async remove(id: number, actor?: Credential): Promise<T> {
    // check the record is exist or not
    const existingRecord = await this.prisma[this.model].findUnique({
      where: { id },
    });

    if (!existingRecord) {
      throw new NotFoundException(`${this.model} with ID ${id} not found.`);
    }

    try {
      const deleted = await this.prisma[this.model].delete({
        where: {
          id,
        },
      });

      // Delete cache for the model
      await this.redis.deleteByPattern(`${this.model}:*`);

      // Log activity (if activityService and activityModel are provided)
      await this.logActivity(
        null,
        ActionEnum.DELETE,
        `${JSON.stringify(existingRecord)}`,
        actor?.id || 0,
      );

      return deleted;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        `Failed to delete ${this.model} with ID ${id}.`,
      );
    }
  }

  async removeMany(ids: number[], actor?: Credential): Promise<void> {
    try {
      // check the record is exist or not
      const existingRecords = await this.prisma[this.model].findMany({
        where: { id: { in: ids } },
      });

      // if record not found throw error
      if (existingRecords.length !== ids.length) {
        throw new NotFoundException(`${this.model} not found.`);
      }

      for (const id of ids) {
        await this.prisma[this.model].delete({ where: { id } });
      }

      for (const entity of existingRecords) {
        await this.logActivity(
          null,
          ActionEnum.DELETE,
          `${JSON.stringify(entity)}`,
          actor?.id || 0,
        );

        console.log('activityModel', this.model);
      }

      // Delete cache for the model
      await this.redis.deleteByPattern(`${this.model}:*`);

      return existingRecords;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete ${this.model} records.`,
      );
    }
  }

  async updateColumn(
    fieldName: string,
    value: any,
    validationRule: ValidationRule,
    existingRecord: any = null, // Optional existing record for updates
  ): Promise<void> {
    const {
      type,
      unique,
      required,
      reference,
      enum: enumValues,
    } = validationRule;

    // Check required field
    if (
      !existingRecord &&
      required &&
      (value === undefined || value === null)
    ) {
      throw new BadRequestException(`${fieldName} is required.`);
    }

    // Check data type
    if (
      value !== undefined &&
      !(
        (type === 'array' && Array.isArray(value)) ||
        (type === 'date' && value instanceof Date) ||
        (type !== 'array' && type !== 'date' && typeof value === type)
      )
    ) {
      throw new BadRequestException(`${fieldName} must be of type ${type}.`);
    }

    // Check enum values
    if (enumValues && value !== undefined) {
      if (!enumValues.includes(value)) {
        throw new BadRequestException(
          `${fieldName} must be one of ${enumValues.join(', ')}.`,
        );
      }
    }

    // Check uniqueness
    if (unique && value !== undefined) {
      // Skip uniqueness check if value matches the old value during updates
      if (existingRecord && value === existingRecord[fieldName]) {
        return;
      }

      const exists = await this.prisma[this.model].findFirst({
        where: { [fieldName]: value },
      });

      if (exists) {
        throw new BadRequestException(
          `${fieldName} with value "${value}" already exists.`,
        );
      }
    }

    // Check reference validity
    if (reference) {
      const refField = reference.field || 'id';
      const exists = await this.prisma[reference.model].findFirst({
        where: { [refField]: value },
      });

      if (!exists) {
        throw new BadRequestException(
          `${fieldName} references a non-existent ${reference.model} entity.`,
        );
      }
    }
  }
}
