import { useEffect, useState } from 'react';

import { AddRestaurantData, CATEGORY_OPTIONS, addRestaurantData } from '@entities/restaurant';

import { useMutation } from '@shared/hooks';
import { Drawer } from '@shared/ui';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const checkedForm = (form: Partial<AddRestaurantData['request']>): form is AddRestaurantData['request'] => {
  if (!form.name || !form.category || !form.description) return false;

  return true;
};

const initialForm: Partial<AddRestaurantData['request']> = {
  name: undefined,
  description: undefined,
  category: undefined,
};

export const AddRestaurantModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState<Partial<AddRestaurantData['request']>>(initialForm);

  const { mutate, isLoading } = useMutation({
    mutationFunction: addRestaurantData,
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      alert('추가에 실패했습니다.');
    },
  });

  const isDisabled = !checkedForm(form);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    mutate(form);
  };

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title text-title">새로운 음식점</h2>
      <form onSubmit={handleSubmit} id="add-restaurant-form">
        <div className="form-item form-item--required">
          <label htmlFor="category" className="text-caption">
            카테고리
          </label>
          <select name="category" id="category" required onChange={handleChange('category')}>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value ?? 'default'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-item form-item--required">
          <label htmlFor="name" className="text-caption">
            이름
          </label>
          <input type="text" name="name" id="name" required onChange={handleChange('name')} />
        </div>

        <div className="form-item">
          <label htmlFor="description" className="text-caption">
            설명
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            onChange={handleChange('description')}
          ></textarea>
          <span className="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div className="button-container">
          <button
            className={`button ${isDisabled ? 'button--disabled' : 'button--primary'} text-caption`}
            type="submit"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? '추가중...' : '추가하기'}
          </button>
        </div>
      </form>
    </Drawer>
  );
};
