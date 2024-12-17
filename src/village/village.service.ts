import { Injectable } from '@nestjs/common';
import { CreateVillageInput } from './dto/create-village.input';
import { Credential, Village } from '@prisma/client';
import { UpdateVillageInput } from './dto/update-village.input';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QueueProcessor } from '../queue/queue.processor';
import { QueueService } from '../queue/queue.service';
import { BaseService } from '../base/base.service';
import { VillageActivityService } from '../village-activity/village-activity.service';
import { CredentialService } from 'src/credential/credential.service';
import { RoleEnum } from 'src/enums/role';
import { ValidationRule } from 'src/utils/types';
@Injectable()
export class VillageService extends BaseService<Village> {
  constructor(
    prisma: PrismaService,
    redis: RedisService,
    queueProcessor: QueueProcessor,
    queueService: QueueService,
    villageActivityService: VillageActivityService,
    private readonly credentialService: CredentialService,
  ) {
    super(
      prisma,
      redis,
      queueProcessor,
      queueService,
      'village',
      villageActivityService,
    );
  }

  async count(
    filters?: { [key: string]: any },
    relationsToFilter?: { [key: string]: { [key: string]: any } },
    user?: Credential,
  ): Promise<number> {
    // check if the user is authorized to count the committee
    let authorizedFilter = filters;
    if (user && user.role === RoleEnum.ZONE_ADMIN) {
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
  
      
  
       // check the username is already exists
       const isUsernameExists = await this.credentialService.isUsernameExists(username);
   
       if (isUsernameExists) {
        //  throw new Error('Username already exists');
        username = username + '_' ;
       }
      
       
      // remove username and password from data
      data = rest;
      !data.createdById && (data.createdById = user.id);

       // user 
    user.id = data.createdById;
  
      const village = await super.create(data, validationRules, user);
  
      // after creating village , create a credential for the village
      await this.credentialService.create(
        {
          username,
          password,
          role: RoleEnum.ZONE_ADMIN,
          districtId: null,
          mahalluId: null,
          zoneId: null,
          villageId: village.id,
        },
        [],
        user,
      );


  
      return village;
    }
  
     async update(
          id: number,
          updateVillageInput: UpdateVillageInput,
          validationRule: any,
          user: Credential,
        ): Promise<Village> {
          // check if the user is authorized to update the village
          if (user.role !== RoleEnum.SUPER_ADMIN) {
            const village = await this.prisma.village.findUnique({
              where: {
                id: id,
                createdById: user.id,
              },
            });
        
            if (!village) {
              throw new Error('You are not authorized to update this village');
            }
          }
      
          return super.update(id, updateVillageInput, validationRule, user);
        }
      
        async delete(id: number, user: Credential): Promise<Village> {
          // check if the user is authorized to delete the village
         
          if (user.role !== RoleEnum.SUPER_ADMIN) {
            const village = await this.prisma.village.findUnique({
              where: {
                id: id,
                createdById: user.id,
              },
            });
        
            if (!village) {
              throw new Error('You are not authorized to delete this village');
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
  
        //   // check the username is already exists
        //   const isUsernameExists = await this.credentialService.isUsernameExists(dataWithActor[0].username);
  
        //   if (isUsernameExists) {
        //     throw new Error('Username already exists');
        //   }
  
        //   // remove username and password from data
        //   dataWithActor.forEach((d) => {
        //     const { username, password, ...rest } = d;
        //     d = rest;
        //   });
  
        //   const villages = await super.createMany(dataWithActor, validationRules, actor);
  
        //   // after creating villages , create a credential for the villages
  
        //   await Promise.all(
        //     villages.map(async (village) => {
        //       await this.credentialService.create(
        //         {
        //           username: dataWithActor[0].username,
        //           password: dataWithActor[0].password,
        //           role: RoleEnum.ZONE_ADMIN,
        //           districtId: null,
        //           mahalluId: null,
        //           zoneId: null,
        //           villageId: village.id,
        //         },
        //         [],
        //         actor,
        //       );
        //     }),
        //   );
  
        //   return villages;
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
            const villages = await this.prisma.village.findMany({
              where: {
                id: {
                  in: ids,
                },
                createdById: actor?.id,
              },
            });
        
            if (villages.length !== ids.length) {
              throw new Error('You are not authorized to delete these villages');
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
          if (user && user.role === RoleEnum.ZONE_ADMIN) {
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
      
}
