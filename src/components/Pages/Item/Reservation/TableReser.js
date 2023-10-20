import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./reservation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import loadingGif from "../../../images/loading.gif";

class TableReser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("/api/reservations/getall")
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
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
        this.setState({ loading: false });
      });
  }

  handleDeleteReservation(id) {
    axios
      .delete(`/api/reservations/cancel/${id}`)
      .then((res) => {
        swal("Success", "Reservation deleted successfully", "success");
        this.retrievePosts();
      })
      .catch((error) => {
        console.error("API request failed:", error);
        swal("Error", "Failed to delete reservation", "error");
      });
  }

  render() {
    return (
      <div className="tabl">
      <div>
        <br />
          <h1 className="text-center" style={{ color: '#FF5733', fontFamily: 'Baufra' }}>
            <b>Reservation Details</b>
          </h1>
          <div className='container'>
            <br />
          {this.state.loading ? (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." />
            </div>
          ) : (
          <table class="table bordered">
        <thead>
                <tr><th scope="col">#</th>
                  <th scope="col">Traveler NIC</th>
                  <th scope="col">Reservation Date</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Train Name</th>
                  <th scope="col">Start Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Train Class</th>
                  <th scope="col">Departure Time</th>
                  <th scope="col">Price</th>
                  <th scope="col">Seat Count</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post, index) => (
                  <tr key={index}><td>{index+1}</td>
                    <td>{post.nic}</td>
                    <td>{post.reservationDate}</td>
                    <td>{post.bookingDate}</td>
                    <td>{post.trainName}</td>
                    <td>{post.startLocation}</td>
                    <td>{post.destination}</td>
                    <td>{post.trainClass}</td>
                    <td>{post.departureTime}</td>
                    <td>{post.price}</td>
                    <td>{post.seatCount}</td>
                    <td>
                      {post.status == 1
                        ? 'Reserved'
                        : post.status == 0
                        ? 'Pending'
                      :'Invalid Status'
                      }
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                      <Link to={`/editreservation/${post.id}`} className="btn btn-outline-success mx-2">
                        <FontAwesomeIcon icon={faEdit} />&nbsp;Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => this.handleDeleteReservation(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />&nbsp;Delete
                      </button> </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div><br />
          </div>
          </div>
    );
  }
}

export default TableReser;
