import { FC } from "react";
import { Modal, ModalContextType } from "../../UI/Modal";

type ReviewDetail = {
  title: string;
  content: string;
  author: string;
  date: string;
  imageSrc?: string;
  rating: number;
};
interface ReviewDetailModalProps {
  reviewId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDetail = (reviewDetail: ReviewDetail) => {
  return (
    <div className="review-detail">
      <div className="review-detail__content">
        <p>{reviewDetail.content}</p>
      </div>
      <div className="review-detail__author">
        <span>{reviewDetail.author}</span>
        <span>{reviewDetail.date}</span>
      </div>
      {reviewDetail.imageSrc && (
        <div className="review-detail__image">
          <img src={reviewDetail.imageSrc} alt={reviewDetail.title} />
        </div>
      )}
    </div>
  );
};

const ReviewDetailModal: FC<ReviewDetailModalProps> = ({
  reviewId,
  isOpen,
  onClose,
}) => {
  // todo : reviewId를 이용해 리뷰 상세 정보를 가져온다.
  const reviewDetail = {
    title: "맛있어요",
    content: "good",
    author: "홍길동",
    date: "2021-09-01",
    imageSrc: "https://via.placeholder.com/150",
    rating: 5,
  };

  return (
    reviewId > 0 &&
    reviewDetail && (
      <Modal title={reviewDetail.title} isOpen={isOpen} onClose={onClose}>
        <Modal.Title />
        <ReviewDetail {...reviewDetail} />
        <Modal.CloseButton />
      </Modal>
    )
  );
};

export default ReviewDetailModal;
