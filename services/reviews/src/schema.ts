import SchemaBuilder from '@pothos/core';
import DirectivesPlugin from '@pothos/plugin-directives';
import FederationPlugin from '@pothos/plugin-federation';
import type { Context } from './context';

const builder = new SchemaBuilder<{
  readonly Context: Context;
}>({
  plugins: [DirectivesPlugin, FederationPlugin],
});

type Review = {
  readonly id: string;
  readonly contentId: string;
  readonly score: number;
  readonly comments?: readonly string[];
};

// Used for inputs
type Comment = {
  readonly id: string;
  readonly reviewId: string;
  readonly title: string;
};

const ReviewType = builder.objectRef<Review>('Review').implement({
  fields: t => ({
    id: t.exposeID('id'),
    contentId: t.exposeID('contentId'),
    score: t.exposeFloat('score'),
    comments: t.stringList({
      resolve: (review, _args, ctx) =>
        ctx.prisma.comment
          .findMany({
            where: {
              reviewId: review.id,
            },
          })
          .then(comments => comments.map(c => c.title)),
    }),
  }),
});

const CommentType = builder.objectRef<Comment>('Comment').implement({
  fields: t => ({
    id: t.exposeID('id'),
    reviewId: t.exposeID('reviewId'),
    title: t.exposeString('title'),
    review: t.field({
      type: ReviewType,
      nullable: true,
      resolve: (comment, _args, ctx) =>
        ctx.prisma.review
          .findUnique({
            where: {
              id: comment.reviewId,
            },
          }),
    }),
  }),
});

builder.externalRef('Content', builder.selection<{ readonly id: string }>('id')).implement({
  fields: t => ({
    id: t.exposeID('id'),
    reviews: t.field({
      type: [ReviewType],
      resolve: (content, args, ctx) =>
        ctx.prisma.review.findMany({
          where: {
            contentId: content.id,
          },
        }),
    }),
  }),
});

builder.queryType({
  fields: t => ({
    review: t.field({
      type: ReviewType,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.review.findUnique({
          where: {
            id: args.id,
          },
        }),
    }),
    reviews: t.field({
      type: [ReviewType],
      resolve: (_root, _args, ctx) => ctx.prisma.review.findMany(),
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createComment: t.field({
      type: CommentType,
      args: {
        input: t.arg({
          type: builder.inputType('CommentInput', {
            fields: (t) => ({
              reviewId: t.string({ required: true }),
              title: t.string({ required: true }),
            }),
          }),
          required: true,
        }),
      },
      resolve: (root, args, ctx) => ctx.prisma.comment.create({
        data: {
          title: args.input.title,
          reviewId: args.input.reviewId,
        }
      })
    }),
  }),
});

const schema = builder.toSubGraphSchema({});

export { schema };
