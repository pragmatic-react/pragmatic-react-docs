import { Button, CommonModalProps, Modal, RestaurantCategoryIcon } from '@/components';
import { FavoriteIcon } from '@/components';
import { Restaurant } from '@/types';
import {
  descriptionStyle,
  distanceStyle,
  headerWrapperStyle,
  itemInfoStyle,
  linkStyle,
  textWrapperStyle,
  titleStyle,
} from './style';

interface RestaurantDetailModalProps extends CommonModalProps {
  item: Restaurant;
}

export function RestaurantDetailModal({ isOpen, onClose, item }: RestaurantDetailModalProps) {
  const { name, distance, description, link, category, is_favorite } = item;

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="bottom">
      <Modal.Header>
        <div css={headerWrapperStyle}>
          <RestaurantCategoryIcon category={category} />
          <FavoriteIcon onClick={() => alert('북마크도 구현 중 ..!')} isFavorite={is_favorite} />
        </div>
        <p css={titleStyle}>{name}</p>
      </Modal.Header>
      <Modal.Body css={itemInfoStyle}>
        <div css={textWrapperStyle}>
          <p css={distanceStyle}>캠퍼스로부터 {distance}분 내</p>
          <p css={descriptionStyle}>{description}</p>
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
