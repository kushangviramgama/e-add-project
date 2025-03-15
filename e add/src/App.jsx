
import {  useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserSidebar } from "./components/layouts/UserSidebar";


import { Login } from "./components/common/Login";
import { SignUp } from "./components/common/SignUp"; // Capital "U" in SignUp


import { AddScreen } from "./components/agency/AddScreen";
import axios from "axios";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { UserProfile } from "./components/user/Userprofile";
import { AgencySidebar } from "./components/layouts/AgencySidebar";
import PrivateRoutes from "./hooks/PrivetRoutes";
import { MyScreens } from "./components/agency/MyScreen";
import { UpdateMyScreen } from "./components/agency/UpdateScreen";
import { AdminSidebar } from "./components/layouts/AdminSidebar";
import { AdminPanel } from "./components/admin/AdminPanel";


function App() {
  //axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.baseURL = "http://localhost:3000";
  
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="" element={<PrivateRoutes />}>
        <Route path="/user" element={<UserSidebar />}>
          <Route path="profile" element={<UserProfile/>} />
        </Route>
        <Route path="/agency" element={<AgencySidebar />}>
          <Route path="addscreen" element={<AddScreen />} />
          <Route path="myscreens" element ={<MyScreens/>}></Route>
          <Route path ="updateScreen/:id"element = {<UpdateMyScreen/>}></Route>
        </Route>
        </Route>

        <Route path="/admin" element={<AdminSidebar/>}>
        <Route path="adminpanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
