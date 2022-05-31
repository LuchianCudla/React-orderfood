import Alert from "../Alert/Alert";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { BiKey } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

const Register = () => {
  const { setUsers, users, error, setError } = useGlobalContext();

  const [inputs, setInputs] = useState({
    email: "",
    pass1: "",
    pass2: "",
  });

  const checkRegistration = (dates) => {
    const checkMail = new RegExp(/\w+(\.|\d|\w)\w+@\w+\.\w+/, "g").test(
      dates.email
    );
    const checkPass = dates.pass1 === dates.pass2;

    const verifyExistingUser = users.find(({ user }) => user === dates.email);
    /* Check if the passwords do not match */
    if (!checkPass) {
      setError({
        ...error,
        status: true,
        type: "danger",
        msg: "Passwords do not match",
      });

      setInputs({ ...inputs, pass1: "", pass2: "" });
      return;
    }

    /* Check if the passwords match and verify if that user is duplicated*/

    if (checkMail && checkPass && !verifyExistingUser) {
      setUsers([
        ...users,
        {
          user: inputs.email,
          password: inputs.pass1,
          isLoggedIn: false,
          atempts: 0,
          cart: [],
          favorites: [],
        },
      ]);

      setError({
        status: true,
        type: "succes",
        msg: "Registration complete",
        redirectTo: "/login",
        redirect: true,
      });

      return;
    }

    /* Check if the user exist and throw an error*/

    if (verifyExistingUser) {
      setInputs({
        email: "",
        pass1: "",
        pass2: "",
      });
      setError({
        ...error,
        status: true,
        type: "danger",
        msg: "User already exists",
      });
      return;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    checkRegistration(inputs);
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleForm}>
        {error.status && <Alert />}

        <div className="input-wrapper">
          <HiOutlineMail className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={inputs.email || ""}
            pattern="\w+(\.|\d|\w)\w+@\w+\.\w+"
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            required
          />
        </div>
        <div className="input-wrapper">
          <BiKey className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={inputs.pass1 || ""}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) => setInputs({ ...inputs, pass1: e.target.value })}
            required
          />
        </div>
        <div className="input-wrapper">
          <BiKey className="icon" />
          <input
            type="password"
            placeholder="Retype password"
            value={inputs.pass2 || ""}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) => setInputs({ ...inputs, pass2: e.target.value })}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already got an account ?Login:
        <Link to="/login"> here</Link>
      </p>
    </div>
  );
};

export default Register;
