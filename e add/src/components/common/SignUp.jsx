import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      if(data.role==="agency"){
        data.roleId = "67c7da7bb7e4f575cd9724fc";
      }else if(data.role==="admin"){

      data.roleId="67c5dfd1e7b0eec20f24f30f"
      }else{
        data.roleId = "67c5dfbde7b0eec20f24f30d";
      }
      delete data.role;
      console.log(data);
    

      const res = await axios.post("/user", data);

      if (res.status === 201) {
        console.log("User added:", res.data);
        navigate("/login");
      } else {
        setErrorMessage("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred, please check your credentials.");
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-card">
      <div className="card-header text-center">
        <h3 className="form-title">Register Yourself</h3>
      </div>
  
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="card-body">
          <div className="input-group">
            <label htmlFor="f-name">First Name</label>
            <input
              type="text"
              id="f-name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}
          </div>
  
          <div className="input-group">
            <label htmlFor="l-name">Last Name</label>
            <input
              type="text"
              id="l-name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}
          </div>
  
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              {...register("age", { required: "Age is required", min: 18, max: 99 })}
            />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>
  
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" {...register("role", { required: "Role is required" })}   defaultValue="user" >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="agency">Agency</option>
              <option value="user">User</option>
            </select>
            {errors.role && <p className="error">{errors.role.message}</p>}
          </div>
  
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
  
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
        </div>
  
        <div className="card-footer">
          <button type="submit" className="submit-btn">Sign Up</button>
        </div>
      </form>
  
      {errorMessage && <p className="error text-center">{errorMessage}</p>}
    </div>
  </div>
)}  

// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import "../../assets/signup.css";

// export const SignUp = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const submitHandler = async (data) => {
//     try {
//       data.roleId = "67bd39d90d07b9633d60535d";
//       const res = await axios.post("/user", data);

//       if (res.status === 201) {
//         alert("User created successfully");
//         navigate("/login");
//       } else {
//         alert("User not created");
//       }
//     } catch (error) {
//       alert("Signup Failed");
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-card">
//         <div className="brand">
//           <div className="brand-logo"></div>
//           <h1>CREATE ACCOUNT</h1>
//           <p>Sign up to get started</p>
//         </div>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input type="text" id="firstName" {...register("firstName")} placeholder="Enter first name" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input type="text" id="lastName" {...register("lastName")} placeholder="Enter last name" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" {...register("email")} placeholder="Enter email" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" {...register("password")} placeholder="Enter password" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age">Age</label>
//             <input type="number" id="age" {...register("age")} placeholder="Enter age" />
//           </div>
//           <button type="submit" className="signup-btn">Sign Up</button>
//         </form>
//         <div className="signup-link">
//           <p>Already have an account? <a href="/login">Login</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };