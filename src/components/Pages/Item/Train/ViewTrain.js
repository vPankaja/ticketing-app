import React, { Component } from "react";
import axios from "axios";


class ViewTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
    posts: [],
    };
  }

   componentDidMount() {
    const id =this.props.match.params.id;

    axios.get(`/api/trains/${id}`)
    .then((res)=>{
        if(res.data.success){
          this.setState({
            post:res.data.post
          });
          console.log(this.state.post);
        }
      });
    }

  render() {
    const { train } = this.state;

    if (!train) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Train Details</h1>
        <p>Name: {train.name}</p>
        <p>Date: {train.date}</p>
        <p>Start Time: {train.startTime}</p>
        <p>Start Location: {train.startLocation}</p>
        <p>Destination: {train.destination}</p>
        <p>Train Class: {train.trainclass}</p>
        <p>Seat Count: {train.seatCount}</p>
        <p>Remaining Seat Count: {train.remainingSeats}</p>

        <h2>Stopping Stations</h2>
        <table>
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
            </tr>
          </thead>
          <tbody>
            {train.stoppingStations.map((station, index) => (
              <tr key={index}>
                <td>{station.stationName}</td>
                <td>{station.arrivalTime}</td>
                <td>{station.departureTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewTrain;
