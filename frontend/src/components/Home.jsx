import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../slices/userSlice";
import { deleteUser } from "../services/Api";
import "../App.css";
import "../index.css";
function Home() {
   const dispatch = useDispatch();
   const { users, status } = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch]);

   const handleDelete = async (id) => {
      await deleteUser(id);
      dispatch(fetchUsers());
   };

   return (
      <div>
         <h1>Users List</h1>
         {status === "loading" && <p>Loading...</p>}
         {status === "succeeded" && (
            <table border="1" cellPadding="10" cellSpacing="0">
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                           <button
                              onClick={() => handleDelete(user._id)}
                              style={{ marginRight: "10px" }}
                           >
                              Delete
                           </button>
                           <Link to={`/edit/${user._id}`}>
                              <button>Edit</button>
                           </Link>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
   );
}

export default Home;
