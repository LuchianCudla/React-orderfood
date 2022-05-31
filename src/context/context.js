import React, { useContext, useState } from "react";
import data from "../data";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState({ data, filteredData: [] });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [error, setError] = useState({
    status: false,
    type: "",
    msg: "",
    redirectTo: "",
    redirect: false,
  });

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        menuItems,
        setMenuItems,
        error,
        setError,
        currentUser,
        setCurrentUser,
        cart,
        setCart,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
