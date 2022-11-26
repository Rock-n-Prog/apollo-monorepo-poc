import type { Review, Comment } from '.prisma/client/reviews';
import { prisma } from '.';

// contentId are copied from packages/db/contents/src/seed.ts
const defaultReviews = [
  {
    score: 7.5,
    id: 'd905ad45-2512-43ee-b27a-9028398e4835',
    contentId: 'f04ef11f-9b73-4df7-be86-a79ce8f591bf',
  },
  {
    score: 7,
    id: 'd832bda6-0795-4cf4-8a92-6db863a1102a',
    contentId: '06d645ed-e233-4c68-afaa-5f22059faeca',
  },
  {
    score: 9,
    id: '186ed594-75fb-42fd-8ce0-9df17aca0852',
    contentId: '9062ac19-07dd-4750-9875-7f0d91644f81',
  },
] as readonly Review[];

const defaultComments = [
  { title: 'Great movie', reviewId: defaultReviews[0].id, id: '41a6d174-6d9d-11ed-a1eb-0242ac120002' },
  { title: 'First and unique!', reviewId: defaultReviews[0].id, id: '5210e0d6-6d9d-11ed-a1eb-0242ac120002' },
  { title: 'Amazing!', reviewId: defaultReviews[1].id, id: '55663b5a-6d9d-11ed-a1eb-0242ac120002' },
  { title: 'Love this one!', reviewId: defaultReviews[1].id, id: '5922ed88-6d9d-11ed-a1eb-0242ac120002' },
  { title: 'Childhood memories!', reviewId: defaultReviews[2].id, id: '5cc63a62-6d9d-11ed-a1eb-0242ac120002' },
  { title: 'Really good!', reviewId: defaultReviews[2].id, id: '615f5a54-6d9d-11ed-a1eb-0242ac120002' },
] as readonly Comment[];

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
    await Promise.all(
      defaultComments.map(comment =>
        prisma.comment.upsert({
          where: {
            id: comment.id,
          },
          update: {
            ...comment,
          },
          create: {
            ...comment,
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
