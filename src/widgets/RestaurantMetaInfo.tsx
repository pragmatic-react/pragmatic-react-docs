import { RestaurantMetaInfo as RestaurantMetaInfoProps } from "../entities/restaurant/restaurant.type";

const RestaurantMetaInfo = ({
  metaInfo: { reviewCount, rating, deliveryTime },
}: {
  metaInfo: RestaurantMetaInfoProps;
}) => {
  return (
    <div className="restaurant-meta">
      {reviewCount && (
        <span className="restaurant-meta__rating">{reviewCount}</span>
      )}
      {rating && <span className="restaurant-meta__rating">{rating}</span>}
      {deliveryTime && (
        <span className="restaurant-meta__rating">{deliveryTime}</span>
      )}
    </div>
  );
};

export default RestaurantMetaInfo;
