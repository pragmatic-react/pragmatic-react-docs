import Modal from "./index";

export function Root({ isOpen, onClose, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal modal--open">
        <div className="modal-backdrop"></div>
        <div className="modal-container">{children}</div>
      </div>
    </Modal>
  );
}

export function Title({ children }) {
  return <h2 className="modal-title text-title">{children}</h2>;
}

export function Description({ children }) {
  return (
    <div className="restaurant-info">
      <p className="restaurant-info__description text-body">{children}</p>
    </div>
  );
}

export function ButtonContainer({ children }) {
  return <div className="button-container">{children}</div>;
}
