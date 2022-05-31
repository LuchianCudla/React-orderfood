import "../Alert/Alert.css";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const Alert = () => {
  const { error, setError } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error.redirect) {
        navigate(`${error.redirectTo}`);
      }

      setError({
        ...error,
        status: false,
        msg: "",
        redirectTo: "",
        redirect: false,
      });
    }, 2700);

    return () => clearTimeout(timer);
  });

  return (
    <div className={`alert-${error.type}`}>
      <p>{error.msg}</p>
    </div>
  );
};

export default Alert;
