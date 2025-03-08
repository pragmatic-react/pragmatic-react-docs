import { Restaurant } from "../types/restaurant";
import Modal from "./Modal";

interface RestaurantDetailModalProps {
  selectedRestaurant: Restaurant | null;
  onClose: () => void;
  open: boolean;
}

function RestaurantDetailModal({
  selectedRestaurant,
  onClose,
  open,
}: RestaurantDetailModalProps) {
  if (!selectedRestaurant) return null;

  const { name, description } = selectedRestaurant;
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="restaurant-info">
          <p className="restaurant-info__description text-body">
            {description}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Modal.ButtonContainer>
          <Modal.Button onClick={onClose}>닫기</Modal.Button>
        </Modal.ButtonContainer>
      </Modal.Footer>
    </Modal>
  );
}
export default RestaurantDetailModal;
