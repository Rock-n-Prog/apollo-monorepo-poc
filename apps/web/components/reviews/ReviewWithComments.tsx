import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@acme/web-ui/components/inputs';
import { Body1 } from '@acme/web-ui/components/typography';
import { TextField } from '@acme/web-forms/components';
import { useCreateCommentMutation, type Review } from '../../gql/generated/graphql';

type Props = {
  readonly review: Review;
};

const commentInputSchema = z.object({
  title: z.string(),
});

type CommentInput = z.infer<typeof commentInputSchema>;

function ReviewWithComments({ review }: Props) {
  const { t } = useTranslation('reviews');
  const { mutate } = useCreateCommentMutation();
  const { handleSubmit, control } = useForm<CommentInput>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        title: z.string(),
      }),
    ),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(input: CommentInput) {
    mutate({
      title: input.title,
      reviewId: review.id,
    });
  }

  // TODO: TextField Label
  return (
    <>
      <Body1>{t('review.score', { score: review.score })}</Body1>
      <Body1>{t('review.comments')}</Body1>
      <Link href={`/contents/${review.content?.id}`}>
        <Button variant="text">{review.content?.title}</Button>
      </Link>
      {review.comments?.map((comment, i) => (
        <React.Fragment key={`${review.id}-${i}`}>
          <Body1>{comment}</Body1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField control={control} name="title" label="Label" />
          </form>
        </React.Fragment>
      ))}
    </>
  );
}

export { ReviewWithComments };
