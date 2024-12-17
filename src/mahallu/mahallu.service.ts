import { Injectable } from '@nestjs/common';
import { CreateMahalluInput } from './dto/create-mahallu.input';
import { Credential, Mahallu } from '@prisma/client';
import { UpdateMahalluInput } from './dto/update-mahallu.input';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { MahalluActivityService } from '../mahallu-activity/mahallu-activity.service';
import { CredentialService } from 'src/credential/credential.service';
import { RoleEnum } from 'src/enums/role';
import { MahalluRankingDetails, RankingDetails } from './entities/ranking';
@Injectable()
export class MahalluService extends BaseService<Mahallu> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    mahalluActivityService: MahalluActivityService,
    private readonly credentialService: CredentialService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'mahallu',
      mahalluActivityService,
    );
  }

  async isRegNoExists(regNo: string) {
    return await this.prisma.mahallu.findFirst({
      where: {
        regNo,
      },
      select: {
        id: true,
      },
    });
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (user && user.role === RoleEnum.VILLAGE_ADMIN) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }
    return super.count(authorizedFilter, relationsToFilter);
  }

  async create(data: any, validationRules: any, user?: Credential) {
    // assign username and password from data to anywhere else and remove them from data
    let { username, password, ...rest } = data;

    // check the regNo is already exists
    const isRegNoExists = await this.isRegNoExists(rest.regNo);

    if (isRegNoExists) {
      throw new Error('Reg No already exists');
    }

    // check the regNo , regNo should not include space , if it includes space then throw an error

    if (rest.regNo.includes(' ')) {
      throw new Error('Reg No should not include space');
    }

    // check the username is already exists
    const isUsernameExists =
      await this.credentialService.isUsernameExists(username);


    if (isUsernameExists) {
      //  throw new Error('Username already exists');
      username = username + '_' ;


      const isUsernameExists =
      await this.credentialService.isUsernameExists(username);

      if (isUsernameExists) {
        username = username + '.' ;
      }
     }

    // remove username and password from data
    data = rest;
    !data.createdById && (data.createdById = user.id);
     console.log(data);
     
    const mahallu = await super.create(data, validationRules, user);

    // after creating mahallu , create a credential for the mahallu
    await this.credentialService.create(
      {
        username,
        password,
        role: RoleEnum.MAHALLU_ADMIN,
        districtId: null,
        villageId: null,
        zoneId: null,
        mahalluId: mahallu.id,
      },
      [],
      user,
    );

    return mahallu;
  }

  async update(
    id: number,
    updateMahalluInput: UpdateMahalluInput,
    validationRule: any,
    user: Credential,
  ): Promise<Mahallu> {
    // check if the user is authorized to update the mahallu
    if (user.role !== RoleEnum.SUPER_ADMIN) {
      const mahallu = await this.prisma.mahallu.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!mahallu) {
        throw new Error('You are not authorized to update this mahallu');
      }
    }

    if (updateMahalluInput?.regNo?.includes(' ')) {
      throw new Error('Reg No should not include space');
    }

    return super.update(id, updateMahalluInput, validationRule, user);
  }

  async delete(id: number, user: Credential): Promise<Mahallu> {
    // check if the user is authorized to delete the mahallu

    if (user.role !== RoleEnum.SUPER_ADMIN) {
      const mahallu = await this.prisma.mahallu.findUnique({
        where: {
          id: id,
          createdById: user.id,
        },
      });

      if (!mahallu) {
        throw new Error('You are not authorized to delete this mahallu');
      }
    }

    return super.remove(id, user);
  }

  // async createMany(
  //   data: any[],
  //   validationRules: ValidationRule[],
  //   actor?: Credential,
  // ): Promise<any[]> {
  //   const dataWithActor = data.map((d) => ({
  //     ...d,
  //     createdById: actor?.id,
  //   }));

  //   // check the regNo is already exists
  //   const isRegNoExists = await Promise.all(
  //     dataWithActor.map((d) => this.isRegNoExists(d.regNo)),
  //   );

  //   if (isRegNoExists.some((r) => r)) {
  //     throw new Error('Reg No already exists');
  //   }

  //   // check the regNo , regNo should not include space , if it includes space then throw an error
  //   if (dataWithActor.some((d) => d.regNo.includes(' '))) {
  //     throw new Error('Reg No should not include space');
  //   }

  //   // check the username is already exists
  //   const isUsernameExists = await this.credentialService.isUsernameExists(
  //     dataWithActor[0].username,
  //   );

  //   if (isUsernameExists) {
  //     throw new Error('Username already exists');
  //   }

  //   // remove username and password from data
  //   dataWithActor.forEach((d) => {
  //     const { username, password, ...rest } = d;
  //     d = rest;
  //   });

  //   const mahallus = await super.createMany(
  //     dataWithActor,
  //     validationRules,
  //     actor,
  //   );

  //   // after creating mahallus , create a credential for the mahallus

  //   await Promise.all(
  //     mahallus.map(async (mahallu) => {
  //       await this.credentialService.create(
  //         {
  //           username: dataWithActor[0].username,
  //           password: dataWithActor[0].password,
  //           role: RoleEnum.ZONE_ADMIN,
  //           districtId: null,
  //           villageId: null,
  //           zoneId: null,
  //           mahalluId: mahallu.id,
  //         },
  //         [],
  //         actor,
  //       );
  //     }),
  //   );

  //   return mahallus;
  // }

  async createMany(data: any[], validationRules: any, user?: Credential) {

    const districts = [];

    for (let i = 0; i < data.length; i++) {
      let dt = await this.create(data[i], validationRules, user);
      districts.push(dt);
    }

    return districts;
  }

  
  async removeMany(ids: number[], actor?: Credential): Promise<void> {
    if (actor.role !== RoleEnum.SUPER_ADMIN) {
      const mahallus = await this.prisma.mahallu.findMany({
        where: {
          id: {
            in: ids,
          },
          createdById: actor?.id,
        },
      });

      if (mahallus.length !== ids.length) {
        throw new Error('You are not authorized to delete these mahallus');
      }
    }

    return super.removeMany(ids, actor);
  }

  async findAll(
    limit?: number,
    offset?: number,
    filters?: { [key: string]: any },
    sort?: { field: string; direction: 'asc' | 'desc' },
    relationsToFilter?: { [key: string]: any },
    relationsToInclude?: string[],
    user?: Credential,
  ): Promise<any[]> {
    // add filter for createdById
    let authorizedFilter = filters;
    if (user && user.role === RoleEnum.VILLAGE_ADMIN) {
      authorizedFilter = {
        ...filters,
        createdById: user.id,
      };
    }

    return super.findAll(
      limit,
      offset,
      authorizedFilter,
      sort,
      relationsToFilter,
      relationsToInclude,
    );
  }


  async getLeaderboard(
    limit = 10,
    offset = 0,
    searchName?: string, // Search filter for Mahallu name
    villageId?: number, // Filter by Village
    zoneId?: number, // Filter by Zone
    districtId?: number // Filter by District
  ): Promise<any[]> {
    // Build the where clause dynamically based on filters
    const whereClause: any = {
      name: searchName ? { contains: searchName, mode: 'insensitive' } : undefined, // Search Mahallu name
      village: villageId ? { id: villageId } : zoneId ? { zoneId: zoneId } : districtId ? { zone: { districtId: districtId } } : undefined, // Filter by village
    };
  
    // Clean up undefined values from whereClause
    Object.keys(whereClause).forEach(
      (key) => whereClause[key] === undefined && delete whereClause[key]
    );
  
    // Retrieve leaderboard with detailed aggregations and filters
    const leaderboard = await this.prisma.mahallu.findMany({
      take: limit,
      skip: offset,
      where: whereClause,
      orderBy: {
        totalPoints: 'desc',
      },
      select: {
        id: true,
        name: true,
        regNo: true,
        place: true,
        totalPoints: true,
        village: {
          select: {
            name: true,
            zone: {
              select: {
                name: true,
                district: {
                  select: { name: true },
                },
              },
            },
          },
        },
        _count: {
          select: {
            taskParticipants: true,
            otherPrograms: true,
            posts: true,
            events: true,
            jobs: true,
            badges: true,
          },
        },
        badges: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  
    // Transform the result to a more readable format
    return leaderboard.map((mahallu) => ({
      id: mahallu.id,
      name: mahallu.name,
      regNo: mahallu.regNo,
      place: mahallu.place,
      totalPoints: mahallu.totalPoints,
      village: mahallu.village?.name,
      zone: mahallu.village?.zone?.name,
      district: mahallu.village?.zone?.district?.name,
      counts: {
        taskParticipants: mahallu._count.taskParticipants,
        otherPrograms: mahallu._count.otherPrograms,
        posts: mahallu._count.posts,
        events: mahallu._count.events,
        jobs: mahallu._count.jobs,
      },
      badgesCount: mahallu._count.badges,
      badges: mahallu.badges,
    }));
  }
  
  

  async getMahalluRankingDetails(mahalluId: number): Promise<MahalluRankingDetails> {
    // Fetch the Mahallu with its associated hierarchy
    const mahallu = await this.prisma.mahallu.findUnique({
      where: { id: mahalluId },
      include: {
        village: {
          include: {
            zone: {
              include: {
                district: true
              }
            }
          }
        }
      }
    });

    if (!mahallu) {
      throw new Error('Mahallu not found');
    }

    // Calculate ranking details
    const overallRanking = await this.calculateOverallRankingDetails(mahallu.totalPoints);

    const villageRanking = mahallu.villageId 
      ? await this.calculateVillageRankingDetails(mahallu.villageId, mahallu.totalPoints, mahallu.name) 
      : undefined;

    const zoneRanking = mahallu.village?.zoneId
      ? await this.calculateZoneRankingDetails(mahallu.village.zoneId, mahallu.totalPoints, mahallu.village.name)
      : undefined;

    const districtRanking = mahallu.village?.zone?.districtId
      ? await this.calculateDistrictRankingDetails(mahallu.village.zone.districtId, mahallu.totalPoints, mahallu.village.zone.name)
      : undefined;

    return {
      overallRanking,
      villageRanking,
      zoneRanking,
      districtRanking
    };
  }

  private async calculateOverallRankingDetails(points: number): Promise<RankingDetails> {
    const totalMahallus = await this.prisma.mahallu.count();
    const ranksAbove = await this.prisma.mahallu.count({
      where: { totalPoints: { gt: points } }
    });

    const rank = ranksAbove + 1;
    const percentile = ((totalMahallus - ranksAbove) / totalMahallus) * 100;

    return {
      rank,
      totalEntities: totalMahallus,
      percentile: Number(percentile.toFixed(2)),
      entityId: 0, // Overall doesn't have a specific entity
      entityName: 'Overall Mahallu Ranking'
    };
  }

  private async calculateVillageRankingDetails(
    villageId: number, 
    points: number, 
    mahalluName: string
  ): Promise<RankingDetails> {
    const village = await this.prisma.village.findUnique({
      where: { id: villageId },
      include: { _count: { select: { mahallus: true } } }
    });

    if (!village) {
      throw new Error('Village not found');
    }

    const ranksAbove = await this.prisma.mahallu.count({
      where: {
        villageId: villageId,
        totalPoints: { gt: points }
      }
    });

    const rank = ranksAbove + 1;
    const percentile = ((village._count.mahallus - ranksAbove) / village._count.mahallus) * 100;

    return {
      rank,
      totalEntities: village._count.mahallus,
      percentile: Number(percentile.toFixed(2)),
      entityId: villageId,
      entityName: mahalluName
    };
  }

  private async calculateZoneRankingDetails(
    zoneId: number, 
    points: number, 
    villageName: string
  ): Promise<RankingDetails> {
    // Get all village IDs in the zone
    const villageIds = await this.prisma.village.findMany({
      where: { zoneId: zoneId },
      select: { id: true }
    });

    const totalMahallus = await this.prisma.mahallu.count({
      where: { villageId: { in: villageIds.map(v => v.id) } }
    });

    const ranksAbove = await this.prisma.mahallu.count({
      where: {
        villageId: { in: villageIds.map(v => v.id) },
        totalPoints: { gt: points }
      }
    });

    const rank = ranksAbove + 1;
    const percentile = ((totalMahallus - ranksAbove) / totalMahallus) * 100;

    return {
      rank,
      totalEntities: totalMahallus,
      percentile: Number(percentile.toFixed(2)),
      entityId: zoneId,
      entityName: villageName
    };
  }

  private async calculateDistrictRankingDetails(
    districtId: number, 
    points: number, 
    zoneName: string
  ): Promise<RankingDetails> {
    // Get all zone IDs in the district
    const zoneIds = await this.prisma.zone.findMany({
      where: { districtId: districtId },
      select: { id: true }
    });

    // Get all village IDs in these zones
    const villageIds = await this.prisma.village.findMany({
      where: { zoneId: { in: zoneIds.map(z => z.id) } },
      select: { id: true }
    });

    const totalMahallus = await this.prisma.mahallu.count({
      where: { villageId: { in: villageIds.map(v => v.id) } }
    });

    const ranksAbove = await this.prisma.mahallu.count({
      where: {
        villageId: { in: villageIds.map(v => v.id) },
        totalPoints: { gt: points }
      }
    });

    const rank = ranksAbove + 1;
    const percentile = ((totalMahallus - ranksAbove) / totalMahallus) * 100;

    return {
      rank,
      totalEntities: totalMahallus,
      percentile: Number(percentile.toFixed(2)),
      entityId: districtId,
      entityName: zoneName
    };
  }

}
