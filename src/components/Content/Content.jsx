import RestaurantsContainer from "../Restaurant/RestaurantsContainer/RestaurantsContainer";
import Menutypes from "../Menutypes/Menutypes";
import { useGlobalContext } from "../../context/context";

const Content = () => {
  const { currentUser, menuItems, setMenuItems } = useGlobalContext();

  /*==== Function that filters the categories ==== */

  const filterCategory = (category) => {
    let filteredData;
    if (category === "all") {
      filteredData = menuItems.data;
      setMenuItems({ ...menuItems, filteredData });
      return;
    }

    filteredData = menuItems.data.filter(({ type }) => type === category);

    setMenuItems({ ...menuItems, filteredData });
  };

  /*=================================================================== */

  return (
    <>
      {currentUser.isLoggedIn && <Menutypes filterCategory={filterCategory} />}
      {menuItems.filteredData.length ? (
        <RestaurantsContainer items={menuItems.filteredData} />
      ) : (
        <RestaurantsContainer items={menuItems.data} />
      )}
    </>
  );
};

export default Content;
