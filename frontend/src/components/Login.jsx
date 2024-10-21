import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";

function Login() {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await loginUser(formData);
         navigate("/home");
      } catch (error) {
         console.error("Login failed", error);
      }
   };

   return (
      <>
         <h1>Login</h1>
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
            <button type="submit">Login</button>
         </form>
      </>
   );
}

export default Login;
