const CATEGORY_IMAGE_SRC = {
  한식: "templates/category-asian.png",
  중식: "templates/category-chinese.png",
  양식: "templates/category-western.png",
  일식: "templates/category-japanese.png",
  아시안: "templates/category-asian.png",
  기타: "category-etc.png",
} as const;

export class Restaurant {
  public id: string;
  public name: string;
  public description: string;
  public category: keyof typeof CATEGORY_IMAGE_SRC;

  constructor(
    id: string,
    name: string,
    description: string,
    category: keyof typeof CATEGORY_IMAGE_SRC
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
  }

  getCategeryImgSrc() {
    return CATEGORY_IMAGE_SRC[this.category];
  }
}
