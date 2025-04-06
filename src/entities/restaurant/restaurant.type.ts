import { CATEGORY_IMAGE_SRC, Category } from "../category/category.type";

export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: Category,
    public isBookMarked?: boolean
  ) {}

  get categoryImgSrc(): string {
    return CATEGORY_IMAGE_SRC[this.category];
  }
}

export type RestaurantSubmitType = Omit<Restaurant, "id" | "categoryImgSrc">;
