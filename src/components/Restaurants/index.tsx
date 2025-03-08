import { useState } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../../models";
import RestaurantInfoModal, {
  RestaurantModalData,
} from "./RestaurantInfoModal";
import RestaurantList from "./RestaurantList";
import Section from "../../UI/Section";

const RestaurantSection = () => {
  const { restaurants } = useRestaurants();
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
      <RestaurantList
        data={restaurants}
        openRestaurantModal={openRestaurantInfoModal}
      />
      <RestaurantInfoModal
        title={modalData.name}
        isOpen={infoModalOpen}
        description={modalData.description}
        onClose={onCloseRestaurantModal}
      />
    </Section>
  );
};

export default RestaurantSection;
