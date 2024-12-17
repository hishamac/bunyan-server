import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { PostInteractionService } from './post-interaction.service';
import { PostInteraction } from './entities/post-interaction.entity';
import { CreatePostInteractionInput } from './dto/create-post-interaction.input';
import { UpdatePostInteractionInput } from './dto/update-post-interaction.input';
import { ValidationRule } from '../utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from '../utils/fields';
import { AuthRoleGuard } from '../auth-role.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../credential/roles/roles.decorator';
import { RoleEnum } from '../enums/role';

@Resolver(() => PostInteraction)
export class PostInteractionResolver {
  constructor(
    private readonly postInteractionService: PostInteractionService,
  ) {}

  @Mutation(() => PostInteraction)
  createPostInteraction(
    @Args('createPostInteractionInput')
    createPostInteractionInput: CreatePostInteractionInput,
  ) {
    return this.postInteractionService.create(createPostInteractionInput, []);
  }

  

  @Query(() => [PostInteraction], { name: 'postInteractions' })
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
    const allowedRelations = [];
    const relations = extractRelations(fields, allowedRelations);

    return this.postInteractionService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => PostInteraction, { name: 'postInteraction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postInteractionService.findOne(id);
  }

  @Mutation(() => PostInteraction)
  updatePostInteraction(
    @Args('updatePostInteractionInput')
    updatePostInteractionInput: UpdatePostInteractionInput,
  ) {
    return this.postInteractionService.update(
      updatePostInteractionInput.id,
      updatePostInteractionInput,
      [],
    );
  }

  @Mutation(() => PostInteraction)
  removePostInteraction(@Args('id', { type: () => Int }) id: number) {
    return this.postInteractionService.remove(id);
  }
}
