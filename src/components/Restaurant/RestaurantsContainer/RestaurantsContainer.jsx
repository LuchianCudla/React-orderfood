import "../RestaurantsContainer/RestaurantsContainer.css";
import Restaurant from "../Restaurant/Restaurant";

const RestaurantsContainer = ({ items }) => {
  return (
    <section className="restaurants-section">
      {items.map((item) => {
        return <Restaurant key={item.id} {...item} />;
      })}
    </section>
  );
};

export default RestaurantsContainer;
