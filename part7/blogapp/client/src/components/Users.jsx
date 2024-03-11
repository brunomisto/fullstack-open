import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usersService from "../services/users";

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    usersService.getAll().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl">Users</h2>
      {users && (
        <table className="text-white border border-collapse border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-400 bg-slate-600">user</th>
              <th className="border border-slate-400 bg-slate-600">
                <b>blogs created</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-slate-500 bg-slate-700">
                  <Link
                    className="text-sky-300 underline"
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="border border-slate-500 bg-slate-700">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
