import { useState } from "react";
import Modal from "./Modal";
import { addRestaurant, fetchRestaurants } from "../api/restaurant";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import ErrorMessage from "./ErrorMessage";
import useForm from "../hooks/useForm";
import { Category } from "../types/restaurant";

type FormData = {
  name: string;
  category: Category;
  description: string;
};

function AddRestaurantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    mutate: addNewRestaurant,
    isError,
    errorMessage,
  } = useMutation({
    fn: addRestaurant,
  });

  const { refetch: refetchRestaurants } = useFetch({
    apiKey: "restaurants",
    fn: fetchRestaurants,
    enabled: false,
  });

  const { register, errors, onSubmit, checkFormValidity } =
    useForm<keyof FormData>();

  const handleSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true);

    try {
      await addNewRestaurant({
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        category: data.category as Category,
      });
      refetchRestaurants();
      onClose();
    } catch (error) {
      console.error("Failed to add new restaurant:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>새로운 음식점</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <form onSubmit={onSubmit(handleSubmit)}>
          {/* // TODO: select 중복 개선 */}
          <div className="form-item form-item--required">
            <label htmlFor="category text-caption">카테고리</label>
            <select
              name="category"
              id="category"
              {...register("category", {
                validate: (value: string) => {
                  if (value === "") return "카테고리를 선택해 주세요.";
                },
                isRequired: true,
              })}
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

            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
          </div>

          <div className="form-item form-item--required">
            <label htmlFor="name text-caption">이름</label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", {
                validate: (value: string) => {
                  if (value.length < 10) return "10자 이상 입력해 주세요.";
                },
                isRequired: true,
              })}
            />

            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </div>

          <div className="form-item">
            <label htmlFor="description text-caption">설명</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              {...register("description")}
            ></textarea>

            <span className="help-text text-caption">
              메뉴 등 추가 정보를 입력해 주세요.
            </span>

            {errors.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
          </div>

          <Modal.Footer>
            <Modal.ButtonContainer>
              <Modal.Button
                type="submit"
                disabled={isSubmitting || isError || !checkFormValidity()}
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
