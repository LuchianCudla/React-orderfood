import "../../index.css";
import { AppProvider } from "../../context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Cart from "../Cart/CartComponent/Cart";
import Content from "../Content/Content";
import RestaurantMenu from "../Restaurant/RestaurantMenu/RestaurantMenu";
import Favorites from "../Favorites/Favorites";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/React-orderfood" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/content" element={<Content />} />
          <Route path="menu">
            <Route path=":name" element={<RestaurantMenu />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
