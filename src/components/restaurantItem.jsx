export default function RestaurantItem({
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
