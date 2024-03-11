import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navigation({ user }) {
  return (
    <nav className="flex items-center gap-3 text-2xl">
      <Link className="underline hover:underline-offset-4" to="/">
        blogs
      </Link>
      <Link className="underline hover:underline-offset-4" to="/users">
        users
      </Link>
      <span className="text-sky-800/65">{`${user.name} logged in`}</span>
      <Logout />
    </nav>
  );
}

export default Navigation;
