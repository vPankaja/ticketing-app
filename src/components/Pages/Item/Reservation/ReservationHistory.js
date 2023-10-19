import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import loadingGif from "../../../images/loading.gif";

class ReservationHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    const nic = sessionStorage.getItem('nic'); // Retrieve 'nic' from session storage

    if (nic) {
      // Use the 'nic' value as needed
      this.retrievePosts(nic); // Pass 'nic' to the API request function
    } else {
      // Handle the case where 'nic' is not found in session storage
      console.error("NIC not found in session storage");
    }
  }

  retrievePosts(nic) {
    axios
      .get(`/api/reservations/traveler/history/${nic}`)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          const reservations = res.data;
          this.setState({
            posts: reservations,
            loading: false,
          });
        } else {
          console.error("API request did not return a successful status.");
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="tabl">
          <br />
          <h2 className="text1">Reservation History</h2>
          {this.state.loading ? (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." />
            </div>
          ) : (
            <div>
              <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">NIC</th>
                    <th scope="col">Reservation Date</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Train ID</th>
                    <th scope="col">Start Location</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Train Class</th>
                    <th scope="col">Departure Time</th>
                    <th scope="col">Price</th>
                    <th scope="col">Seat Count</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.posts.map((post, index) => (
                    <tr key={index}>
                      <td style={{ display: "none" }}>{post.id}</td>
                      <td>{post.nic}</td>
                      <td>{post.reservationDate}</td>
                      <td>{post.bookingDate}</td>
                      <td>{post.trainID}</td>
                      <td>{post.startLocation}</td>
                      <td>{post.destination}</td>
                      <td>{post.trainClass}</td>
                      <td>{post.departureTime}</td>
                      <td>{post.price}</td>
                      <td>{post.seatCount}</td>
                      <td>
                        {post.status === 3
                          ? 'Canceled'
                          : post.status === 2
                          ? 'Completed'
                          : 'Invalid Status'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReservationHistory;
