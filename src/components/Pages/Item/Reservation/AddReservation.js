import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default class AddReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelerID: 1457,
      reservationDate: "",
      bookingDate: "",
      trainID: "6526bc1b4a2cddcaed370590",
      startLocation: "",
      destination: "",
      trainclass: "",
      departureTime: "",
      price: "200",
      seatCount: "",
      status: "1",
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

    const {
      travelerID,
      reservationDate,
      bookingDate,
      trainID,
      startLocation,
      destination,
      trainclass,
      departureTime,
      price,
      seatCount,
      status,
    } = this.state;

    const data = {
      trainID: trainID,
      travelerID: travelerID,
      reservationDate: reservationDate,
      bookingDate: bookingDate,
      startLocation: startLocation,
      destination: destination,
      trainclass: trainclass,
      departureTime: departureTime,
      price: price,
      seatCount: seatCount,
      status: status,
    };

    console.log(data);

    axios.post("/api/reservations/add", data).then((res) => {
      if (res.data.success) {
        this.setState({
          trainID: "",
          travelerID: "",
          startLocation: "",
          departureTime: "",
          destination: "",
          seatCount: "",
          status: "",
          bookingDate: "",
          reservationDate: "",
          price: "",
        });
        Swal.fire(
          "Order Added Successfully!",
          "Your order will be accepted",
          "success"
        );
      }
    });
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
            <div
              className="card"
              style={{ marginTop: "20px", width: "105%", marginBottom: "30px" }}
            >
              <div className="card-body">
                <h1 className="text-center">Make a Reservation</h1>
                <form className="form" noValidate>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Reservation Date:{" "}
                    </label>
                    <input
                      type="Date"
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
                    <label style={{ marginBottom: "5px" }}>
                      Booking Date:{" "}
                    </label>
                    <input
                      type="Date"
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
                  <div className="row">
                    <div className="col">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Start Location:{" "}
                        </label>
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
                    </div>
                    <div className="col">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Destination:{" "}
                        </label>
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>Class: </label>
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
                    </div>
                    <div className="col">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Departure Time:{" "}
                        </label>
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
                    </div>
                    <div className="col">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Seat Count:{" "}
                        </label>
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
                    </div>
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
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
