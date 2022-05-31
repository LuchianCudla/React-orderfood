import "../CartComponent/Cart.css";
import CartItem from "../CartItem/CartItem";
import { useGlobalContext } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Cart = () => {
  const { cart } = useGlobalContext();
  const navigate = useNavigate();

  /*====  used to update the total of the cart ==== */

  const totPrice = +cart
    .reduce((sum, el) => (sum += el.qty * el.price), 0)
    .toFixed(2);

  /*======================================================== */

  return (
    <>
      <div
        className="back-container"
        onClick={() => navigate("/React-orderfood")}
      >
        <BiArrowBack className="icon" />
        <span>back</span>
      </div>
      <div className="cart-container">
        <div className="cart-title">
          <h3>Your Cart</h3>
        </div>

        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}

        <div className="cart-last-item">
          <h4>Total: </h4>
          <p>{totPrice} lei</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
