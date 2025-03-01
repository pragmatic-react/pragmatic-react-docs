import useRestaurants from "../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../models";

import Section from "./Section";

const Restaurant = ({ restaurant }: { restaurant: RestaurantType }) => {
  return (
    <li className="restaurant" key={restaurant.id}>
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

const RestaurantList = ({ data }: { data: RestaurantType[] | undefined }) => {
  return (
    <ul className="restaurant-list">
      {data &&
        data.map((restaurant) => (
          <Restaurant restaurant={restaurant} key={restaurant.id} />
        ))}
    </ul>
  );
};

const RestaurantSection = () => {
  const { restaurants } = useRestaurants();

  return (
    <Section className="restaurant-list-container">
      <RestaurantList data={restaurants} />
    </Section>
  );
};

export { Restaurant, RestaurantList, RestaurantSection };
