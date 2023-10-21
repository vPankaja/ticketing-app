import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import train from "../../../images/train.png";
import { Link } from "react-router-dom";

export default class AddTrainReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      startTime: "",
      startLocation: "",
      destination: "",
      trainclass: "",
      seatCount: 0,
      remainingSeats: 0,
      isActive: 0,
      stoppingStations: [],
      stationNameInput: "",
      arrivalTimeInput: "",
      departureTimeInput: "",
    };
  }

  addStoppingStation = () => {
    const {
      stationNameInput,
      arrivalTimeInput,
      departureTimeInput,
      stoppingStations,
    } = this.state;

    if (stationNameInput && arrivalTimeInput && departureTimeInput) {
      this.setState((prevState) => ({
        stoppingStations: [
          ...prevState.stoppingStations,
          {
            stationName: stationNameInput.trim(),
            arrivalTime: arrivalTimeInput.trim(),
            departureTime: departureTimeInput.trim(),
          },
        ],
        stationNameInput: "",
        arrivalTimeInput: "",
        departureTimeInput: "",
      }));
    }
  };

  removeStoppingStation = (index) => {
    const updatedStoppingStations = [...this.state.stoppingStations];
    updatedStoppingStations.splice(index, 1);
    this.setState({ stoppingStations: updatedStoppingStations });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleTimeInputChange = (e, index, field) => {
    const value = e.target.value;

    if (field === "startTime") {
      this.setState({
        [field]: value,
      });
    } else {
      this.setState((prevState) => {
        const stoppingStations = [...prevState.stoppingStations];
        stoppingStations[index][field] = value;
        return { stoppingStations };
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.setState({
        isActive: 1,
        remainingSeats: this.state.seatCount,
      });

      const {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
      } = this.state;

      const data = {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
      };

      // Make a POST request to your API endpoint
      axios
        .post("/api/trains/add", data)
        .then((res) => {
          console.log("Response from POST request:", res);

          this.setState({
            name: "",
            date: "",
            startTime: "",
            startLocation: "",
            destination: "",
            trainclass: "",
            seatCount: 0,
            remainingSeats: 0,
            isActive: 0,
            stoppingStations: [],
            stationNameInput: "",
            arrivalTimeInput: "",
            departureTimeInput: "",
          });

          swal("Success", "Train Added Successfully", "success");

          window.location.href = "/alltrains";
        })
        .catch((error) => {
          swal("Error", "An error occurred.", "error");
        });
    }
  };

  
  validateForm = () => {
    const {
      name,
      date,
      startTime,
      startLocation,
      destination,
      trainclass,
      seatCount,
      stoppingStations,
    } = this.state;

    if (
      !name ||
      !date ||
      !startTime ||
      !startLocation ||
      !destination ||
      !trainclass ||
      !seatCount ||
      stoppingStations.length === 0
    ) {
      swal("Validation Error", "All fields are required.", "error");
      return false;
    }

    return true;
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

    const stationNames = [
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
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-6">
              <img
                src={train}
                alt="Item Image"
                className="img-fluid"
                style={{ maxWidth: "550px", height: "550px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card"
              style={{ marginTop: "20px", width: "105%", marginBottom: "30px" }}
            >
              <div className="card-body">
                <h1 className="text-center topic1 text1">Add Trains</h1>
                <form className="needs-validation form" noValidate>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Train Name: </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Train Name"
                      value={this.state.name}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
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
                    <label style={{ marginBottom: "5px" }}>Start Time: </label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={this.state.startTime}
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        this.handleTimeInputChange(e, 0, "startTime")
                      }
                      required
                      step="1800"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Start Location:
                    </label>
                    <select
                      className="form-control"
                      name="startLocation"
                      value={this.state.startLocation}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="">Select Start Location</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Destination:</label>
                    <select
                      className="form-control"
                      name="destination"
                      value={this.state.destination}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="">Select Destination</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Train Class: </label>
                    <select
                      id="trainclass"
                      className="form-control"
                      name="trainclass"
                      value={this.state.trainclass}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="">Select Train Class</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Seat Count: </label>
                    <input
                      type="number"
                      id="seatCount"
                      className="form-control"
                      name="seatCount"
                      placeholder="Seat Count"
                      value={this.state.seatCount}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Stopping Station (Format: Station Name, Arrival Time,
                      Departure Time):
                    </label>
                    <div className="row">
                      <div className="col-4">
                        <select
                          className="form-control"
                          name="stationNameInput"
                          value={this.state.stationNameInput}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Select Station Name</option>
                          {stationNames.map((stationName, stationIndex) => (
                            <option key={stationIndex} value={stationName}>
                              {stationName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-4">
                        <input
                          type="time"
                          className="form-control"
                          name="arrivalTimeInput"
                          value={this.state.arrivalTimeInput}
                          onChange={this.handleInputChange}
                          placeholder="Arrival Time"
                        />
                      </div>
                      <div className="col-4">
                        <input
                          type="time"
                          className="form-control"
                          name="departureTimeInput"
                          value={this.state.departureTimeInput}
                          onChange={this.handleInputChange}
                          placeholder="Departure Time"
                        />
                      </div>
                      <div
                        className="col-4"
                        style={{ marginTop: "10px", marginLeft: "350px" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.addStoppingStation}
                          style={{ width: "100%" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  <div style={{ marginBottom: "15px", fontSize: "14px" }}>
                    (Please add the stations in the order of the train route,
                    also add start station and destination)
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Station Name</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.stoppingStations.map((station, index) => (
                        <tr key={index}>
                          <td>{station.stationName}</td>
                          <td>{station.arrivalTime}</td>
                          <td>{station.departureTime}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.removeStoppingStation(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                    href="/allTrains"
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
