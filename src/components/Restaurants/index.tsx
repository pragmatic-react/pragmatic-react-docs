import { useState } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantInfoModal";
import RestaurantList from "./RestaurantList";
import Section from "../../UI/Section";
import AddRestaurantModal from "./AddRestaurantModal";

const RestaurantSection = ({ addModalOpen, setAddModalOpen }) => {
  const { restaurants, addRestaurant } = useRestaurants();

  // todo : 모달 상태 관리
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
      <RestaurantModal
        isOpen={infoModalOpen}
        restaurant={modalData}
        onClose={onCloseRestaurantModal}
      />
      <AddRestaurantModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        addRestaurant={addRestaurant}
      />
    </Section>
  );
};

export default RestaurantSection;
