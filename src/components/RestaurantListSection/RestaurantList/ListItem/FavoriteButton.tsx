import { useState } from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button
      className="favorite-button"
      onClick={(e) => {
        e.stopPropagation();
        setIsFavorite((prev) => !prev);
      }}
    >
      {isFavorite ? "★ 즐겨찾기 취소" : "☆ 즐겨찾기"}
    </button>
  );
};

export default FavoriteButton;
