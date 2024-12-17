import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { DonationService } from './donation.service';
import { Donation } from './entities/donation.entity';
import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Donation)
@UseGuards(RolesGuard)
export class DonationResolver {
  constructor(private readonly donationService: DonationService) {}

  @Mutation(() => Donation)
  createDonation(
    @Args('createDonationInput') createDonationInput: CreateDonationInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
      },
      {
        field: 'contact',
        type: 'string',
      },
      {
        field: 'guest',
        type: 'boolean',
        required: true,
      },
      {
        field: 'memberId',
        type: 'number',
        reference: {
          model: 'member',
          field: 'id',
        },
      },
      {
        field: 'charityId',
        type: 'number',
        required: true,
        reference: {
          model: 'charity',
          field: 'id',
        },
      },
      {
        field: 'amount',
        required: true,
        type: 'number',
      },
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'status',
        type: 'string',
        enum: ['FAILED', 'SUCCESS'],
        required: true,
      },
      {
        field: 'donatedAt',
        type: 'date',
        required: true,
      },
    ]; // Empty validation rules
    return this.donationService.create(
      createDonationInput,
      validationRules,
      req.user,
    );
  }

  @Query(()=> Int)
  countDonation(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ){
    return this.donationService.count(
      filters,
      relationsToFilter,
    );
  }

  @Query(() => [Donation], { name: 'donations' })
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
    const allowedRelations: string[] = ['charity', 'mahallu', 'member']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.donationService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  

  @Query(() => Donation, { name: 'donation' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['charity', 'mahallu', 'member']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.donationService.findOne(id, 'id', relations);
  }

  @Mutation(() => Donation)
  updateDonation(
    @Args('updateDonationInput') updateDonationInput: UpdateDonationInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'name',
        type: 'string',
      },
      {
        field: 'contact',
        type: 'string',
      },
      {
        field: 'guest',
        type: 'boolean',
      },
      {
        field: 'memberId',
        type: 'number',
        reference: {
          model: 'member',
          field: 'id',
        },
      },
      {
        field: 'charityId',
        type: 'number',
        reference: {
          model: 'charity',
          field: 'id',
        },
      },
      {
        field: 'amount',
        type: 'number',
      },
      {
        field: 'mahalluId',
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'status',
        type: 'string',
        enum: ['FAILED', 'SUCCESS'],
      },
      {
        field: 'donatedAt',
        type: 'date',
      },
    ]; // Empty validation rules
    return this.donationService.update(
      updateDonationInput.id,
      updateDonationInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Donation)
  removeDonation(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.donationService.remove(id, req.user);
  }

  @Mutation(() => [Donation])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeDonations(@Args('ids', { type: () => [Int] }) ids: number[] , @Context('req') req: any,) {
    return this.donationService.removeMany(ids,req.user);
  }
}
