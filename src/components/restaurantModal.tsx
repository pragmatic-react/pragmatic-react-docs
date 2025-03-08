import { PropsWithChildren } from "react";
import Modal from "./modal";

interface RestaurantModalProps {
  data: {
    name: string;
    description?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function RestaurantModal({
  data,
  children,
  isOpen,
  onClose,
}: PropsWithChildren<RestaurantModalProps>) {
  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Title>{data.name}</Modal.Title>
      {data.description && (
        <Modal.Description>{data.description}</Modal.Description>
      )}
      <Modal.ButtonContainer>{children}</Modal.ButtonContainer>
    </Modal.Root>
  );
}
