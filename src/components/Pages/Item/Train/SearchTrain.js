import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import searchT from "../../../images/searchT.jpg";

class SearchTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: "",
      destination: "",
      date: "",
      seatCount: "",
      trains: [],
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "seatCount" && !/^\d+$/.test(value)) {
      value = "";
    }

    this.setState({
      [name]: value,
    });
  };

  formatTimeTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    let period = "am";

    let hours12 = parseInt(hours, 10);
    if (hours12 >= 12) {
      period = "pm";
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }

    return `${hours12}:${minutes} ${period}`;
  };

  validateForm = () => {
    const { startLocation, destination, date, seatCount } = this.state;

    if (!startLocation || !destination || !date || !seatCount) {
      swal("Validation Error", "All fields are required.", "error");
      return false;
    }

    if (startLocation === destination) {
      swal("Validation Error", "Start location and destination cannot be the same.", "error");
      return false;
    }

    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }
    console.log("Search button clicked!");

    const { startLocation, destination, date, seatCount } = this.state;

    axios
      .get(
        `/api/trains/search?fromStationName=${startLocation}&toStationName=${destination}&date=${date}&minAvailableSeatCount=${seatCount}`
      )
      .then((res) => {
        console.log("Response:", res.data);
        this.setState({ trains: res.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal("Error", "Sorry no trains available for this day", "error");
      });
  };

  render() {
    const locations = [
      "Galle",
      "Weligama",
      "Matara",
      "Beliaththa",
      "Hikkaduwa",
      "Ambalangoda",
      "Aluthgama",
      "Kalutara",
      "Panadura",
      "Moratuwa",
      "Dehiwala",
      "Bambalapitiya",
      "Colombo Fort",
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-6">
              <img
                src={searchT}
                alt="Item Image"
                className="img-fluid"
                style={{ maxWidth: "600px", height: "500px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card"
              style={{ marginTop: "20px", width: "105%", marginBottom: "30px" }}
            >
              <div className="card-body">
                <h1 className="text-center">Search Trains</h1>
                <form className="form" noValidate onSubmit={this.onSubmit}>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>From: </label>
                    <select
                      className="form-control"
                      name="startLocation"
                      value={this.state.startLocation}
                      onChange={this.handleInputChange}
                    >
                      <option value="">Select a location</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>To: </label>
                    <select
                      className="form-control"
                      name="destination"
                      value={this.state.destination}
                      onChange={this.handleInputChange}
                    >
                      <option value="">Select a location</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      placeholder="Date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Seat Count: </label>
                    <input
                      type="number"
                      className="form-control"
                      name="seatCount"
                      placeholder="Seat Count"
                      value={this.state.seatCount}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-sm">Search</button>
                  </div>

                  <br />
                </form>
              </div>
            </div>

            {this.state.trains && this.state.trains.length > 0 && (
              <div className="available-trains">
                <h2 className="text-center topic2 text2">Available Trains</h2>
                <br />
                {this.state.trains.map((train, index) => (
                  <div key={index} className="custom-card card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-6">
                          <h5>{train.name}</h5>
                        </div>
                        <div className="col-6 text-end">
                          <p className="card-text">
                            <strong>Available Seats:</strong>
                            {train.availableSeats}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div class="row">
                        <div class="col">
                          <p className="card-text">
                            From: {train.startLocation}
                          </p>
                        </div>
                        <div class="col">
                          <p className="card-text">To: {train.destination}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <p className="card-text">
                            Departure Time:{" "}
                            {this.formatTimeTo12Hour(
                              train.startLocationDepartureTime
                            )}
                          </p>
                        </div>
                        <div class="col">
                          <p className="card-text">Class: {train.trainClass}</p>
                        </div>
                      </div>
                      <p className="card-text">
                        Ticket Price: {train.ticketPrice}
                      </p>

                      <div className="d-flex justify-content-center">
                        <Link
                          className="btn btn-primary btn-sm"
                          to={{
                            pathname: "/reservetrain",
                          }}
                          state={{ trainData: train }}
                        >
                          Reserve Train
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchTrain;
