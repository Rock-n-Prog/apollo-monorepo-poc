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
  readonly review: Pick<Review, 'id' | 'score' | 'comments' | 'content'>;
  readonly onSubmitComment: () => unknown;
};

const commentInputSchema = z.object({
  title: z.string(),
});

type CommentInput = z.infer<typeof commentInputSchema>;

function ReviewWithComments({ review, onSubmitComment }: Props) {
  const { t } = useTranslation('reviews');
  const { handleSubmit, control, reset } = useForm<CommentInput>({
    mode: 'onChange',
    resolver: zodResolver(commentInputSchema),
    defaultValues: {
      title: '',
    },
  });
  const [mutate] = useCreateCommentMutation({
    onCompleted: () => {
      reset();
      onSubmitComment();
    },
  });

  function onSubmit(input: CommentInput) {
    return mutate({
      variables: {
        input: {
          title: input.title,
          reviewId: review.id,
        },
      },
    });
  }

  return (
    <>
      <Link href={`/contents/${review.content?.id}`}>
        <Button variant="text">{review.content?.title}</Button>
      </Link>
      <Body1>{t('review.score', { score: review.score })}</Body1>
      <Body1>{t('review.comments')}</Body1>
      {review.comments?.map((comment, i) => (
        <React.Fragment key={`${review.id}-${i}`}>
          <Body1>{comment}</Body1>
        </React.Fragment>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField control={control} name="title" label={t('review.yourComment')} />
      </form>
    </>
  );
}

export { ReviewWithComments };
