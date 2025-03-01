import { useState, useReducer } from "react";
import Modal from "./components/modal";

const restaurantData = [
  {
    id: 1,
    categorySrc: "./category-korean.png",
    categoryAlt: "한식",
    name: "피양콩할마니",
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
  },
  {
    id: 2,
    categorySrc: "./category-chinese.png",
    categoryAlt: "중식",
    name: "친친",
    description:
      "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
  },
  {
    id: 3,
    categorySrc: "./category-japanese.png",
    categoryAlt: "일식",
    name: "잇쇼우",
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
  },
  {
    id: 4,
    categorySrc: "./category-western.png",
    categoryAlt: "양식",
    name: "이태리키친",
    description: "늘 변화를 추구하는 이태리키친입니다.",
  },
  {
    id: 5,
    categorySrc: "./category-asian.png",
    categoryAlt: "아시안",
    name: "호아빈 삼성점",
    description: "푸짐한 양에 국물이 일품인 쌀국수",
  },
  {
    id: 6,
    categorySrc: "./category-etc.png",
    categoryAlt: "기타",
    name: "도스타코스 선릉점",
    description: "멕시칸 캐주얼 그릴",
  },
];

export default function Container() {
  /* ---------------------------------- Modal --------------------------------- */
  const [isOpenModal, setIsOpenModal] = useReducer(
    (pre, next) => {
      const { type, isOpen } = next;

      return { ...pre, [type]: isOpen };
    },
    {
      detail: false,
      create: false,
    }
  );

  const toggleModal = (type, isOpen) => () => {
    setIsOpenModal({ type, isOpen });
  };

  /* --------------------------- Selected restaurant -------------------------- */
  const [selectedRestaurant, setSelectedRestaurant] = useState({
    id: 0,
    categorySrc: "",
    categoryAlt: "",
    name: "",
    description: "",
  });

  function handleClickRestaurantItem(restaurantItem) {
    toggleModal("detail", true)();
    setSelectedRestaurant(restaurantItem);
  }

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
            {restaurantData.map((item) => (
              <RestaurantItem
                key={crypto.randomUUID()}
                categorySrc={item.categorySrc}
                categoryAlt={item.categoryAlt}
                name={item.name}
                description={item.description}
                onClick={() => handleClickRestaurantItem(item)}
              />
            ))}
          </ul>
        </section>
      </main>

      <aside>
        {/* 음식점 정보 모달 */}
        <RestaurantModal
          title={selectedRestaurant.name}
          description={selectedRestaurant.description}
          isOpen={isOpenModal.detail}
        >
          <button
            className="button button--primary text-caption"
            onClick={toggleModal("detail", false)}
          >
            닫기
          </button>
        </RestaurantModal>

        {/* 음식점 추가 모달 */}
        <RestaurantModal title="새로운 음식점" isOpen={isOpenModal.create}>
          <form>
            <div className="form-item form-item--required">
              <label htmlFor="category" className="text-caption">
                카테고리
              </label>
              <select name="category" id="category" required>
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
              <label htmlFor="name" className="text-caption">
                이름
              </label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="form-item">
              <label htmlFor="description" className="text-caption">
                설명
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span className="help-text text-caption">
                메뉴 등 추가 정보를 입력해 주세요.
              </span>
            </div>

            <div className="button-container">
              <button
                type="button"
                className="button button--secondary text-caption"
                onClick={toggleModal("create", false)}
              >
                취소하기
              </button>
              <button className="button button--primary text-caption">
                추가하기
              </button>
            </div>
          </form>
        </RestaurantModal>
      </aside>
    </div>
  );
}

function RestaurantItem({
  categorySrc,
  categoryAlt,
  name,
  description,
  onClick,
}) {
  return (
    <li
      className="restaurant"
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        // 엔터, 스페이스 키보드 이벤트 시
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="restaurant__category">
        <img src={categorySrc} alt={categoryAlt} className="category-icon" />
      </div>
      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{name}</h3>
        <p className="restaurant__description text-body">{description}</p>
      </div>
    </li>
  );
}

function RestaurantModal({ title, description, children, isOpen }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="modal modal--open">
        <div className="modal-backdrop"></div>
        <div className="modal-container">
          <h2 className="modal-title text-title">{title}</h2>
          {description && (
            <div className="restaurant-info">
              <p className="restaurant-info__description text-body">
                {description}
              </p>
            </div>
          )}
          <div className="button-container">{children}</div>
        </div>
      </div>
    </Modal>
  );
}
