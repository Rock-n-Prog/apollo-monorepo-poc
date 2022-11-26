import SchemaBuilder from '@pothos/core';
import DirectivesPlugin from '@pothos/plugin-directives';
import FederationPlugin from '@pothos/plugin-federation';
import type { Context } from "./context";

const builder = new SchemaBuilder<{
  Context: Context,
}>({
  plugins: [DirectivesPlugin, FederationPlugin],
});

type Content = {
  id: string;
  title: string;
  year: number;
};

const ContentType = builder.objectRef<Content>('Content').implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
    year: t.exposeInt('year'),
  }),
});

// Federation references
/*
builder.asEntity(ContentType, {
  key: builder.selection<{ upc: string }>('upc'),
  resolveReference: ({ upc }) => products.find((product) => product.upc === upc),
});
*/

builder.queryType({
  fields: (t) => ({
    content: t.field({
      type: ContentType,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_root, args, ctx) => ctx.prisma.content.findUnique({
        where: {
          id: args.id
        }
      }),
    }),
    contents: t.field({
      type: [ContentType],
      resolve: (_root, _args, ctx) => ctx.prisma.content.findMany(),
    }),
  }),
});

export { builder };