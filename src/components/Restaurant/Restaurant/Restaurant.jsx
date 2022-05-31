import "../Restaurant/Restaurant.css";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Restaurant = (props) => {
  return (
    <Link to={`/menu/${props.name}`} state={{ props }} className="card">
      <img src={props.img} alt="img" />
      <article className="card-wrapper ">
        <div className="card_name">
          <p>{props.name}</p>
          <div>
            <span>{props.rating}/5</span>
            <AiOutlineStar className="icon-small" />
          </div>
        </div>
        <div>
          <p className="food-type">
            <strong>Type: </strong>
            {props.type}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Restaurant;
