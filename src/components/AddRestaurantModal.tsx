import { FormEvent, useState } from "react";
import Modal from "./Modal";
import { Category } from "../types/restaurant";
import { useAddRestaurant } from "../hooks/useAddRestaurant";
import ErrorMessage from "./ErrorMessage";

function AddRestaurantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [category, setCategory] = useState<Category | "">("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNewRestaurant, errorMessage, isError } = useAddRestaurant();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!isFormValid) return;

    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;

    const newRestaurant = {
      id: new Date().toISOString(),
      category,
      name,
      description,
    };

    try {
      await addNewRestaurant(newRestaurant);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // TODO: 추후 validation 로직 추가
  const isFormValid = category !== "" && name !== "";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>새로운 음식점</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          {/* // TODO: select 중복 개선 */}
          <div className="form-item form-item--required">
            <label htmlFor="category text-caption">카테고리</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              required
            >
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
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

          <Modal.Footer>
            <Modal.ButtonContainer>
              <Modal.Button
                type="submit"
                disabled={!isFormValid || isSubmitting || isError}
              >
                {isSubmitting ? "추가 중..." : "추가하기"}
              </Modal.Button>
            </Modal.ButtonContainer>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddRestaurantModal;
