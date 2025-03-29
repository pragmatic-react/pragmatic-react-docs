import { Modal, ModalContextType } from "../../UI/Modal";
import useAddRestaurant from "../../hooks/useAddRestaurant";
import { useForm } from "../../hooks/useForm2";
import {
  Restaurant as RestaurantType,
  RestaurantSubmitType,
  CATEGORIES,
  CATEGORY_PLACEHOLDER,
} from "../../models";
import { useRef } from "react";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

// const testData: RestaurantSubmitType = {
//   name: "정돈",
//   description: "정갈하고 맛있는 부드러운 돈까스",
//   category: "일식",
// };

const AddRestaurantForm = ({ onClose }) => {
  const { addRestaurant } = useAddRestaurant();

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<RestaurantSubmitType>(
      {
        name: "",
        category: "",
        description: "",
      },
      {
        name: [
          (v) => (!v.trim() ? "이름을 입력해 주세요." : null),
          (v) => (v.length < 2 ? "이름은 2자 이상이어야 합니다." : null),
        ],
        category: [(v) => (!v ? "카테고리를 선택해 주세요." : null)],
        description: [
          (v) => (v.length > 200 ? "설명은 200자 이내로 입력해 주세요." : null),
        ],
      }
    );

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const onValid = async (data: typeof values) => {
    await addRestaurant(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="form-item">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          value={values.category}
          onChange={handleChange}
          ref={categoryRef}
        >
          <option value="" disabled hidden>
            {CATEGORY_PLACEHOLDER}
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="error-text">{errors.category}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          ref={nameRef}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="description">설명</label>
        <textarea
          name="description"
          id="description"
          value={values.description}
          onChange={handleChange}
          ref={descRef}
        />
        {errors.description && (
          <p className="error-text">{errors.description}</p>
        )}
      </div>
      <div className="button-container">
        <button
          type="submit"
          className="button button--primary text-caption"
          disabled={isSubmitting}
        >
          {isSubmitting ? "추가 중..." : "추가하기"}
        </button>
      </div>
    </form>
  );
};

const AddRestaurantModal = ({ isOpen, onClose }: ModalContextType) => {
  return (
    <Modal title="새로운 음식점" isOpen={isOpen} onClose={onClose}>
      <Modal.Title />
      <AddRestaurantForm onClose={onClose} />
      {/* <Modal.CloseButton /> */}
    </Modal>
  );
};

export default AddRestaurantModal;
