import { Modal, ModalContextType } from "../../UI/Modal";
import useRestaurants from "../../hooks/useRestaurants";
import {
  Restaurant as RestaurantType,
  RestaurantSubmitType,
} from "../../models";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

const testData: RestaurantSubmitType = {
  name: "정돈",
  description: "정갈하고 맛있는 부드러운 돈까스",
  category: "일식",
};

const AddRestaurantForm = ({ onClose }) => {
  const { addRestaurant } = useRestaurants();

  const onSubmit = async () => {
    await addRestaurant(testData);
    onClose();
  };
  return (
    <form>
      <div className="form-item form-item--required">
        <label htmlFor="category text-caption">카테고리</label>
        <select className="category" id="category" required>
          <option value="">선택해 주세요</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="form-item form-item--required">
        <label htmlFor="name text-caption">이름</label>
        <input type="text" name="name" id="name" />
      </div>

      <div className="form-item">
        <label htmlFor="description text-caption">설명</label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
        ></textarea>
        <span className="help-text text-caption">
          메뉴 등 추가 정보를 입력해 주세요.
        </span>
      </div>

      <div className="button-container">
        <button
          className="button button--primary text-caption"
          onClick={onSubmit}
        >
          추가하기
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
      <Modal.CloseButton />
    </Modal>
  );
};

export default AddRestaurantModal;
