import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import loadingGif from "../../../images/loading.gif";
import swal from "sweetalert";

function EditTraveller() {
    const { nic } = useParams();

    const [travelerData, setTravelerData] = useState({
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
        setTravelerData({
            ...travelerData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formattedDOB = convertToDateTime(travelerData.dob);
        if (formattedDOB) {
            const requestData = {
                ...travelerData,
                nic: nic,
                status: travelerData.status,
                dob: formattedDOB.toISOString(), // Convert to ISO format
            };

            axios
                .put(`/api/travelers/update/${nic}`, requestData)
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
        } else {
            console.error("Invalid DOB format");
            // Handle the case where the DOB is in an incorrect format
        }
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
        if (nic) {
            axios
                .get(`/api/travelers/get/${nic}`)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
                        setTravelerData(res.data[0]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("API request failed:", error);
                });
        }
    }, [nic]);

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
                        src="https://img.freepik.com/free-vector/travelers-concept-illustration_114360-2602.jpg"
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
                                        <b>Edit Details</b>
                                    </h1>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="form-group">
                                            <label><b>NIC:</b></label>
                                            <input
                                                type="text"
                                                name="nic"
                                                value={travelerData.nic}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                readOnly 
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Name:</b></label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={travelerData.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                        <div className="col">
    <div className="form-group">
        <label><b>DOB:</b></label>
        <input
            type="text"
            name="dob"
            value={formatDate(travelerData.dob)}
            onChange={handleInputChange}
            className="form-control"
        />
    </div>
</div>

<div className="col">
                                                <div className="form-group">
                                                    <label><b>Phone</b></label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={travelerData.phone}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
</div><div className="form-group">
            <label><b>Email:</b></label>
            <input
                type="email"
                name="email"
                value={travelerData.email}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>

                                        <button
                                            className="btn btn-primary btn-sm"
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

export default EditTraveller;
