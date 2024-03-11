import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/");
  };

  return <button onClick={handleLogout}>logout</button>;
}

export default Logout;
