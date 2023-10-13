import React, { Component } from "react";
import axios from "axios";
import TrainList from "./TrainList"; 

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
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { startLocation, destination, date, seatCount } = this.state;

    axios
      .get(
        `/api/trains/search?fromStationName=${startLocation}&toStationName=${destination}&date=${date}&minAvailableSeatCount=${seatCount}`
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ trains: res.data.trains });
        }
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
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3"> {/* Center the form within the container */}
            <h1 className="text-center topic1 text1">Search Trains</h1>
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
                Search
              </button>
              <br /><br />
            </form>
          </div>
                <TrainList trains={this.state.trains} />
        </div>
      </div>
     
      
    );
  }
}

export default SearchTrain;
