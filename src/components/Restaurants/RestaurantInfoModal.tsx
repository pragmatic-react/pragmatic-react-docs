import Modal, { ModalType } from "../../UI/Modal";
import { Restaurant as RestaurantType } from "../../models";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

export type RequestModalProps = ModalType & {
  restaurant: RestaurantModalData;
};

const RestaurantInfoModal = ({
  restaurant,
  isOpen,
  onClose,
}: RequestModalProps) => {
  return (
    <Modal title={restaurant.name} isOpen={isOpen} onClose={onClose}>
      <div className="restaurant-info">
        <p className="restaurant-info__description text-body">
          {restaurant.description}
        </p>
      </div>
    </Modal>
  );
};

export default RestaurantInfoModal;
