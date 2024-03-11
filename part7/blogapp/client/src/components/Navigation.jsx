import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navigation({ user }) {
  return (
    <nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>{`${user.name} logged in`}</span>
      <Logout />
    </nav>
  );
}

export default Navigation;
