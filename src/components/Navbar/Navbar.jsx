import "./Navbar.css";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";

import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const NavBar = () => {
  const { setUsers, currentUser, users, setCurrentUser, cart, favorites } =
    useGlobalContext();

  const [totItems, setTotItems] = useState(0);
  const navigate = useNavigate();

  /*==== UseEffect used to update the quantity of the cart ==== */

  useEffect(() => {
    const totItems = cart.reduce((sum, el) => (sum += el.qty), 0);
    setTotItems(totItems);
  }, [cart]);

  /*=====================================================*/

  /*==== Logout function  ==== */

  const handleLogout = () => {
    setUsers(
      users.map((el) =>
        el.user === currentUser.user
          ? {
              ...el,
              cart: [...cart],
              favorites: [...favorites],
              isLoggedIn: !el.isLoggedIn,
            }
          : el
      )
    );
    setCurrentUser({});
    navigate("/React-orderfood");
  };

  /*=============================================================== */

  return (
    <nav>
      <div className="nav-container">
        <Link to="/React-orderfood" className="logo">
          Foodopedia
        </Link>
        <div className="links-container">
          {currentUser.isLoggedIn ? (
            <>
              <FiLogOut className="icon" onClick={handleLogout} />

              <Link to="favorites">
                <AiOutlineHeart className="icon" />
                <span className="number">{favorites.length}</span>
              </Link>
              <Link to="cart">
                <FiShoppingCart className="icon" />
                <span className="number">{totItems}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="register">Sign in</Link>

              <Link to="login">
                <BiUserCircle className="icon" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
