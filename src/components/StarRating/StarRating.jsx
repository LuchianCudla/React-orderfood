import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import { useGlobalContext } from "../../context/context";

const StarRating = ({ name }) => {
  const { setMenuItems, menuItems } = useGlobalContext();

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const handleRating = (rateVal) => {
    setRating(rateVal);
    setMenuItems({
      ...menuItems,
      data: menuItems.data.map((el) =>
        el.name === name
          ? {
              ...el,
              rating:
                el.rating === 0
                  ? rateVal
                  : Number(((el.rating + rateVal) / 2).toFixed(1)),
            }
          : el
      ),
    });
  };

  return (
    <div className="star-container">
      <h4 style={{ color: "black" }}>Your rating</h4>
      {[...Array(5)].map((_, i) => {
        const ratingVal = i + 1;
        return (
          <span
            key={i}
            onClick={() => {
              handleRating(ratingVal);
            }}
          >
            <input type="radio" name="rating" value={ratingVal} />
            <AiFillStar
              className="icon"
              color={ratingVal <= (hover || rating) ? "gold" : "grey"}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
