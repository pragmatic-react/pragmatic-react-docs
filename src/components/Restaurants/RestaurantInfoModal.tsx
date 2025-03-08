import { Modal, ModalContextType } from "../../UI/Modal";
import { Restaurant as RestaurantType } from "../../models";

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
}: RequestModalProps) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <Modal.Title />
      <RestaurantInfo description={description} />
      <Modal.CloseButton />
    </Modal>
  );
};

export default RestaurantInfoModal;
