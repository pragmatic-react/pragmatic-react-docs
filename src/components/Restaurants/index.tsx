import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Restaurant as RestaurantType } from "../../models";
import RestaurantInfoModal, {
  RestaurantModalData,
} from "./RestaurantInfoModal";
import RestaurantList from "./RestaurantList";
import Section from "../../UI/Section";

const RestaurantSection = () => {
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
