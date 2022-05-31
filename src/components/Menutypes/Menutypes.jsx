import "../Menutypes/Menutypes.css";
import { data } from "../../data";
import SortBar from "../SortBar/SortBar";

const menutypes = ["all", ...new Set(data.map(({ type }) => type))];

const Menutypes = ({ filterCategory }) => {
  return (
    <div className="filter-container">
      <div className="food-types-container">
        {menutypes.map((type, idx) => {
          return (
            <button
              value={type}
              key={idx}
              onClick={(e) => {
                filterCategory(e.target.value);
              }}
            >
              {type}
            </button>
          );
        })}
      </div>
      <SortBar />
    </div>
  );
};

export default Menutypes;
