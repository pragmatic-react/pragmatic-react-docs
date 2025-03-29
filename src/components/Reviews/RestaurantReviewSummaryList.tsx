import { FC } from "react";
import ReviewSummary from "./ReviewSummary";

interface RestaurantReviewListProps {
  setOpenReviewDetail: (isOpen: boolean) => void;
  setSelectedReviewId: (id: number) => void;
  restaurantId: number;
}

const RestaurantReviewSummaryList: FC<RestaurantReviewListProps> = ({
  setOpenReviewDetail,
  restaurantId,
  setSelectedReviewId,
}) => {
  // todo : restaurantId를 사용해서 리뷰 요약 리스트를 가져온다.
  const reviewSummarys = [
    { reviewId: 1, title: "맛있어요", rating: 5 },
    { reviewId: 2, title: "좋아요", rating: 1 },
  ];

  return (
    <div className="restaurant-reviews">
      {reviewSummarys.map((reviewSummary) => (
        <ReviewSummary
          key={reviewSummary.reviewId}
          reviewSummary={reviewSummary}
          setOpenReviewDetail={setOpenReviewDetail}
          setSelectedReviewId={setSelectedReviewId}
        />
      ))}
    </div>
  );
};

export default RestaurantReviewSummaryList;
