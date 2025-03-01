import Modal from "./modal";

export default function RestaurantModal({
  title,
  description,
  children,
  isOpen,
  onClose,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal modal--open">
        <div className="modal-backdrop"></div>
        <div className="modal-container">
          <h2 className="modal-title text-title">{title}</h2>
          {description && (
            <div className="restaurant-info">
              <p className="restaurant-info__description text-body">
                {description}
              </p>
            </div>
          )}
          <div className="button-container">{children}</div>
        </div>
      </div>
    </Modal>
  );
}
