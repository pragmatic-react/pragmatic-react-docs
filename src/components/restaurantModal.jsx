import Modal from "./modal";

export default function RestaurantModal({
  title,
  description,
  children,
  isOpen,
  onClose,
}) {
  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      {description && <Modal.Description>{description}</Modal.Description>}
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>
    </Modal.Root>
  );
}
