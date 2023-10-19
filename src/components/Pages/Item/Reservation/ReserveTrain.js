import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";

function ReserveTrain() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nic: "",
    reservationDate: "",
    bookingDate: new Date().toISOString().split("T")[0].toString(),
    trainID: "",
    trainName: "",
    startLocation: "",
    destination: "",
    trainClass: "",
    departureTime: "",
    price: "",
    seatCount: "",
    status: "0",
  });


  const handleNICChange = (e) => {
    const inputValue = e.target.value;

    if (/^[0-9a-zA-Z]*$/.test(inputValue)) {
      setFormData({ ...formData, nic: inputValue });
    } else {
      swal("Error", "NIC must contain only numbers and letters", "error");
    }
  };

  useEffect(() => {
    if (location.state) {
      const trainData = location.state.trainData;

      if (trainData) {
        setFormData((prevData) => ({
          ...prevData,
          reservationDate: trainData.date,
          trainID: trainData.id.toString(),
          trainName: trainData.name,
          startLocation: trainData.startLocation,
          destination: trainData.destination,
          trainClass: trainData.trainClass,
          departureTime: trainData.startLocationDepartureTime,
          price: trainData.totalPrice.toString(),
          seatCount: trainData.seatCount.toString(),
          status: "0",
        }));
      }
    }
  }, [location.state]);

  const handleReservation = () => {
    
    if (formData.nic.length === 10 || formData.nic.length === 12) {
      setFormData({ ...formData, nic: formData.nic });
      axios
      .post("/api/reservations/add", formData)
      .then((response) => {
        swal("Success", "Reservation Successful", "success");
      })
      .catch((error) => {
        const reservationDate = new Date(formData.reservationDate);
        const bookingDate = new Date(formData.bookingDate);

        const DateDiff = (reservationDate - bookingDate) / (1000 * 60 * 60 * 24);
        
        if(DateDiff >= 30){
          swal("Error", "The reservation date is equal to or longer than 30 days", "error");
        }else{
          swal("Error", "Failed to create reservation : This NIC number already has 4 reservations", "error");
        }
        
      });

    } else {
      swal("Error", "NIC must be either 10 or 12 characters", "error");
    }

    if (formData.nic === "") {
      swal("Error", "Please enter a NIC", "error");
      return;
    }

    
  };

  return (
    <div className="container">
      <br />
      <div className="back-button-container">
        <Link
          to="#"
          onClick={() => window.history.back()}
          className="back-button"
        >
          &lt; Back
        </Link>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ width: "700px" }}>
            <div className="card-body">
              <h1
                className="text-center"
                style={{ color: "blue", fontFamily: "Baufra" }}
              >
                Reserve Train
              </h1>
              <br />
              <form>
                <p>
                <label htmlFor="nic"><strong>NIC : </strong></label>
                  <input
                    type="text"
                    id="nic"
                    className="form-control"
                    name="nic"
                    placeholder="NIC"
                    value={formData.nic}
                    style={{ width: "30%" }}
                    onChange={handleNICChange}
                    required
                  />
                </p>
                <p>
                  <strong>Reservation Date : </strong>{" "}
                  {formData.reservationDate}
                </p>
                <p>
                  <strong>Booking Date : </strong> {formData.bookingDate}
                </p>
                <p>
                  <strong>Train : </strong> {formData.trainName}
                </p>
                <p>
                  <strong>Start Location : </strong>{" "}
                  {formData.startLocation}
                </p>
                <p>
                  <strong>Destination : </strong> {formData.destination}
                </p>
                <p>
                  <strong>Class : </strong> {formData.trainClass}
                </p>
                <p>
                  <strong>Departure Time : </strong>{" "}
                  {formData.departureTime}
                </p>
                <p>
                  <strong>Seat Count : </strong> {formData.seatCount}
                </p>
                <p>
                  <strong>Total Price : </strong> {formData.price}
                </p>
                
                <div className="col-4 text-center" style={{ marginTop: "10px", marginLeft: "200px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReservation}
                  style={{ width: "100%" }}
                >
                  Reserve
                </button>
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ReserveTrain;
