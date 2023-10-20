import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import loadingGif from "../../../images/loading.gif";
import swal from "sweetalert";

function EditReservation() {
    const { id } = useParams();


    const [travelerData, setTravelerData] = useState({
        travelerID: "",
        reservationDate: "",
        bookingDate: "",
        trainID: "",
        startLocation: "",
        destination: "",
        trainClass: "",
        departureTime: "",
        price: "",
        seatCount: "",
    });

    const [loading, setLoading] = useState(true);
    const [seatCountError, setSeatCountError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "seatCount") {
            if (value === "") {
                setSeatCountError("");
            } else if (!/^\d+$/.test(value)) {
                setSeatCountError("Seat count must be a non-negative integer");
            } else {
                setSeatCountError("");
            }
        }
    
        setTravelerData({
            ...travelerData,
            [name]: value,
        });
    };
    


    const handleFormSubmit = (e) => {
  e.preventDefault();

  if (seatCountError) {
    swal("Error",'Please correct the seat count error before updating.', "error");
    return;
}

  axios.put(`/api/reservations/update/${id}`, travelerData)
    .then((res) => {
      console.log('Reservations details updated:', res.data);
      swal("Success",'Reservations details updated Successfully.', "success");
      window.location.href = "/tablereser"; 
    })
    .catch((error) => {
      console.error("API request failed:", error);
      swal("Error",'Reservations details update Failed', "error");
      if (error.response) {
        console.log("Server response data:", error.response.data);
      }
    });
};



    useEffect(() => {
        if (id) {
            axios
                .get(`/api/reservations/get/${id}`)
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
                                            <label><b>travelerID:</b></label>
                                            <input
                                                type="text"
                                                name="travelerID"
                                                value={travelerData.nic}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                readOnly
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Reservation Date:</b></label>
                                                    <input
                                                        type="text"
                                                        name="reservationDate"
                                                        value={travelerData.reservationDate}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Booking Date</b></label>
                                                    <input
                                                        type="text"
                                                        name="bookingDate"
                                                        value={travelerData.bookingDate}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>
                                                        TrainID</b></label>
                                                    <input
                                                        type="text"
                                                        name="trainID"
                                                        value={travelerData.trainID}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Start Location:</b></label>
                                                    <input
                                                        type="text"
                                                        name="startLocation"
                                                        value={travelerData.startLocation}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Destination:</b></label>
                                                    <input
                                                        type="text"
                                                        name="destination"
                                                        value={travelerData.destination}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Train Class:</b></label>
                                                    <input
                                                        type="text"
                                                        name="trainClass"
                                                        value={travelerData.trainClass}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Departure Time:</b></label>
                                                    <input
                                                        type="text"
                                                        name="departureTime"
                                                        value={travelerData.departureTime}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label><b>Price:</b></label>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={travelerData.price}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                <label><b>Seat Count:</b></label>
                <input
                    type="text"
                    name="seatCount"
                    value={travelerData.seatCount}
                    onChange={handleInputChange}
                    className="form-control"
                />
                {seatCountError && <div className="text-danger">{seatCountError}</div>}
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

export default EditReservation;
