const categorySrc = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export default function RestaurantItem({
  category,
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
        <img
          src={categorySrc[category]}
          alt={category}
          className="category-icon"
        />
      </div>
      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{name}</h3>
        <p className="restaurant__description text-body">{description}</p>
      </div>
    </li>
  );
}
