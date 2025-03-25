import { useRef } from "react";
import RestaurantService from "../services/restaurantApi";
import { RestaurantCategoryType } from "../services/restaurantIType";

export default function CreateRestaurant({
  closeModal,
  refetch,
}: {
  closeModal: () => void;
  refetch: () => Promise<void>;
}) {
  const name = useRef("");
  const category = useRef("");
  const description = useRef("");

  async function onSubmit() {
    const data = {
      name: name.current,
      category: category.current,
      description: description.current,
    };

    try {
      await RestaurantService.CreateInfo({
        data: {
          id: `a${Math.floor(Math.random() * 90) + 10}`,
          name: data.name as string,
          category: data.category as RestaurantCategoryType,
          description: data.description as string,
        },
      });

      await refetch();
      closeModal();
    } catch (e) {
      window.alert("예기치못한 에러가 발생했습니다.");
      console.error(e);
    }
  }

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     const formData = new FormData(e.currentTarget);

  //     const data = {
  //       name: formData.get("name"),
  //       category: formData.get("category"),
  //       description: formData.get("description"),
  //     };

  //     try {
  //       await RestaurantService.CreateInfo({
  //         data: {
  //           id: `a${Math.floor(Math.random() * 90) + 10}`,
  //           name: data.name as string,
  //           category: data.category as RestaurantCategoryType,
  //           description: data.description as string,
  //         },
  //       });

  //       await refetch();
  //       closeModal();
  //     } catch (e) {
  //       window.alert("예기치못한 에러가 발생했습니다.");
  //       console.error(e);
  //     }
  //   };

  return (
    <form>
      <div className="form-item form-item--required">
        <label htmlFor="category" className="text-caption">
          카테고리
        </label>
        <select
          name="category"
          id="category"
          required
          onChange={(e) => {
            category.current = e.target.value;
          }}
        >
          <option value="">선택해 주세요</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="form-item form-item--required">
        <label htmlFor="name" className="text-caption">
          이름
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onBlur={(e) => {
            name.current = e.target.value;
          }}
        />
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
          onBlur={(e) => {
            description.current = e.target.value;
          }}
        ></textarea>
        <span className="help-text text-caption">
          메뉴 등 추가 정보를 입력해 주세요.
        </span>
      </div>

      <div className="button-container">
        <button
          type="button"
          className="button button--secondary text-caption"
          onClick={() => {
            closeModal();
          }}
        >
          취소하기
        </button>
        <button
          type="button"
          className="button button--primary text-caption"
          onClick={onSubmit}
        >
          추가하기
        </button>
      </div>
    </form>
  );
}
