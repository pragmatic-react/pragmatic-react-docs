import Modal from "./Modal";

function RestaurantDetailModal({ selectedRestaurant, onClose, open }) {
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
          <Modal.Button>닫기</Modal.Button>
        </Modal.ButtonContainer>
      </Modal.Footer>
    </Modal>
  );
}
export default RestaurantDetailModal;
