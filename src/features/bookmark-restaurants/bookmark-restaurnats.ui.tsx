import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Restaurant } from "../../entities/restaurant/restaurant.type";

export function BookmarkRestaurantButoon(props: { restaurant: Restaurant }) {
  const { restaurant } = props;

  //   const { mutate } = useFavoriteArticleMutation({
  //     mutationKey: [restaurant.id],
  //   });

  const handleFavorite = () => {
    // mutate(restaurant.id);
  };

  return (
    <button color="primary" onClick={handleFavorite}>
      {restaurant.isBookMarked ? (
        <FaBookmark size={16} />
      ) : (
        <FaRegBookmark size={16} />
      )}
    </button>
  );
}
