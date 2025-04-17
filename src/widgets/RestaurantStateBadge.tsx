import { RestaurantStatus } from "../entities/restaurant/restaurant.type";
import Badge, { BadgeStatus } from "../shared/ui/Badge";

type RestaurantStatusTypeName = {
  [key in keyof RestaurantStatus]: string;
};
type RestaurantStatusTypeBadgeStatusMap = {
  [key in keyof RestaurantStatus]: BadgeStatus;
};
const RestaurantStatusLabelMap: RestaurantStatusTypeName = {
  NEW_OPEN: "신규오픈",
  ADVERTISED: "광고",
  CLOSED: "휴무",
  DISCOUNT: "할인",
  FREE_DELIVERY: "무료배달",
};
const RestaurantStatusBadgeStatusMap: RestaurantStatusTypeBadgeStatusMap = {
  NEW_OPEN: "success",
  ADVERTISED: "info",
  CLOSED: "error",
  DISCOUNT: "info",
  FREE_DELIVERY: "success",
};

const RestaurantStatusBadge = ({ status }: { status: RestaurantStatus }) => {
  return (
    <div className="restaurant-state pr-4">
      {Object.keys(status).map((state) => {
        return (
          <Badge
            label={RestaurantStatusLabelMap[state]}
            status={RestaurantStatusBadgeStatusMap[state]}
          />
        );
      })}
    </div>
  );
};

export default RestaurantStatusBadge;
