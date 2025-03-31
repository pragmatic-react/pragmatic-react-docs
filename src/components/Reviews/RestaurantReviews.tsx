import { FC, useState } from "react";
import RestaurantReviewSummaryList from "./RestaurantReviewSummaryList";
import ReviewDetailModal from "./ReviewDetailModal";

interface RestaurantReviews {
  reviewId: number;
  rating: number;
  title: string;
}

interface RestaurantReviewsProps {
  restaurantId: number;
}

const RestaurantReviews: FC<RestaurantReviewsProps> = ({
  restaurantId,
}: RestaurantReviewsProps) => {
  const [isOpenReviewDetail, setOpenReviewDetail] = useState(false); // 분리하는 게 맞을까..? 아닐까..?
  const [selectedReviewId, setSelectedReviewId] = useState<number>(-1);

  return (
    <>
      <h2>리뷰보기</h2>
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

export default RestaurantReviews;
