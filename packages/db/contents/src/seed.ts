import type { Content } from '.prisma/client/contents';
import { prisma } from '.';

const defaultContents = [
  { title: 'Batman', year: 1989, id: 'f04ef11f-9b73-4df7-be86-a79ce8f591bf' },
  { title: 'Batman Returns', year: 1992, id: '06d645ed-e233-4c68-afaa-5f22059faeca' },
  { title: 'Batman: The Animated Series', year: 1992, id: '9062ac19-07dd-4750-9875-7f0d91644f81' },
] as readonly Content[];

(async () => {
  /* eslint-disable-next-line functional/no-try-statement */
  try {
    await Promise.all(
      defaultContents.map(content =>
        prisma.content.upsert({
          where: {
            id: content.id,
          },
          update: {
            ...content,
          },
          create: {
            ...content,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
