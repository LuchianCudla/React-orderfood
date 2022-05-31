import Alert from "../Alert/Alert";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { useState } from "react";
import { BiKey } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

const Login = () => {
  const {
    users,
    setUsers,
    setCurrentUser,
    error,
    setError,
    setCart,
    setFavorites,
  } = useGlobalContext();

  const [checkLoginInputs, setcheckLoginInputs] = useState({
    username: "",
    password: "",
  });
  const checkCredentials = (credentials) => {
    const activeUser = users.find(({ user }) => user === credentials.username);

    /*check if the user doesn't exist and throw error */

    if (!activeUser) {
      setError({
        status: true,
        type: "danger",
        msg: "Invalid username or password",
      });
      setcheckLoginInputs({
        username: "",
        password: "",
      });
      return;
    }
    /*check if the user exist or passwords do not match */
    if (
      (activeUser.user === checkLoginInputs.username &&
        activeUser.password !== checkLoginInputs.password) ||
      activeUser.atempts === 3
    ) {
      setError({
        ...error,
        status: true,
        type: "danger",
        msg: "Invalid password",
      });
      activeUser.atempts++;
      setUsers((prevUsers) => {
        return [
          ...prevUsers.filter((item) => item.user !== credentials.username),
          { ...activeUser },
        ];
      });

      if (activeUser.atempts > 3) {
        setUsers((prevUsers) => {
          return [
            ...prevUsers.filter((item) => item.user !== credentials.username),
            { ...activeUser, atempts: 3 },
          ];
        });
        setError({
          status: true,
          type: "danger",
          msg: "To many atempts,account locked",
        });

        return;
      }
      return;
    }
    /*check if the user exist, passwords match, and account is not locked */
    if (
      activeUser.user === credentials.username &&
      activeUser.password === credentials.password &&
      activeUser.atempts < 3
    ) {
      setError({
        status: true,
        type: "succes",
        msg: "You have succesfuly logged in",
        redirectTo: "/content",
        redirect: true,
      });

      setCurrentUser({ ...activeUser, isLoggedIn: true });
      setCart([...activeUser.cart]);
      setFavorites([...activeUser.favorites]);

      setUsers((prevUsers) => {
        return [
          ...prevUsers.filter((item) => item.user !== credentials.username),
          { ...activeUser, isLoggedIn: true, atempts: 0 },
        ];
      });
      return;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    checkCredentials(checkLoginInputs);
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        {error.status && <Alert />}

        <div className="input-wrapper">
          <HiOutlineMail className="icon" />
          <input
            className="login-register"
            type="email"
            placeholder="Email"
            required
            pattern="\w+(\.|\d|\w)\w+@\w+\.\w+"
            value={checkLoginInputs.username}
            onChange={(e) =>
              setcheckLoginInputs({
                ...checkLoginInputs,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="input-wrapper">
          <BiKey className="icon" />
          <input
            className="login-register"
            type="password"
            placeholder="Password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            value={checkLoginInputs.password}
            onChange={(e) =>
              setcheckLoginInputs({
                ...checkLoginInputs,
                password: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" onClick={handleLogin} className="login-btn">
          Login
        </button>
      </form>
      <p>
        Don't have an account ? Register:
        <Link to="/register"> here</Link>
      </p>
    </div>
  );
};

export default Login;
