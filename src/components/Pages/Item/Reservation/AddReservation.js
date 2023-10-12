import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default class AddReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelerID: "",
      reservationDate: "",
      bookingDate: "",
      trainID: "",
      startLocation: "",
      destination: "",
      trainclass: "",
      departureTime: "",
      price: "",
      seatCount: "",
      status: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const data = { ...this.state };

      axios
        .post("/api/reservations/add", data)
        .then((res) => {
          if (res.data.success) {
            this.setState({
              // Reset the form
            });
            Swal.fire(
              "Reservation Added Successfully!",
              "New reservation is added to the system",
              "success"
            );
          } else {
            Swal.fire("Error", res.data.message, "error");
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Error", "An error occurred.", "error");
        });
    }
  };

  validateForm = () => {
    // Your form validation
    // You can check if all required fields are filled here
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/premium-vector/concept-reservation_118813-14009.jpg?w=2000"
              alt="Item Image"
              className="img-fluid"
              style={{ height: "80%" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card" style={{ width: "85%" }}>
              <div className="card-body">
                <h1 className="text-center">Add Reservation Form</h1>
                <form className="form">
                  <form className="needs-validation form" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>TravelerIDe:{""} </label>
                      <input
                        type="text"
                        id="travelerID"
                        className="form-control"
                        name="travelerID"
                        placeholder="reservationDate"
                        value={this.state.travelerID}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>ReservationDate: </label>
                      <input
                        type="text"
                        id="reservationDate"
                        className="form-control"
                        name="reservationDate"
                        placeholder="reservationDate"
                        value={this.state.reservationDate}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>BookingDate: </label>
                      <input
                        type="text"
                        id="bookingDate"
                        className="form-control"
                        name="bookingDate"
                        placeholder="bookingDate"
                        value={this.state.bookingDate}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>TrainID: </label>
                      <input
                        type="text"
                        id="trainID"
                        className="form-control"
                        name="trainID"
                        placeholder="trainID"
                        value={this.state.trainID}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>StartLocation: </label>
                      <input
                        type="text"
                        id="startLocation"
                        className="form-control"
                        name="startLocation"
                        placeholder="startLocation"
                        value={this.state.startLocation}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>Destination: </label>
                      <input
                        type="text"
                        id="destination"
                        className="form-control"
                        name="destination"
                        placeholder="destination"
                        value={this.state.destination}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>Trainclass: </label>
                      <input
                        type="text"
                        id="trainclass"
                        className="form-control"
                        name="trainclass"
                        placeholder="trainclass"
                        value={this.state.trainclass}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>DepartureTime: </label>
                      <input
                        type="text"
                        id="departureTime"
                        className="form-control"
                        name="departureTime"
                        placeholder="departureTime"
                        value={this.state.departureTime}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>Price: </label>
                      <input
                        type="text"
                        id="price"
                        className="form-control"
                        name="price"
                        placeholder="price"
                        value={this.state.price}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>SeatCount: </label>
                      <input
                        type="text"
                        id="seatCount"
                        className="form-control"
                        name="seatCount"
                        placeholder="seatCount"
                        value={this.state.seatCount}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                      <label style={{ marginBottom: "5px" }}>status: </label>
                      <input
                        type="text"
                        id="status"
                        className="form-control"
                        name="status"
                        placeholder="status"
                        value={this.state.status}
                        style={{ width: "100%" }}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>


                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      onClick={this.onSubmit}
                      style={{
                        marginTop: "15px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                      }}
                    >
                      {" "}
                      Submit
                    </button>
                  </form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}