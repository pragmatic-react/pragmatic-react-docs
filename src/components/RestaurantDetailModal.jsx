import Modal from "./Modal";

function RestaurantDetailModal({ selectedRestaurant, onClose, open }) {
  if (!selectedRestaurant) return null;

  const { name, description } = selectedRestaurant;
  return (
    <Modal open={open} onClose={onClose} title={name}>
      <div className="restaurant-info">
        <p className="restaurant-info__description text-body">{description}</p>
      </div>
      <div className="button-container">
        <button
          className="button button--primary text-caption"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
export default RestaurantDetailModal;
