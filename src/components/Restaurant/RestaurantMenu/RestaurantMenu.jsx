import "../RestaurantMenu/RestaurantMenu.css";
import StarRating from "../../StarRating/StarRating";
import Category from "../Category/Category";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/context";
import { AiOutlineStar } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const RestaurantMenu = () => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    props: { menu, img, name: item_name, rating, type },
  } = location.state;

  /*==== UseEffect used to scroll to the top of the page ==== */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*========================================================== */
  const menuKeys = Object.keys(menu);
  const menuCategories = menuKeys.map((key) => menu[key]);

  /*============================================================ */

  return (
    <section className="menu-section">
      <article>
        <div className="vendor_img_container">
          <img src={img} alt={item_name} />
        </div>
        <div className="vendor-info-container">
          <div className="vendor-info-container-wrapper">
            <h2>{item_name}</h2>
            <div>
              <AiOutlineStar className="icon-small" />
              <p>{rating}/5</p>
            </div>
            <p>
              <strong>Type of food:</strong> {type}
            </p>
          </div>
          {currentUser.isLoggedIn && <StarRating name={item_name} />}
        </div>
        <div className="vendor-menu">
          {menuKeys.map((item, idx) => {
            return (
              <button key={idx} className="vendor-btn">
                {item}
              </button>
            );
          })}
        </div>
        <div
          className="back-container"
          onClick={() => navigate("/React-orderfood")}
        >
          <BiArrowBack className="icon" />
          <span>Back</span>
        </div>
      </article>

      <div className="vendor-menu-container">
        {menuCategories.map((el, idx) => {
          return (
            <React.Fragment key={idx}>
              <h3>{menuKeys[idx]}</h3>
              <div className="vendor-item-container">
                <Category category={[...el]} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default RestaurantMenu;
