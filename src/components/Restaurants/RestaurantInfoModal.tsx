import { useEffect } from "react";
import { Modal, ModalContextType } from "../../UI/Modal";
import { Restaurant as RestaurantType } from "../../models";
// import useRestaurants from "../../hooks/useRestaurants";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

export type RequestModalProps = ModalContextType & {
  restaurant: RestaurantModalData;
};

const RestaurantInfo = ({ description }: { description: string }) => {
  return (
    <div className="restaurant-info">
      <p className="restaurant-info__description text-body">{description}</p>
    </div>
  );
};

const RestaurantInfoModal = ({
  title,
  isOpen,
  description,
  onClose,
  restaurant,
}: RequestModalProps) => {
  // const { getRecommendMenus, recommends } = useRestaurants();

  // useEffect(() => {
  //   getRecommendMenus(restaurant.name);
  // }, []);

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <Modal.Title />
      <RestaurantInfo description={description} />
      {/* {recommendMenuError ? <p>메뉴 오류 안내 문구</p>} */}
      {/* {recommends && <Recommends recommends={recommends} />} */}
      <Modal.CloseButton />
    </Modal>
  );
};

export default RestaurantInfoModal;
