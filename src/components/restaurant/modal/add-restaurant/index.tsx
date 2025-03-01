import { Button, CommonModalProps, Modal } from '@/components';
import { itemInfoStyle } from './style';

interface AddRestaurantModalProps extends CommonModalProps {}

export function AddRestaurantModal({ isOpen, onClose }: AddRestaurantModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="bottom">
      <Modal.Header>새로운 음식점</Modal.Header>
      <Modal.Body css={itemInfoStyle}></Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onClose}>
          취소하기
        </Button>
        <Button
          color="primary"
          onClick={() => alert('추가하시겠습니까? (아직 구현중인 기능입니다..!🥹)')}
        >
          추가하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
