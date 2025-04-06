import { FC, useState } from "react";
import CardItem from "../shared/ui/CardItem";
import ReviewDetailModal from "./ReviewDetailModal";
import { reviewSummary } from "../entities/review/review.type";

interface RestaurantReviewsProps {
  restaurantId: number;
}

interface RestaurantReviewSummaryListProps {
  setOpenReviewDetail: (isOpen: boolean) => void;
  setSelectedReviewId: (id: number) => void;
  restaurantId: number;
}

interface ReviewSummaryProps {
  setOpenReviewDetail: (isOpen: boolean) => void;
  reviewSummary: reviewSummary;
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
    <CardItem className="review-summary" onClick={onClickReviewItem}>
      <CardItem.Content className="review-summary__info">
        <div className="__info">
          <h3 className="__name text-subtitle">{reviewSummary.title}</h3>
          <p className="__description text-body">{reviewSummary.rating}</p>
        </div>
      </CardItem.Content>
    </CardItem>
  );
};

const RestaurantReviewSummaryList: FC<RestaurantReviewSummaryListProps> = ({
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

const RestaurantReviewSummary: FC<RestaurantReviewsProps> = ({
  restaurantId,
}: RestaurantReviewsProps) => {
  const [isOpenReviewDetail, setOpenReviewDetail] = useState(false); // 분리하는 게 맞을까..? 아닐까..?
  const [selectedReviewId, setSelectedReviewId] = useState<number>(-1);

  return (
    <>
      <RestaurantReviewSummaryList
        restaurantId={restaurantId}
        setOpenReviewDetail={setOpenReviewDetail}
        setSelectedReviewId={setSelectedReviewId}
      />
      <ReviewDetailModal
        reviewId={selectedReviewId}
        isOpen={isOpenReviewDetail}
        onClose={() => setOpenReviewDetail(false)}
      />
    </>
  );
};

export default RestaurantReviewSummary;
