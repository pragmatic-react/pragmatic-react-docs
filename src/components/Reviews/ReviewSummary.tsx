import { FC, useState } from "react";

interface ReviewSummaryProps {
  setOpenReviewDetail: (isOpen: boolean) => void;
  reviewSummary: {};
  setSelectedReviewId: (id: number) => void;
}

const ReviewSummary: FC<ReviewSummaryProps> = ({
  reviewSummary,
  setOpenReviewDetail,
  setSelectedReviewId,
}) => {
  const onClickReviewItem = () => {
    setOpenReviewDetail(true);
    setSelectedReviewId(reviewSummary.reviewId);
  };

  return (
    <>
      <div>
        <div>{reviewSummary.title}</div>
        <div>{reviewSummary.content}</div>
        <button onClick={onClickReviewItem}>자세히보기</button>
      </div>
    </>
  );
};

export default ReviewSummary;
