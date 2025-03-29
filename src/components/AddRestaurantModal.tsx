import { FormEvent, useState } from "react";
import Modal from "./Modal";
import { addRestaurant, fetchRestaurants } from "../api/restaurant";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import ErrorMessage from "./ErrorMessage";
import useForm from "../hooks/useForm";

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

  const { register, errors } = useForm<"name" | "category" | "description">();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // if (!isFormValid) return;

    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;
    console.log("name data", formData.get("name"));

    const newRestaurant = {
      id: new Date().toISOString(),
      // category,
      name,
      description,
    };

    try {
      await addNewRestaurant(newRestaurant as any);
      refetchRestaurants();
      onClose();
    } catch (error) {
      console.error("Failed to add new restaurant:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // // TODO: 추후 validation 로직 추가
  // const isFormValid = category !== "" && name !== "";

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
              {...register("category")}
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
            {errors.category && (
              <ErrorMessage>카테고리를 확인해 주세요.</ErrorMessage>
            )}
          </div>

          <div className="form-item form-item--required">
            <label htmlFor="name text-caption">이름</label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", {
                validate: (value: string) => value.length < 10,
              })}
              required
            />

            {errors.name && <ErrorMessage>이름을 확인해 주세요.</ErrorMessage>}
          </div>

          <div className="form-item">
            <label htmlFor="description text-caption">설명</label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={5}
              {...register("description", {
                validate: (value: string) => value.length > 20,
              })}
            ></textarea>

            <span className="help-text text-caption">
              메뉴 등 추가 정보를 입력해 주세요.
            </span>

            {errors.description && (
              <ErrorMessage>20자 이상 입력해 주세요.</ErrorMessage>
            )}
          </div>

          <Modal.Footer>
            <Modal.ButtonContainer>
              <Modal.Button
                type="submit"
                // disabled={!isFormValid || isSubmitting || isError}
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
