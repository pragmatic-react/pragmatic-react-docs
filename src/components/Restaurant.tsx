import { useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantModal";

import Section from "../UI/Section";

const Restaurant = ({
  restaurant,
  onClick,
}: {
  restaurant: RestaurantType;
  onClick: (data: RestaurantModalData) => void;
}) => {
  const onClickRestaurant = () => {
    onClick(restaurant);
  };

  return (
    <li className="restaurant" key={restaurant.id} onClick={onClickRestaurant}>
      <div className="restaurant__category">
        <img
          src={restaurant.getCategeryImgSrc()}
          alt={restaurant.category}
          className="category-icon"
        />
      </div>
      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{restaurant.name}</h3>
        <p className="restaurant__description text-body">
          {restaurant.description}
        </p>
      </div>
    </li>
  );
};

const RestaurantList = ({
  data,
  openRestaurantModal,
}: {
  data: RestaurantType[] | undefined;
  openRestaurantModal: (data: RestaurantModalData) => void;
}) => {
  return (
    <ul className="restaurant-list">
      {data &&
        data.map((restaurant) => (
          <Restaurant
            restaurant={restaurant}
            key={restaurant.id}
            onClick={openRestaurantModal}
          />
        ))}
    </ul>
  );
};

const RestaurantSection = () => {
  const { restaurants } = useRestaurants();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RestaurantModalData>();

  const openRestaurantModal = (data: RestaurantModalData) => {
    setModalOpen(true);
    setModalData(data);
  };

  const onCloseRestaurantModal = () => {
    setModalOpen(false);
  };

  return (
    <Section className="restaurant-list-container">
      <RestaurantList
        data={restaurants}
        openRestaurantModal={openRestaurantModal}
      />
      <RestaurantModal
        open={modalOpen}
        restaurant={{
          name: modalData?.name || "",
          description: modalData?.description || "",
        }}
        onClose={onCloseRestaurantModal}
      />
    </Section>
  );
};

export { Restaurant, RestaurantList, RestaurantSection };
