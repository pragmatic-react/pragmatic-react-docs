import { useState } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantModal";
import RestaurantList from "./RestaurantList";
import Section from "../../UI/Section";

const RestaurantSection = () => {
  const { restaurants } = useRestaurants();

  // todo : 모달 상태 관리
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RestaurantModalData>({
    name: "",
    description: "",
  });

  const openRestaurantModal = (data: RestaurantType) => {
    setModalOpen(true);
    setModalData({
      name: data?.name || "",
      description: data?.description || "",
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
        isOpen={modalOpen}
        restaurant={modalData}
        onClose={onCloseRestaurantModal}
      />
    </Section>
  );
};

export default RestaurantSection;
