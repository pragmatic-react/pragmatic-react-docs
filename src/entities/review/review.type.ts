const reviewDetail = {
  title: "맛있어요",
  content: "good",
  author: "홍길동",
  date: "2021-09-01",
  imageSrc: "https://via.placeholder.com/150",
  rating: 5,
};

const reviewSummarys = [
  { reviewId: 1, title: "맛있어요", rating: 5 },
  { reviewId: 2, title: "좋아요", rating: 1 },
];

export type reviewDetail = {
  title: string;
  content: string;
  author: string;
  date: string;
  imageSrc?: string;
  rating: number;
  reviewId: number;
};

export type reviewSummary = Pick<reviewDetail, "reviewId" | "title" | "rating">;
