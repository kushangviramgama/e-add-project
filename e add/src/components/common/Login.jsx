import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const USERID ='67c5dfbde7b0eec20f24f30d'
  const ADMINID ='67c5dfd1e7b0eec20f24f30f'
  
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log("hidtrdy",res.data.data.roleId._id);

      if (res.status === 200) {
        toast.success(" login sucssesfull!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
            setTimeout(() => {
          if (res.data.data.roleId._id==USERID) {
            navigate("/user")
          }
          else if (res.data.data.roleId._id==ADMINID) {
            navigate("/admin/adminpanel")
          }else{
           navigate("/agency")
          }
        }, 2000);

        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);

        if (res.data.data.roleId.name === "user") {
          navigate("/user/profile");
        }
        if (res.data.data.roleId.name === "agency") {
          navigate("/agency/addscreen"); //check in app.js
        }
      } else {
        toast.error("Login Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred, please check your credentials.");
      toast.error("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="col-md-6 col-lg-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="card card-primary card-outline mb-4">
          <div className="card-header">
            <div className="card-title">Login</div>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </form>
        </div>

        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import "../../assets/login.css";

// export const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = async (data) => {
//     try {
//       const res = await axios.post("/user/login", data);
//       if (res.status === 200) {
//         alert("Login Success");
//         localStorage.setItem("id", res.data.data._id);
//         localStorage.setItem("role", res.data.data.roleId.name);

//         if (res.data.data.roleId.name === "USER") {
//           navigate("/user");
//         } else if (res.data.data.roleId.name === "Agency") {
//           navigate("/agency");
//         }
//       }
//     } catch (error) {
//       alert("Login Failed");
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-card">
//         <div className="brand">
//           <div className="brand-logo"></div>
//           <h1>LOGIN USER</h1>
//           <p>Enter your credentials to access your account</p>
//         </div>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="form-group">
//             <label htmlFor="email">EMAIL</label>
//             <input
//               type="text"
//               id="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                   message: "Invalid email format",
//                 },
//               })}
//               placeholder="Enter email"
//             />
//             {errors.email && <p className="error-message">{errors.email.message}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">PASSWORD</label>
//             <input
//               type="password"
//               id="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               })}
//               placeholder="Enter password"
//             />
//             {errors.password && <p className="error-message">{errors.password.message}</p>}
//           </div>
//           <div className="remember-forgot">
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember Me</label>
//             </div>
//             <a href="#" className="forgot-password">
//               Forgot Password?
//             </a>
//           </div>
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//         <div className="social-login">
//           <p>Or login with</p>
//           <div className="social-buttons">
//             <div className="social-btn">G</div>
//             <div className="social-btn">F</div>
//           </div>
//         </div>
//         <div className="signup-link">
//           <p>
//             Don't have an account? <a href="#">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
