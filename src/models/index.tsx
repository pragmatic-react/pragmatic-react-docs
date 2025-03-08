type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

const CATEGORY_IMAGE_SRC: Record<Category, string> = {
  한식: "templates/category-asian.png",
  중식: "templates/category-chinese.png",
  양식: "templates/category-western.png",
  일식: "templates/category-japanese.png",
  아시안: "templates/category-asian.png",
  기타: "templates/category-etc.png",
};

export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: Category
  ) {}

  getCategoryImgSrc() {
    return CATEGORY_IMAGE_SRC[this.category];
  }
}
