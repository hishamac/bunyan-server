import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Info,
} from '@nestjs/graphql';
import { FatwaService } from './fatwa.service';
import { Fatwa } from './entities/fatwa.entity';
import { CreateFatwaInput } from './dto/create-fatwa.input';
import { UpdateFatwaInput } from './dto/update-fatwa.input';
import { ValidationRule } from 'src/utils/types';
import GraphQLJSON from 'graphql-type-json';
import { fieldsProjection } from 'graphql-fields-list';
import { extractRelations } from 'src/utils/fields';
import { Roles } from 'src/credential/roles/roles.decorator';
import { RoleEnum } from 'src/enums/role';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/credential/roles/roles.guard';

@Resolver(() => Fatwa)
@UseGuards(RolesGuard)
export class FatwaResolver {
  constructor(private readonly fatwaService: FatwaService) {}

  @Mutation(() => Fatwa)
  createFatwa(@Args('createFatwaInput') createFatwaInput: CreateFatwaInput) {
    const validationRules: ValidationRule[] = [
      {
        field: 'question',
        required: true,
        type: 'string',
      },
      {
        field: 'questionerMobile',
        required: true,
        type: 'string',
      },
      {
        field: 'status',
        type: 'string',
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
      },
    ];
    return this.fatwaService.create(createFatwaInput as any, validationRules);
  }

  @Mutation(() => [Fatwa])
  createManyFatwas(
    @Args('createManyFatwasInput', { type: () => [CreateFatwaInput] })
    createManyFatwasInput: CreateFatwaInput[],
  ) {
    const validationRules: ValidationRule[] = [
      {
        field: 'question',
        required: true,
        type: 'string',
      },
      {
        field: 'questionerMobile',
        required: true,
        type: 'string',
      },
      {
        field: 'status',
        type: 'string',
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
      },
    ];
    return this.fatwaService.createMany(createManyFatwasInput, validationRules);
  }

  @Query(() => [Fatwa], { name: 'fatwas' })
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
    const allowedRelations: string[] = ['answeredBy'];
    const relations = extractRelations(fields, allowedRelations);
    return this.fatwaService.findAll(
      limit,
      offset,
      filters,
      orderBy,
      relationsToFilter,
      relations,
    );
  }

  @Query(() => Fatwa, { name: 'fatwa' })
  findOne(@Args('id', { type: () => Int }) id: number, @Info() info: any) {
    const fields = Object.keys(fieldsProjection(info));
    const allowedRelations: string[] = ['answeredBy'];
    const relations = extractRelations(fields, allowedRelations);

    return this.fatwaService.findOne(id, 'id', relations);
  }

  @Query(() => Int)
  countFatwas(
    @Args('filters', { type: () => GraphQLJSON, nullable: true })
    filters: { [key: string]: any },
    @Args('relationsToFilter', { type: () => GraphQLJSON, nullable: true })
    relationsToFilter: { [key: string]: any },
  ) {
    return this.fatwaService.count(filters, relationsToFilter);
  }

  @Mutation(() => Fatwa)
  updateFatwa(@Args('updateFatwaInput') updateFatwaInput: UpdateFatwaInput) {
    const validationRules: ValidationRule[] = [
      {
        field: 'question',
        type: 'string',
      },
      {
        field: 'questionerMobile',
        type: 'string',
      },
      {
        field: 'status',
        type: 'string',
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
      },
    ];
    return this.fatwaService.update(
      updateFatwaInput.id,
      updateFatwaInput as any,
      validationRules,
    );
  }

  @Mutation(() => Fatwa)
  @Roles(RoleEnum.INFO_ADMIN)
  answerFatwa(
    @Args('id', { type: () => Int }) id: number,
    @Args('answer', { type: () => String }) answer: string,
    @Context('req') req: any,
  ) {
    return this.fatwaService.answerFatwa(id, answer, req.user);
  }

  @Mutation(() => Fatwa)
  removeFatwa(@Args('id', { type: () => Int }) id: number) {
    return this.fatwaService.remove(id);
  }
}
