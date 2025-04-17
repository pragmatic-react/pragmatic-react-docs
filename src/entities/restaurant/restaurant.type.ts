import { CATEGORY_IMAGE_SRC, Category } from "../category/category.type";

// 메타 정보와 상태 뱃지값을 어떻게 관리할까?
export interface RestaurantDto {
  id: string;
  name: string;
  description: string;
  category: Category;
  /**
   * 즐겨찾기여부
   */
  isBookMarked?: boolean;
  /**
   * 신규오픈
   */
  isNewOpen?: boolean;
  /**
   * 휴무여부
   */
  isClosed?: boolean;
  /**
   * 광고여부
   */
  isAdvertised?: boolean;
  /**
   * 할인 여부
   */
  isDiscounted?: boolean;
  /**
   * 평점
   */
  rating?: number;
  /**
   * 리뷰수
   */
  reviewCount?: number;
  /**
   * 배달시간
   */
  deliveryTime?: number;
  /**
   * 무료배달여부
   */
  isFreeDeliveryFee?: boolean;
}

export interface RestaurantMetaInfo {
  reviewCount: number;
  rating: number;
  deliveryTime?: number;
}

export type RestaurantStatusKey =
  | "NEW_OPEN"
  | "CLOSED"
  | "ADVERTISED"
  | "DISCOUNT"
  | "FREE_DELIVERY";

export type RestaurantStatus = {
  [K in RestaurantStatusKey]: boolean;
};

export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: Category,
    public isBookMarked?: boolean,
    public metaInfo?: RestaurantMetaInfo,
    public state?: RestaurantStatus
  ) {}

  // 참조, 방어적 복사 --> 확인...~ 업데이트 시 로직..
  get categoryImgSrc(): string {
    return CATEGORY_IMAGE_SRC[this.category];
  }
}

export type RestaurantSubmitType = Omit<Restaurant, "id" | "categoryImgSrc">;
