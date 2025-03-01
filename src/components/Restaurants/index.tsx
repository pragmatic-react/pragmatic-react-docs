import { useState } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantModal";
import RestaurantList from "./RestaurantList";
import Section from "../../UI/Section";

const RestaurantSection = () => {
  const { restaurants } = useRestaurants();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RestaurantModalData>({
    name: "",
    description: "",
  });

  const openRestaurantModal = (data: RestaurantType) => {
    setModalOpen(true);
    setModalData({
      name: modalData?.name || "",
      description: modalData?.description || "",
    });
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
        restaurant={modalData}
        onClose={onCloseRestaurantModal}
      />
    </Section>
  );
};

export default RestaurantSection;
