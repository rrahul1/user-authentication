import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Edit from "./components/Edit";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Register />} />
         </Routes>
      </Router>
   );
}

export default App;
