import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Event)
@UseGuards(RolesGuard)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'posterURL',
        type: 'string',
        required: true,
      },
      {
        field: 'title',
        type: 'string',
        required: true,
      },
      {
        field: 'description',
        type: 'string',
        required: true,
      },
      // {
      //   field: 'mahalluId',
      //   type: 'number',
      //   reference: {
      //     model: 'mahallu',
      //     field: 'id',
      //   },
      // },
      {
        field: 'online',
        type: 'boolean',
        required: true,
      },
      {
        field: 'location',
        type: 'string',
      },
      {
        field: 'admin',
        type: 'boolean',
        required: true,
      },
      {
        field: 'startingDate',
        type: 'date',
        required: true,
      },
      {
        field: 'endingDate',
        type: 'date',
        required: true,
      },
      {
        field: 'active',
        type: 'boolean',
        required: true,
      },
    ]; // Empty validation rules
    return this.eventService.create(
      createEventInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [Event])
        @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN , RoleEnum.ZONE_ADMIN)
        createManyEvents(
          @Args('createManyEventInput', { type: () => [CreateEventInput] })
          createManyEventInput: CreateEventInput[],
          @Context('req') req: any,
        ) {
          const validationRules: ValidationRule[] = [
            {
              field: 'posterURL',
              type: 'string',
              required: true,
            },
            {
              field: 'title',
              type: 'string',
              required: true,
            },
            {
              field: 'description',
              type: 'string',
              required: true,
            },
            // {
            //   field: 'mahalluId',
            //   type: 'number',
            //   reference: {
            //     model: 'mahallu',
            //     field: 'id',
            //   },
            // },
            {
              field: 'online',
              type: 'boolean',
              required: true,
            },
            {
              field: 'location',
              type: 'string',
            },
            {
              field: 'admin',
              type: 'boolean',
              required: true,
            },
            {
              field: 'startingDate',
              type: 'date',
              required: true,
            },
            {
              field: 'endingDate',
              type: 'date',
              required: true,
            },
            {
              field: 'active',
              type: 'boolean',
              required: true,
            },
          ];
          return this.eventService.createMany(createManyEventInput, validationRules, req.user);
        }

  @Query(() => Int)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.USER,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  countEvent(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.eventService.count(filters, relationsToFilter, req.user);
  }

  @Query(() => [Event], { name: 'events' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.USER,
    RoleEnum.VILLAGE_ADMIN,
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
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.eventService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Event, { name: 'event' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.eventService.findOne(id, 'id', relations, req.user);
  }

  @Mutation(() => Event)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN, RoleEnum.ZONE_ADMIN)
  updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'posterURL',
        type: 'string',
      },
      {
        field: 'title',
        type: 'string',
      },
      {
        field: 'description',
        type: 'string',
      },
      // {
      //   field: 'mahalluId',
      //   type: 'number',
      //   reference: {
      //     model: 'mahallu',
      //     field: 'id',
      //   },
      // },
      {
        field: 'online',
        type: 'boolean',
      },
      {
        field: 'location',
        type: 'string',
      },
      {
        field: 'admin',
        type: 'boolean',
      },
      {
        field: 'startingDate',
        type: 'date',
      },
      {
        field: 'endingDate',
        type: 'date',
      },
      {
        field: 'active',
        type: 'boolean',
      },
      {
        field: 'remarks',
        type: 'string',
      },
    ]; // Empty validation rules
    return this.eventService.update(
      updateEventInput.id,
      updateEventInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Event)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN)
  removeEvent(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.eventService.remove(id, req.user);
  }

  @Mutation(() => Event)
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  activeOrInactiveEvent(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'active';
    const validationRule: ValidationRule = {
      field: 'active',
      required: true,
      type: 'boolean',
    };

    return this.eventService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Event])
  @Roles(RoleEnum.MAHALLU_ADMIN, RoleEnum.SUPER_ADMIN)
  removeEvents(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.eventService.removeMany(ids, req.user);
  }
}
