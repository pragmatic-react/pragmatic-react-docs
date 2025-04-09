import { Button, CommonModalProps, Modal } from '@/components';
import { Restaurant } from '@/types';
import { useFavoriteToggle } from '@/hooks';
import { headerWrapperStyle, itemInfoStyle, linkStyle, textWrapperStyle } from './style';

import { RestaurantCard as Card } from '../../card';

interface RestaurantDetailModalProps extends CommonModalProps {
  item: Restaurant;
}

export function RestaurantDetailModal({ isOpen, onClose, item }: RestaurantDetailModalProps) {
  const { name, distance, description, link, category, is_favorite } = item;

  const { isFavorite, onClick, iconVisible } = useFavoriteToggle({
    isFavorite: is_favorite,
    iconVisible: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="bottom">
      <Modal.Header>
        <div css={headerWrapperStyle}>
          <Card.Icon category={category} />
          <Card.Favorite isFavorite={isFavorite} onClick={onClick} visible={iconVisible} />
        </div>
        <Card.Name>{name}</Card.Name>
      </Modal.Header>
      <Modal.Body css={itemInfoStyle}>
        <div css={textWrapperStyle}>
          <Card.Distance>{distance}</Card.Distance>
          <Card.Description>{description}</Card.Description>
          <p css={linkStyle} onClick={() => window.open(link)}>
            {link}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="secondary"
          onClick={() => alert('삭제하시겠습니까? (아직 구현중인 기능입니다..!🥹)')}
        >
          삭제하기
        </Button>
        <Button color="primary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
