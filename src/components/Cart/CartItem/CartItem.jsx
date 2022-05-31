import "../CartItem/CartItem.css";
import { useGlobalContext } from "../../../context/context";

import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { useEffect } from "react";

const CartItem = ({ img, name, price, qty, id, isFav }) => {
  const { cart, setCart, setFavorites } = useGlobalContext();

  /*==== CheckFavorite Item  function ==== */

  const addFavorite = (id) => {
    setCart(
      cart.map((itm) => (itm.id === id ? { ...itm, isFav: !itm.isFav } : itm))
    );
  };

  /*============================================================== */

  /*==== Update the favorites ==== */
  useEffect(() => {
    setFavorites(cart.filter((el) => el.isFav));
  }, [setFavorites, cart]);

  /*============================================================== */

  // /*==== Increase Quantity function ==== */

  const increaseQuantity = (id) => {
    setCart(
      cart.map((itm) => (itm.id === id ? { ...itm, qty: itm.qty + 1 } : itm))
    );
  };

  /*============================================================== */

  /*==== Decrease Quantity function ==== */

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((itm) => (itm.id === id ? { ...itm, qty: itm.qty - 1 } : itm))
        .filter((item) => item.qty > 0)
    );
  };

  /*============================================================== */

  // /*==== Remove Item  function ==== */

  const removeItem = (id) => {
    setCart(cart.filter((el) => el.id !== id));
  };

  /*============================================================== */

  return (
    <div className="cart-item">
      <div className="img-container">
        <img src={img} alt={name} />
        <p className="desc">{`${name.slice(0, 20)}...`}</p>
      </div>

      <div className="btn-container">
        <button onClick={() => decreaseQuantity(id)}>
          <AiOutlineMinus className="icon-medium" />
        </button>
        <p className="quantity">{qty}</p>
        <button onClick={() => increaseQuantity(id)}>
          <AiOutlinePlus className="icon-medium" />
        </button>
      </div>
      <p className="price">{price} lei</p>
      <div className="btn-container jc">
        <button onClick={() => addFavorite(id)}>
          {isFav ? (
            <AiFillHeart className="icon-medium" color={"#a5e9b6"} />
          ) : (
            <AiOutlineHeart className="icon-medium" color={"white"} />
          )}
        </button>
        <button onClick={() => removeItem(id)}>
          <AiOutlineClose className="icon-medium" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
