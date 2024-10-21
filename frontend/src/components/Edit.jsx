import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import { updateUser } from "../services/Api";

function Edit() {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { users } = useSelector((state) => state.user);
   const [formData, setFormData] = useState({ name: "", email: "" });

   useEffect(() => {
      const user = users.find((user) => user._id === id);
      if (user) {
         setFormData({ name: user.name, email: user.email });
      }
   }, [id, users]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await updateUser(id, formData);
         dispatch(fetchUsers());
         navigate("/home");
      } catch (error) {
         console.error("Error updating user:", error);
      }
   };

   return (
      <div>
         <h2>Edit User</h2>
         <form
            onSubmit={handleSubmit}
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexDirection: "column",
               gap: "2em",
            }}
         >
            <input
               type="text"
               placeholder="Name"
               value={formData.name}
               onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
               }
            />
            <input
               type="email"
               placeholder="Email"
               value={formData.email}
               onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
               }
            />
            <button type="submit">Update</button>
         </form>
      </div>
   );
}

export default Edit;
