import { useState, useReducer, useEffect } from "react";
import RestaurantItem from "./components/restaurantItem";
import RestaurantModal from "./components/restaurantModal";
import { CategoryType } from "./components/restaurantItem";
import RestaurantService from "./services/restaurantApi";
import CreateRestaurant from "./components/createRestaurant";

interface ModalState {
  detail: boolean;
  create: boolean;
}

interface ModalAction {
  type: keyof ModalState;
  isOpen: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
}

export default function Container() {
  /* ---------------------------------- Modal --------------------------------- */
  const [isOpenModal, setIsOpenModal] = useReducer(
    (pre: ModalState, next: ModalAction) => {
      const { type, isOpen } = next;

      // 이미 열려있는 모달일 경우 무시
      if (pre[type] === isOpen) return pre;

      // 모달 상태 업데이트
      return { ...pre, [type]: isOpen };
    },
    {
      detail: false,
      create: false,
    }
  );

  const toggleModal = (type: keyof ModalState, isOpen: boolean) => () => {
    setIsOpenModal({ type, isOpen });
  };

  /* --------------------------- Selected restaurant -------------------------- */
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>({
    id: "",
    name: "",
    description: "",
    category: "한식",
  });

  function handleClickRestaurantItem(restaurantItem: Restaurant) {
    toggleModal("detail", true)();
    setSelectedRestaurant(restaurantItem);
  }

  /* ------------------------------- Data fetch ------------------------------- */
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    const response = await RestaurantService.ReadInfoList({});
    setRestaurants(response.data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      {/* GNB */}
      <header className="gnb">
        <h1 className="gnb__title text-title">점심 뭐 먹지</h1>
        <button
          type="button"
          className="gnb__button"
          aria-label="음식점 추가"
          onClick={toggleModal("create", true)}
        >
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
      </header>

      <main>
        {/* 카테고리/정렬 필터 */}
        <section className="restaurant-filter-container">
          <select
            name="category"
            id="category-filter"
            className="restaurant-filter"
            aria-label="음식점 카테고리 필터"
          >
            <option value="전체">전체</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </select>
        </section>

        {/* 음식점 목록 */}
        <section className="restaurant-list-container">
          <ul className="restaurant-list">
            {restaurants.map((item) => (
              <RestaurantItem
                key={crypto.randomUUID()}
                data={item}
                onClick={() => handleClickRestaurantItem(item)}
              />
            ))}
          </ul>
        </section>
      </main>

      <aside>
        {/* 음식점 정보 모달 */}
        <RestaurantModal
          data={selectedRestaurant}
          isOpen={isOpenModal.detail}
          onClose={toggleModal("detail", false)}
        >
          <button
            className="button button--primary text-caption"
            onClick={toggleModal("detail", false)}
          >
            닫기
          </button>
        </RestaurantModal>

        {/* 음식점 추가 모달 */}
        <RestaurantModal
          data={{ name: "새로운 음식점" }}
          isOpen={isOpenModal.create}
          onClose={toggleModal("create", false)}
        >
          <CreateRestaurant
            closeModal={toggleModal("create", false)}
            refetch={fetchRestaurants}
          />
        </RestaurantModal>
      </aside>
    </div>
  );
}
