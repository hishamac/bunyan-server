import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { MahalluService } from './mahallu.service';
import { Mahallu } from './entities/mahallu.entity';
import { CreateMahalluInput } from './dto/create-mahallu.input';
import { UpdateMahalluInput } from './dto/update-mahallu.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { MahalluLeaderboardEntry } from './entities/leaderboard'; 
import { MahalluRankingDetails } from './entities/ranking';

@Resolver(() => Mahallu)
@UseGuards(RolesGuard)
export class MahalluResolver {
  constructor(private readonly mahalluService: MahalluService) {}

  @Mutation(() => Mahallu)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  createMahallu(
    @Args('createMahalluInput') createMahalluInput: CreateMahalluInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      { field: 'regNo', required: true, type: 'string', unique: true },
      { field: 'name', required: true, type: 'string' },
      { field: 'place', required: true, type: 'string' },
      { field: 'contact', required: true, type: 'string' },
      { field: 'pinCode', required: true, type: 'string' },
      { field: 'postOffice', required: true, type: 'string' },
      {
        field: 'villageId',
        required: true,
        type: 'number',
        reference: { model: 'village', field: 'id' },
      },
      { field: 'active', required: false, type: 'boolean' },
    ];
    return this.mahalluService.create(
      createMahalluInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => Int)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
  countMahallu(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.mahalluService.count(filters, relationsToFilter);
  }

  @Mutation(() => [Mahallu])
  @Roles(RoleEnum.DISTRICT_ADMIN, RoleEnum.SUPER_ADMIN)
  createManyMahallus(
    @Args('createManyMahalluInput', { type: () => [CreateMahalluInput] })
    createManyMahalluInput: CreateMahalluInput[],
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      { field: 'regNo', required: true, type: 'string', unique: true },
      { field: 'name', required: true, type: 'string' },
      { field: 'place', required: true, type: 'string' },
      { field: 'contact', required: true, type: 'string' },
      { field: 'pinCode', required: true, type: 'string' },
      { field: 'postOffice', required: true, type: 'string' },
      {
        field: 'villageId',
        required: true,
        type: 'number',
        reference: { model: 'village', field: 'id' },
      },
      { field: 'active', required: false, type: 'boolean' },
    ];
    return this.mahalluService.createMany(
      createManyMahalluInput,
      validationRules,
      req.user,
    );
  }

  @Query(() => [Mahallu], { name: 'mahallus' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.USER,
    RoleEnum.DISTRICT_ADMIN,
  )
  findAll(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('orderBy', { type: () => GraphQLJSON, nullable: true })
    orderBy: { field: string; direction: 'asc' | 'desc' },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Info() info: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'village',
      'village.zone',
      'village.zone.district',
      'families',
      'families.members',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);

    return this.mahalluService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Mahallu, { name: 'mahallu' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = [
      'village',
      'village.zone',
      'village.zone.district',
      'families',
      'families.members',
      'credential',
    ];
    const relations = extractRelations(fields, allowedRelations);
    return this.mahalluService.findOne(id, 'id', relations);
  }

  @Query(() => [MahalluLeaderboardEntry])
  async getLeaderboard(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
    @Args('search', { type: () => String, nullable: true }) search: string,
    @Args('villageId', { type: () => Int, nullable: true }) villageId: number,
    @Args('zoneId', { type: () => Int, nullable: true }) zoneId: number,
    @Args('districtId', { type: () => Int, nullable: true }) districtId: number,
  ): Promise<MahalluLeaderboardEntry[]> {
    return this.mahalluService.getLeaderboard(limit, offset, search, villageId, zoneId, districtId);
  }

  @Mutation(() => Mahallu)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  updateMahallu(
    @Args('updateMahalluInput') updateMahalluInput: UpdateMahalluInput,
    @Context('req') req: any,
  ) {
    return this.mahalluService.update(
      updateMahalluInput.id,
      updateMahalluInput,
      [
        { field: 'regNo', unique: true, type: 'string' },
        { field: 'name', type: 'string' },
        { field: 'place', type: 'string' },
        { field: 'contact', type: 'string' },
        { field: 'pinCode', type: 'string' },
        { field: 'postOffice', type: 'string' },
        {
          field: 'villageId',
          type: 'number',
          reference: { model: 'village', field: 'id' },
        },
        { field: 'active', type: 'boolean' },
      ],
      req.user,
    );
  }

  @Mutation(() => Mahallu)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  removeMahallu(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.mahalluService.remove(id, req.user);
  }

  @Mutation(() => Mahallu)
  @Roles(RoleEnum.VILLAGE_ADMIN)
  verifyMahallu(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'verified';
    const validationRule: ValidationRule = {
      field: 'verified',
      required: true,
      type: 'boolean',
    };

    return this.mahalluService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Mahallu])
  @Roles(RoleEnum.VILLAGE_ADMIN)
  removeMahallus(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.mahalluService.removeMany(ids, req.user);
  }

  @Query(() => MahalluRankingDetails)
  async getMahalluRanking(
    @Args('mahalluId', { type: () => Int }) mahalluId: number,
  ): Promise<MahalluRankingDetails> {
    return this.mahalluService.getMahalluRankingDetails(mahalluId);
  }
}
