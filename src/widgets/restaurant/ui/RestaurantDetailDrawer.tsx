import React, { useState } from 'react';

import { useModal } from '@features/modal';

import { Restaurant, RestaurantIcon, Review } from '@entities/restaurant';

import { useModalState } from '@shared/hooks';
import { Drawer } from '@shared/ui';

import { ReviewDetailDrawer } from './ReviewDetailDrawer';

type Props = {
  selected: Restaurant | null;
};

const Inner = (props: Restaurant) => {
  const { description, name, category, reviews } = props;
  const { isOpen, openModal, closeModal } = useModalState();
  const [review, setReview] = useState<Review | null>(null);

  const handleMoreButonClick = (review: Review) => () => {
    setReview(review);
    openModal();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <RestaurantIcon category={category} name={name} />

        <h2 className="text-xl font-semibold">{name}</h2>

        <p>{description}</p>

        <div>
          <p className="text-lg font-semibold">Reviews</p>

          <ul className="flex flex-col gap-5">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="flex w-full items-center justify-between border-b-[1px] border-gray-400 py-2"
              >
                <p className="w-[calc(100%-100px)] truncate">{review.content}</p>
                <button className="button--primary rounded-sm px-2 py-1" onClick={handleMoreButonClick(review)}>
                  자세히 보기
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReviewDetailDrawer isOpen={isOpen} onClose={closeModal} review={review} />
    </React.Fragment>
  );
};
export const RestaurantDetailDrawer = ({ selected }: Props) => {
  const { isOpen, closeModal } = useModal();

  return (
    <Drawer isOpen={isOpen} onClose={closeModal}>
      {selected && <Inner {...selected} />}
    </Drawer>
  );
};
