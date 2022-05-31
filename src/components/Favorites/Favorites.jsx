import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, setFavorites, setCart, cart } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(
    () => setFavorites(cart.filter((el) => el.isFav)),
    [cart, setFavorites]
  );
  /*==== Removing the favorite to the favorite cart ==== */

  const removeItem = (id) => {
    setFavorites(favorites.filter((el) => el.id !== id));
    setCart(
      cart.map((itm) => (itm.id === id ? { ...itm, isFav: !itm.isFav } : itm))
    );
  };

  /*================================================================= */

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
          <h3>Your favorites</h3>
        </div>
        {favorites.length ? (
          favorites.map((item) => {
            return (
              <div className="cart-item" key={item.id}>
                <div className="img-container">
                  <img src={item.img} alt={item.name} className="cart-img" />
                  <p className="desc">{item.name}</p>
                </div>
                <div className="btn-container">
                  <button>
                    <AiOutlineClose
                      className="icon-medium"
                      onClick={() => removeItem(item.id)}
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="cart-last-item">
            <h4>No favorites yet</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
