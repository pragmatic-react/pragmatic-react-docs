import { Modal, ModalContextType } from "../../UI/Modal";
import AddRestaurantForm from "./Form/AddRestaurantForm";
import { Restaurant as RestaurantType } from "../../models";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

const AddRestaurantModal = ({ isOpen, onClose }: ModalContextType) => {
  return (
    <Modal title="새로운 음식점" isOpen={isOpen} onClose={onClose}>
      <Modal.Title />
      <AddRestaurantForm onClose={onClose} />
    </Modal>
  );
};

export default AddRestaurantModal;
