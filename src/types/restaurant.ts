type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

type CategorySelectList = Category | "전체";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: Category;
}

export { Restaurant, Category, CategorySelectList };
