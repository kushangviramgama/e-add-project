// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// export const AddScreen = () => {
//   const [states, setstates] = useState([]);
//   const [cities, setcities] = useState([]);
//   const [areas, setareas] = useState([]);

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   const getAllStates = async () => {
//     const res = await axios.get("/state/getallstates");
//     setstates(res.data.data);
//   };

//   const getCityByStateId = async (id) => {
//     const res = await axios.get("/city/getcitybystate/" + id);
//     setcities(res.data.data);
//   };

//   const getAreaByCityId = async (id) => {
//     const res = await axios.get("/area/getareabycity/" + id);
//     setareas(res.data.data);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = async (data) => {
//     data.userId = localStorage.getItem("id");
//     try {
//       const res = await axios.post("/hording/add", data);
//       console.log(res.data);
//       alert("Hoarding added successfully!");
//     } catch (error) {
//       console.error("Error adding hoarding:", error);
//       alert("Failed to add hoarding. Please try again.");
//     }
//   };

//   return (
//     <div className= "container">
//       <h1 style={{textAlign:"center", fontSize:35, paddingTop:15}}>ADD SCREEN</h1>
//       <hr></hr>
//       <form  className="add-screen-form"  onSubmit={handleSubmit(submitHandler)}>
//         <div>
//           <label>Hoarding Dimension</label>
//           <input type="text" {...register("hoardingDimension", { required: "Dimension is required" })} />
//           {errors.hoardingDimension && <p>{errors.hoardingDimension.message}</p>}
//         </div>
//         <div>
//           <label>Hoarding Type</label>
//           <select {...register("hoardingType", { required: "Type is required" })}>
//             <option value="">Select Type</option>
//             <option value="Unipole">Unipole</option>
//             <option value="Billboard">Billboard</option>
//             <option value="Gantry">Gantry</option>
//             <option value="Digital">Digital</option>
//           </select>
//           {errors.hoardingType && <p>{errors.hoardingType.message}</p>}
//         </div>
//         <div>
//           <label>Hourly Rate</label>
//           <input type="number" {...register("hourlyRate", { required: "Rate is required", min: 1 })} />
//           {errors.hourlyRate && <p>{errors.hourlyRate.message}</p>}
//         </div>
//         <div>
//           <label>Hoarding URL</label>
//           <input type="url" {...register("hordingURL", { required: "URL is required" })} />
//           {errors.hordingURL && <p>{errors.hordingURL.message}</p>}
//         </div>
//         <div>
//           <label>Latitude</label>
//           <input type="text" {...register("latitude", { required: "Latitude is required" })} />
//           {errors.latitude && <p>{errors.latitude.message}</p>}
//         </div>
//         <div>
//           <label>Longitude</label>
//           <input type="text" {...register("longitude", { required: "Longitude is required" })} />
//           {errors.longitude && <p>{errors.longitude.message}</p>}
//         </div>
//         <div>
//           <label>Select State</label>
//           <select {...register("stateId", { required: "State is required" })} onChange={(e) => getCityByStateId(e.target.value)}>
//             <option value="">Select State</option>
//             {states?.map((state) => (
//               <option  value={state._id}>{state.name}</option>
//             ))}
//           </select>
//           {errors.stateId && <p>{errors.stateId.message}</p>}
//         </div>
//         <div>
//           <label>Select City</label>
//           <select {...register("cityId", { required: "City is required" })} onChange={(e) => getAreaByCityId(e.target.value)}>
//             <option value="">Select City</option>
//             {cities?.map((city) => (
//               <option key={city._id} value={city._id}>{city.name}</option>
//             ))}
//           </select>
//           {errors.cityId && <p>{errors.cityId.message}</p>}
//         </div>
//         <div>
//           <label>Select Area</label>
//           <select {...register("areaId", { required: "Area is required" })}>
//             <option value="">Select Area</option>
//             {areas?.map((area) => (
//               <option key={area._id} value={area._id}>{area.name}</option>
//             ))}
//           </select>
//           {errors.areaId && <p>{errors.areaId.message}</p>}
//         </div>
//         <div>
//           <input type="submit" value="Submit" />
//         </div>
//       </form>
//     </div>
//   );
// };


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddScreen = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    console.log(data);
    console.log(data.image[0]) //array -->0th index access..

    const formData = new FormData();
    formData.append("hoardingDimension",data.hoardingDimension);
    formData.append("hoardingType",data.hoardingType);
    formData.append("hourlyRate",data.hourlyRate);
    formData.append("latitude",data.latitude);
    formData.append("longitude",data.longitude);
    formData.append("stateId",data.stateId);
    formData.append("cityId",data.cityId);
    formData.append("areaId",data.areaId);
    formData.append("image",data.image[0]);
    formData.append("userId",data.userId);



    //const res = await axios.post("/hording/add", data);
    const res = await axios.post("/hording/addWithFile", formData);
    console.log(res); //axios
    console.log(res.data); //api response
    //if else...
    navigate("/agency/myscreens")
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Screen</h2>
            <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Hoarding Dimension</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("hoardingDimension")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hoarding Type</label>
                <select className="form-select" {...register("hoardingType")}>
                  <option value="Unipole">Unipole</option>
                  <option value="Billboard">Billboard</option>
                  <option value="Gantry">Gantry</option>
                  <option value="Digital">Digital</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Hourly Rate</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("hourlyRate")}
                />
              </div>
                            <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("latitude")}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("longitude")}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Select State</label>
                <select
                  className="form-select"
                  {...register("stateId")}
                  onChange={(event) => getCityByStateId(event.target.value)}
                >
                  <option>SELECT STATE</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Select City</label>
                <select
                  className="form-select"
                  {...register("cityId")}
                  onChange={(event) => getAreaByCityId(event.target.value)}
                >
                  <option>SELECT CITY</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Select Area</label>
                <select className="form-select" {...register("areaId")}>
                  <option>SELECT AREA</option>
                  {areas?.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Select HORDING URL</label>
                <input type="file" {...register("image")}></input>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};