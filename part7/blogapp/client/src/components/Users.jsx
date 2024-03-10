import { useEffect, useState } from "react";
import usersService from "../services/users";

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    usersService.getAll().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <td>&nbsp;</td>
              <td>
                <b>blogs created</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
