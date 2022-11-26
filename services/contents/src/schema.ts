import SchemaBuilder from '@pothos/core';
import DirectivesPlugin from '@pothos/plugin-directives';
import FederationPlugin from '@pothos/plugin-federation';
import type { Context } from './context';

const builder = new SchemaBuilder<{
  readonly Context: Context;
}>({
  plugins: [DirectivesPlugin, FederationPlugin],
});

type Content = {
  readonly id: string;
  readonly title: string;
  readonly year: number;
};

const ContentType = builder.objectRef<Content>('Content').implement({
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    year: t.exposeInt('year'),
  }),
});

builder.externalRef('Review', builder.selection<{ readonly contentId: string }>('contentId')).implement({
  fields: t => ({
    contentId: t.exposeID('contentId'),
    content: t.field({
      type: ContentType,
      nullable: true,
      resolve: (review, args, ctx) =>
        ctx.prisma.content.findUnique({
          where: {
            id: review.contentId,
          },
        }),
    }),
  }),
});

builder.queryType({
  fields: t => ({
    content: t.field({
      type: ContentType,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.content.findUnique({
          where: {
            id: args.id,
          },
        }),
    }),
    contents: t.field({
      type: [ContentType],
      resolve: (_root, _args, ctx) => ctx.prisma.content.findMany(),
    }),
  }),
});

const schema = builder.toSubGraphSchema({});

export { schema };
