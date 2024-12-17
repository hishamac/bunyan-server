import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';

@Resolver(() => Notification)
@UseGuards(RolesGuard)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        required: true,
        type: 'string',
      },
      {
        field: 'content',
        required: true,
        type: 'string',
      },
      {
        field: 'active',
        required: true,
        type: 'boolean',
      }
    ]; // Empty validation rules
    return this.notificationService.create(
      createNotificationInput,
      validationRules,
      req.user,
    );
  }

   @Mutation(() => [Notification])
        @Roles(RoleEnum.DISTRICT_ADMIN)
        createManyNotifications(
          @Args('createManyNotificationInput', { type: () => [CreateNotificationInput] })
          createManyNotificationInput: CreateNotificationInput[],
          @Context('req') req: any,
        ) {
          const validationRules: ValidationRule[] = [
            {
              field: 'name',
              required: true,
              type: 'string',
              unique: true,
            },
            {
              field: 'districtId',
              required: true,
              type: 'number',
              reference: {
                model: 'district',
                field: 'id',
              },
            },
          ];
          return this.notificationService.createMany(createManyNotificationInput, validationRules, req.user);
        }

  @Query(() => Int)
  countNotification(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.notificationService.count(filters, relationsToFilter);
  }

  @Query(() => [Notification], { name: 'notifications' })
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
    const allowedRelations: string[] = ['createdBy', 'mahallus']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.notificationService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['createdBy', 'mahallus']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.notificationService.findOne(id, 'id', relations);
  }

  @Mutation(() => Notification)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        type: 'string',
      },
      {
        field: 'content',
        type: 'string',
      },
      {
        field: 'active',
        type: 'boolean',
      },
      {
        field: 'credentials',
        type: 'array',
        reference: {
          model: 'credential',
          field: 'id',
        },
      }
    ]; // Empty validation rules
    return this.notificationService.update(
      updateNotificationInput.id,
      updateNotificationInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Notification)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  removeNotification(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.notificationService.remove(id, req.user);
  }

  @Mutation(() => [Notification])
  @Roles(RoleEnum.SUPER_ADMIN)
  removeNotifications(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.notificationService.removeMany(ids, req.user);
  }

  @Mutation(() => Notification)
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  updateViewedBy(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.notificationService.updateViewedBy(id, req.user);
  }

  @Query(() => [Notification], { name: 'myNotifications' })
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.VILLAGE_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.DISTRICT_ADMIN , RoleEnum.MAHALLU_ADMIN)
  findMyNotifications(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Context('req') req: any,
  ) {

    console.log(req.user);
    return this.notificationService.findMyNotifications(
      req.user,
      offset,
      limit,
    );
  }

  @Query(() => [Notification], { name: 'mySentNotifications' })
  @Roles(RoleEnum.SUPER_ADMIN , RoleEnum.VILLAGE_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.DISTRICT_ADMIN)
  findMySentNotifications(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Context('req') req: any,
  ) {
    console.log(req.user);
    
    return this.notificationService.getMySentNotifications(
      req.user,
      offset,
      limit,
    );
  }
}
