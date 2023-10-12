import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./reservation.css"

class TableReser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/api/reservations/getall")
      .then((res) => {
        console.log(res.data); // Log the response to inspect its structure

        // Check if the response status is successful
        if (res.status === 200) {
          // Assuming the data is an array of reservations with a "destination" property
          const reservations = res.data; // Modify this based on your API response structure
          this.setState({
            posts: reservations,
          });
        } else {
          console.error("API request did not return a successful status.");
        }
      })
      .catch((error) => {
        // Handle API request errors here (e.g., display an error message).
        console.error("API request failed:", error);
      });
  }




  onDelete = (id) => {
    axios.delete(`/delete/${id}`).then((res) => {
      if (res.data.success) {
        swal("Deleted Successful", "Category is removed", "success");
        this.retrievePosts();
      } else {
        swal("Deleted Successful", "Category is removed", "success");
      }
    });
  };




  render() {
    return (
      <div className="tabl">
      <div>
        <br />
        <h2 className="text1">Reservation Details</h2>


        <div >
     <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Traveler ID</th>
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <td>{post.travelerID}</td>
                <td>{post.reservationDate}</td>
                <td>{post.bookingDate}</td>
                <td>{post.trainID}</td>
                <td>{post.startLocation}</td>
                <td>{post.destination}</td>
                <td>{post.trainClass}</td>
                <td>{post.departureTime}</td>
                <td>{post.price}</td>
                <td>{post.seatCount}</td>
                <td>{post.status}</td>
                <td>
                  <a className="btn btn-warning" href={`/supplier/update/${post._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(post._id)}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div >
    </div>
  );
  }

}

export default TableReser;
