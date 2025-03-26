import React from 'react';

import { Review } from '@entities/restaurant';

import { Button, Drawer } from '@shared/ui';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
};

/**
 * QUESTION: 상위에서 API 호출 후 해당 데이터 일부를 뿌려줘야 하는 경우, 주로 어떻게 처리하는지
 * 1. props로 필요한 데이터를 모두 넘겨준다.
 * 2. id만 가져와 useQuery + selector로 캐싱된 데이터를 가져온다.
 */

export const ReviewDetailDrawer = ({ isOpen, onClose, review }: Props) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p>{review?.content}</p>

        <div>
          <p>{review?.author}</p>
          <p>{review?.date}</p>
        </div>

        <Button type="button" onClick={onClose}>
          닫기
        </Button>
      </div>
    </Drawer>
  );
};
