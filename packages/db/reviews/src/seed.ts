import type { Review } from '@prisma/client';
import { prisma } from '.';

const defaultReviews = [
  {
    score: 7.5,
    comments: ['Great movie', 'First and unique!'],
    id: 'd905ad45-2512-43ee-b27a-9028398e4835',
    contentId: 'f04ef11f-9b73-4df7-be86-a79ce8f591bf',
  },
  {
    score: 7,
    comments: ['Amazing!', 'Love this one!'],
    id: 'd832bda6-0795-4cf4-8a92-6db863a1102a',
    contentId: '06d645ed-e233-4c68-afaa-5f22059faeca',
  },
  {
    score: 9,
    comments: ['Childhood memories!', 'Really good!'],
    id: '186ed594-75fb-42fd-8ce0-9df17aca0852',
    contentId: '9062ac19-07dd-4750-9875-7f0d91644f81',
  },
] as readonly Partial<Review>[];

(async () => {
  /* eslint-disable-next-line functional/no-try-statement */
  try {
    await Promise.all(
      defaultReviews.map(review =>
        prisma.review.upsert({
          where: {
            id: review.id,
          },
          update: {
            ...review,
          },
          create: {
            ...review,
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
