import hero from "../../public/pizza.jpg";
import "./Home.css";
import Content from "../Content/Content";
import { RiRegisteredFill } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiScooter } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useGlobalContext();

  return !currentUser.isLoggedIn ? (
    <>
      <div className="hero">
        <img src={hero} alt="hero" />
        <div className="modal">
          <h1>Hungry? Order now!</h1>
          <p>
            Tired of cooking every day? You can now order from over more than
            2000 resturants all over the city,affordable,fast, right to your
            door.
          </p>
          <button onClick={() => navigate("/register")}>START NOW</button>
        </div>
      </div>
      <div className="info-section">
        <h3>How it works</h3>
        <div className="info-wrapper">
          <div>
            <RiRegisteredFill className="icon-big" />
            <h4>Register</h4>
          </div>
          <div>
            <IoFastFoodOutline className="icon-big" />
            <h4>Chose restaurant</h4>
          </div>
          <div>
            <GiScooter className="icon-big" />
            <h4>Order now</h4>
          </div>
        </div>
        <h3>Popular restaurants</h3>
        <Content />
      </div>
    </>
  ) : (
    <Content />
  );
};

export default Home;
