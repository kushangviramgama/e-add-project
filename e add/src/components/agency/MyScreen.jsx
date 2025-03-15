import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link

export const MyScreens = () => {
    const [screens, setscreens] = useState([]);

    const getAllMyScreens = async () => {
        const res = await axios.get("/hording/getHordingsbyuserid/" + localStorage.getItem("id"));
        console.log(res.data);
        setscreens(res.data.data);
    };

    useEffect(() => {
        getAllMyScreens();
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            MY SCREENS
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>hoardingDimension</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {screens?.map((sc) => {
                        return (
                            <tr key={sc._id}>
                                <td>{sc?.hoardingDimension}</td>
                                <td>
                                    <img style={{ height: 100, width: 100 }} src={sc?.hordingURL} alt="hoarding" />
                                </td>
                                <td>
                                    <Link to={`/agency/updateScreen/${sc._id}`} className="btn btn-info">UPDATE</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
