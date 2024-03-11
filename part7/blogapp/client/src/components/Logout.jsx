import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/");
  };

  return (
    <button
      className="border border-black p-2 bg-red-400 rounded-lg"
      onClick={handleLogout}
    >
      logout
    </button>
  );
}

export default Logout;
