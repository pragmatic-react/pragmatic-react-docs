import { useCallback, useEffect, useState } from 'react';

import { CATEGORY_OPTIONS } from '@entities/restaurant';

import { Drawer } from '@shared/ui';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddRestaurantModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(form);
    },
    [form],
  );

  const handleChange = useCallback(
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    },
    [],
  );

  const isDisabled = form.name === '' || form.category === '' || form.description === '';

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: '',
        description: '',
        category: '',
      });
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
              <option key={option.value} value={option.value}>
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
            disabled={isDisabled}
          >
            추가하기
          </button>
        </div>
      </form>
    </Drawer>
  );
};
