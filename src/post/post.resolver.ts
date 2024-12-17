import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Context,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';
import { RolesGuard } from '../credential/roles/roles.guard';
import { ValidationRule } from '../utils/types';
import { RecentlyViewedInput } from './dto/recently';
import { FeedItem } from './entities/feed';
import { ContentResponse } from './entities/suffle';

@Resolver(() => Post)
@UseGuards(RolesGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        required: true,
        type: 'string',
      },
      {
        field: 'description',
        required: true,
        type: 'string',
      },
      {
        field: 'mahalluId',
        required: true,
        type: 'number',
        reference: {
          model: 'mahallu',
          field: 'id',
        },
      },
      {
        field: 'fileURL',
        type: 'string',
        required: true,
      },
      {
        field: 'active',
        type: 'boolean',
        required: true,
      },
    ]; // Empty validation rules
    return this.postService.create(createPostInput, validationRules, req.user);
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
  countPost(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
    @Context('req') req: any,
  ) {
    return this.postService.count(filters, relationsToFilter, req.user);
  }

  @Query(() => [Post], { name: 'posts' })
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
    const allowedRelations: string[] = ['mahallu', 'interactions']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);

    return this.postService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
      req.user,
    );
  }

  @Query(() => Post, { name: 'post' })
  @Roles(
    RoleEnum.SUPER_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.USER,
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
  )
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: any,
    @Context('req') req: any,
  ) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['mahallu', 'interactions']; // Empty allowedRelations array
    const relations = extractRelations(fields, allowedRelations);
    return this.postService.findOne(id, 'id', relations, req.user);
  }

  @Mutation(() => Post)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context('req') req: any,
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'title',
        type: 'string',
      },
      {
        field: 'description',
        type: 'string',
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
        field: 'fileURL',
        type: 'string',
      },
      {
        field: 'active',
        type: 'boolean',
      },
    ]; // Empty validation rules
    return this.postService.update(
      updatePostInput.id,
      updatePostInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => [Post])
  @Roles(RoleEnum.DISTRICT_ADMIN , RoleEnum.MAHALLU_ADMIN , RoleEnum.ZONE_ADMIN , RoleEnum.SUPER_ADMIN)
  createManyPosts(
    @Args('createManyPostInput', { type: () => [CreatePostInput] })
    createManyPostInput: CreatePostInput[],
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
    return this.postService.createMany(
      createManyPostInput,
      validationRules,
      req.user,
    );
  }

  @Mutation(() => Post)
  @Roles(
    RoleEnum.VILLAGE_ADMIN,
    RoleEnum.MAHALLU_ADMIN,
    RoleEnum.DISTRICT_ADMIN,
    RoleEnum.ZONE_ADMIN,
    RoleEnum.SUPER_ADMIN,
  )
  removePost(
    @Args('id', { type: () => Int }) id: number,
    @Context('req') req: any,
  ) {
    return this.postService.remove(id, req.user);
  }

  @Mutation(() => Post)
  @Roles(RoleEnum.MAHALLU_ADMIN)
  activeOrInactivePost(
    @Args('value', { type: () => Boolean }) value: boolean,
    @Context('req') req: any,
  ) {
    const fieldName = 'active';
    const validationRule: ValidationRule = {
      field: 'active',
      required: true,
      type: 'boolean',
    };

    return this.postService.updateColumn(
      fieldName,
      value,
      validationRule,
      req.user,
    );
  }

  @Mutation(() => [Post])
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.MAHALLU_ADMIN)
  removePosts(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @Context('req') req: any,
  ) {
    return this.postService.removeMany(ids, req.user);
  }

  // @Query(() => [FeedItem])
  // async getPersonalizedFeed(
  //   @Args('recentlyViewed', { type: () => RecentlyViewedInput })
  //   recentlyViewed: RecentlyViewedInput,
  //   @Args('limit', { nullable: true, type: () => Number }) limit: number,
  // ) {
  //   return this.postService.getPersonalizedFeed(recentlyViewed, limit);
  // }

  @Query(() => ContentResponse)
  async getShuffledContent(
    @Args('postLimit', { nullable: true, type: () => Int }) postLimit?: number,
    @Args('eventLimit', { nullable: true, type: () => Int }) eventLimit?: number,
    @Args('jobLimit', { nullable: true, type: () => Int }) jobLimit?: number
  ) {
    return this.postService.getShuffledContent({ 
      postLimit, 
      eventLimit, 
      jobLimit 
    });
  }
}
