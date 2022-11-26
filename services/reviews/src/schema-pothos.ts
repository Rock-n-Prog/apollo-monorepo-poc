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
  readonly score: number;
  readonly comments?: readonly string[];
};

const ReviewType = builder.objectRef<Review>('Review').implement({
  fields: t => ({
    id: t.exposeID('id'),
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

// TODO: Federation resolvers
/*
builder.asEntity(ContentType, {
  key: builder.selection<{ readonly id: string }>('id'),
  resolveReference: (args, ctx) =>
    ctx.prisma.content.findUnique({
      where: {
        id: args.id,
      },
    }),
});
*/

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
