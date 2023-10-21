import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import loadingGif from "../../../images/loading.gif";
import swal from "sweetalert";
import Tagent from "../../../images/tagent.jpg";

function EditUser() {
    const { id } = useParams();

    const [userData, setuserData] = useState({
        nic: "",
        name: "",
        phone: "",
        dob: "",
        email: "",
        status: "",
    });

    const [loading, setLoading] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

            const requestData = {
                ...userData,
                id: id,
                status: userData.status,
            };

            axios
                .put(`/api/users/update/${id}`, requestData)
                .then((res) => {
                    console.log('Traveler details updated:', res.data);
                    swal("Success", 'Traveler details updated Successfully.', "success");
                    window.location.href = "/tableprofile";
                })
                .catch((error) => {
                    console.error("API request failed:", error);
                    swal("Error", 'Traveler details update Failed', "error");
                    if (error.response) {
                        console.log("Server response data:", error.response.data);
                    }
                });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    function convertToDateTime(dateString) {
        const dateParts = dateString.split("/");
        if (dateParts.length === 3) {
            const [year, month, day] = dateParts;
            // Assuming that the time is set to midnight (00:00:00)
            return new Date(year, month - 1, day, 0, 0, 0);
        }
        return null;
    }
    

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/users/get/${id}`)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        setuserData(res.data[0]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("API request failed:", error);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container text-center">
                <img
                    src={loadingGif}
                    alt="Loading..."
                    style={{ height: "30%", width: "30%" }}
                />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={Tagent}
                        alt="Item Image"
                        className="img-fluid"
                        style={{ height: "80%" }}
                    />
                </div>
                <div className="col-md-6">
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card" style={{ width: "500px", marginBottom: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                                <div className="card-body">
                                <div className="back-button-container">
        <Link
          to="#"
          onClick={() => window.history.back()}
          className="back-button"
        >
          &lt; Back
        </Link>
      </div>
                                    <h1 className="text-center" style={{ color: '#FF5733', fontFamily: 'Baufra' }}>
                                        <b>Edit User Details</b>
                                    </h1>

                                    <form onSubmit={handleFormSubmit}>
                                        <div className="form-group">
                                            <label><b>NIC :</b></label>
                                            <input
                                                type="text"
                                                name="nic"
                                                value={userData.nic}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Name :</b></label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={userData.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Phone :</b></label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={userData.phone}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>
                                                        DOB :</b></label>
                                                    <input
                                                        type="text"
                                                        name="dob"
                                                        value={userData.dob}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Email :</b></label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={userData.email}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
            
                                        <button
                                            className="btn btn-primary btn-lg"
                                            type="submit"
                                            style={{
                                                marginTop: "15px",
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                                borderRadius: "5px",
                                                fontWeight: "bold",
                                                padding: "10px 20px",
                                            }}
                                        >
                                            Update
                                        </button>
                                    </form>
                                    <div className="text-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
