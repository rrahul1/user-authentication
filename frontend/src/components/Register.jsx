import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api";

function Register() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await registerUser(formData);
         navigate("/login");
      } catch (error) {
         console.error("Registration failed", error);
      }
   };

   return (
      <>
         <h1>Register</h1>
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
               onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
               }
            />
            <input
               type="email"
               placeholder="Email"
               onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
               }
            />
            <input
               type="password"
               placeholder="Password"
               onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
               }
            />
            <button type="submit">Register</button>
         </form>
      </>
   );
}

export default Register;
