import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usersService from "../services/users";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
