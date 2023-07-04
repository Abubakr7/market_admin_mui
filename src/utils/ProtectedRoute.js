import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = (props) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [navigate]);

  return props.children;
};

export default ProtectRoute;
