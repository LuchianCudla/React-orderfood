import { useGlobalContext } from "../../../context/context";
import "./Category.css";

const Category = ({ category }) => {
  let { cart, setCart } = useGlobalContext();

  const addToCart = (id) => {
    /* Find the item with the same id */

    const item = category.find((el) => el.id === id);

    // /* Check if the item already exist in the cart,then update the quantity, else add the item to the cart*/

    if (cart.length) {
      const isFound = cart.find((el) => el.id === id);

      isFound
        ? setCart(
            cart.map((el) => (el.id === id ? { ...el, qty: el.qty + 1 } : el))
          )
        : setCart([...cart, { ...item, qty: 1 }]);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return category.map(({ name, desc, price, img, id }) => {
    return (
      <div className="card" key={id}>
        <img src={img} alt={name} className="cat-img" />

        <div className="card-wrapper">
          <p className="vendor-name">{name}</p>
          <p className="vendor-desc">{desc}</p>
          <p className="vendor-price">{price} lei</p>
          <button onClick={() => addToCart(id)}>Add</button>
        </div>
      </div>
    );
  });
};

export default Category;
