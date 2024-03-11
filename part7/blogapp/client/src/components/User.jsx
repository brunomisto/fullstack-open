import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usersService from "../services/users";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // This is really bad, because instead of passing all users as props (that would be bad) im actually making a additional request
  useEffect(() => {
    usersService
      .get(id)
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch(() => {
        setUser("error");
      });
  }, []);

  if (!user) {
    return <div>loading...</div>;
  }

  if (user === "error") {
    return <div>cannot fetch user</div>;
  }

  return (
    <div>
      <h2 className="text-3xl">{user.name}</h2>
      <h3 className="text-xl">added blogs</h3>
      <ul className="text-slate-300 bg-slate-700">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
