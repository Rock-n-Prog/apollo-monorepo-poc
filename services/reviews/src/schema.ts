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

const schema = builder.toSubGraphSchema({});

export { schema };
