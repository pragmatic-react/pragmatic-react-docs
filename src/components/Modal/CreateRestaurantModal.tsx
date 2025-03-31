import React from 'react';
import Modal from './Modal';
import { Restaurant } from '../../interface/restaurant';
import Label from '../Form/Label';
import { useForm } from '../../hooks/useForm';

function CreateRestaurantModal({
  isOpen,
  closeModal,
  onAddRestaurant,
  isFetching,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onAddRestaurant: (restaurant: Omit<Restaurant, 'id'>) => Promise<void>;
  isFetching: boolean;
}) {
  const { register, handleSubmit, errors, resetForm } = useForm({
    fields: {
      name: {
        required: true,
        validate: (value: string) =>
          value.length < 2 ? '이름은 2글자 이상이어야 합니다.' : undefined,
      },
      category: {
        required: true,
        initialValue: '한식',
      },
      description: {
        required: true,
        validate: (value) => (value.length < 10 ? '설명은 10글자 이상이어야 합니다.' : undefined),
      },
      distance: {
        required: true,
      },
      link: {
        required: false,
        validate: (value) => {
          try {
            if (value) {
              new URL(value);
              return undefined;
            } else {
              return undefined;
            }
          } catch {
            return '올바른 URL을 입력해주세요.';
          }
        },
      },
    },
    onSubmit: async (values) => {
      const restaurant = {
        ...values,
        distance: Number(values.distance),
      } as Omit<Restaurant, 'id'>;
      await onAddRestaurant(restaurant);
      resetForm();
      closeModal();
    },
  });

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.Title>새로운 음식점</Modal.Title>
      {errors.form && <p className='text-red-500'>{errors.form}</p>}
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <Label required htmlFor='category'>
          카테고리
        </Label>
        <select
          {...register('category')}
          name='category'
          className='w-full rounded-md border-2 border-gray-300 p-2'
        >
          <option value='한식'>한식</option>
          <option value='양식'>양식</option>
          <option value='일식'>일식</option>
          <option value='중식'>중식</option>
          <option value='분식'>분식</option>
          <option value='치킨'>치킨</option>
        </select>
        {errors.category && <p className='text-red-500'>{errors.category}</p>}

        <Label required htmlFor='name'>
          이름
        </Label>
        <input
          {...register('name')}
          className='w-full rounded-md border-2 border-gray-300 p-2'
          type='text'
          name='name'
        />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}

        <Label required htmlFor='distance'>
          거리(도보이동시간)
        </Label>
        <select
          {...register('distance')}
          name='distance'
          className='w-full rounded-md border-2 border-gray-300 p-2'
        >
          <option value='10'>10분</option>
          <option value='15'>15분</option>
          <option value='20'>20분</option>
          <option value='25'>25분</option>
          <option value='30'>30분</option>
        </select>
        {errors.distance && <p className='text-red-500'>{errors.distance}</p>}

        <Label required htmlFor='description'>
          설명
        </Label>
        <textarea
          {...register('description')}
          className='w-full rounded-md border-2 border-gray-300 p-2'
          name='description'
        />
        {errors.description && <p className='text-red-500'>{errors.description}</p>}

        <Label htmlFor='link'>참고 링크</Label>
        <input
          {...register('link')}
          placeholder='https://www.example.com'
          className='w-full rounded-md border-2 border-gray-300 p-2'
          type='text'
          name='link'
        />
        {errors.link && <p className='text-red-500'>{errors.link}</p>}
        <Modal.Footer>
          <Modal.Button type='button' colorType='white' onClick={closeModal}>
            취소
          </Modal.Button>
          <Modal.Button type='submit' colorType='orange' disabled={isFetching}>
            {isFetching ? '추가중...' : '추가'}
          </Modal.Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateRestaurantModal;
