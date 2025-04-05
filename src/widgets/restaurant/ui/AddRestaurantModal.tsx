import { AddRestaurantData, CATEGORY_OPTIONS, addRestaurantData } from '@entities/restaurant';

import { useForm, useMutation } from '@shared/hooks';
import { useFetchContext } from '@shared/providers';
import { Drawer, Form } from '@shared/ui';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const initialForm: Partial<AddRestaurantData['request']> = {
  name: undefined,
  description: undefined,
  category: undefined,
};

export const AddRestaurantModal = ({ isOpen, onClose }: Props) => {
  const { triggerRefetch } = useFetchContext();

  const { mutate, isLoading } = useMutation({
    mutationFunction: addRestaurantData,
    onSuccess: () => {
      onClose();
      triggerRefetch(['restaurant-list']);
    },
    onError: () => {
      alert('추가에 실패했습니다.');
    },
  });

  const formInstance = useForm<Omit<AddRestaurantData['request'], 'id'>>({
    initialValues: initialForm,
    onSubmit: (values) => {
      mutate(values);
    },
    onReset: onClose,
  });

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title text-title">새로운 음식점</h2>
      <Form name="add-restaurant-form" form={formInstance}>
        <Form.Item name="category" label="카테고리" required>
          <select name="category" id="category" required>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value ?? 'default'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item name="name" label="이름" required>
          <input type="text" name="name" id="name" required />
        </Form.Item>

        <Form.Item name="description" label="설명">
          <textarea name="description" id="description" cols={30} rows={5} />

          <span className="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </Form.Item>

        <div className="button-container">
          <Form.Reset disabled={isLoading}>취소</Form.Reset>

          <Form.Submit disabled={formInstance.isError || isLoading}>{isLoading ? '추가중...' : '추가하기'}</Form.Submit>
        </div>
      </Form>
    </Drawer>
  );
};
