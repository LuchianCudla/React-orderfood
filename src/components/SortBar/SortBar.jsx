import "./SortBar.css";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../../context/context";
import { useRef } from "react";

const SortBar = () => {
  const searchTerm = useRef("");
  const { setMenuItems, menuItems } = useGlobalContext();

  /*==== Handle search function ==== */

  const handleSearch = () => {
    const isData = menuItems.data.filter((el) =>
      Object.keys(el.menu).includes(searchTerm.current.value)
    );

    if (!isData.length) {
      setMenuItems({ ...menuItems, filteredData: [] });
    }
    if (isData.length) {
      let filteredData = isData;
      setMenuItems({ ...menuItems, filteredData });
    }
  };

  /*=============================================================== */

  /*==== Function that check whatever is selected ====*/

  const handleSelected = (e) => {
    const selected = e.target.value;

    // const newMenuElements = [...menuElements.current];

    if (selected === "alphabetically") {
      let filteredData = [...menuItems.data];

      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      setMenuItems({
        ...menuItems,
        filteredData,
      });
    }

    if (selected === "rating") {
      let filteredData = [...menuItems.data];

      filteredData.sort((a, b) => b.rating - a.rating);
      setMenuItems({
        ...menuItems,
        filteredData,
      });
    }
    if (selected === "none") {
      setMenuItems({ ...menuItems, filteredData: [] });
    }
  };

  /*=============================================================== */

  return (
    <div className="sortbarcontainer">
      {searchTerm.current.value && (
        <p>{`Your search results for: "${searchTerm.current.value}"`}</p>
      )}
      <div className="sortbar-wrapper">
        <div className="search-container">
          <BiSearch className="icon" />
          <input
            ref={searchTerm}
            type="text"
            placeholder="Search your food:"
            onChange={handleSearch}
          />
        </div>
        <div className="selecter">
          <p>Sort:</p>
          <select onChange={(e) => handleSelected(e)}>
            <option value="none">none</option>
            <option value="alphabetically">alphabetically</option>
            <option value="rating">rating</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
