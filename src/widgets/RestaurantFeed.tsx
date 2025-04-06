import { Suspense, useState, useEffect, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Restaurant as RestaurantType } from "../entities/restaurant/restaurant.type";
import RestaurantDetailModal, {
  RestaurantModalData,
} from "./RestaurantDetailModal";
import Section from "../shared/ui/Section";
import CardList from "../shared/ui/CardList";
import CardItem from "../shared/ui/CardItem";
import { transformRestauranstDtoToRestaurant } from "../entities/restaurant/restaurant.lib";
import { useFetch } from "../utils/FetchCacheManager";
import { BookmarkRestaurantButoon } from "../features/bookmark-restaurants/bookmark-restaurnats.ui";

type RestaurantItemProps = {
  restaurant: RestaurantType;
  onClick: (data: RestaurantType) => void;
  action?: ReactNode;
};
const RestaurantItem = (props: RestaurantItemProps) => {
  const { restaurant, onClick, action } = props;
  const onClickRestaurant = () => {
    onClick(restaurant);
  };

  return (
    <CardItem className="restaurant" onClick={onClickRestaurant}>
      <CardItem.Icon
        className="restaurant__category"
        src={restaurant.categoryImgSrc}
        alt={restaurant.category}
      />
      <CardItem.Content className="restaurant__info">
        <div className="__info">
          <h3 className="__name text-subtitle">{restaurant.name}</h3>
          <p className="__description text-body">{restaurant.description}</p>
        </div>
      </CardItem.Content>
      {action}
    </CardItem>
  );
};

const RestaurantList = ({
  openRestaurantModal,
}: {
  openRestaurantModal: (data: RestaurantType) => void;
}) => {
  const { data: generalRestaurants, reload: getRestaurants } =
    useFetch<RestaurantType[]>("restaurants");
  const [restaurants, setRestaurant] = useState<RestaurantType[]>([]);

  useEffect(() => {
    setRestaurant(
      transformRestauranstDtoToRestaurant(generalRestaurants || [])
    );
  }, [generalRestaurants]);

  return (
    <CardList className="restaurant-list">
      {restaurants &&
        restaurants.map((restaurant) => (
          <RestaurantItem
            restaurant={restaurant}
            key={restaurant.id}
            onClick={openRestaurantModal}
            action={<BookmarkRestaurantButoon restaurant={restaurant} />}
          />
        ))}
    </CardList>
  );
};

const RestaurantFeed = () => {
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RestaurantModalData>({
    name: "",
    description: "",
  });

  const openRestaurantInfoModal = (data: RestaurantType) => {
    setInfoModalOpen(true);
    setModalData({
      name: data?.name || "",
      description: data?.description || "",
    });
  };

  const onCloseRestaurantModal = () => {
    setInfoModalOpen(false);
  };

  return (
    <Section className="restaurant-list-container">
      <ErrorBoundary fallback={<p>리스트 조회 중 오류가 발생하였습니다.</p>}>
        <Suspense fallback={<p>로딩중</p>}>
          <RestaurantList openRestaurantModal={openRestaurantInfoModal} />
        </Suspense>
      </ErrorBoundary>
      <RestaurantDetailModal
        title={modalData.name}
        isOpen={infoModalOpen}
        description={modalData.description}
        onClose={onCloseRestaurantModal}
      />
    </Section>
  );
};

export default RestaurantFeed;
