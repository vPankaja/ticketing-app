import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Train.css";
import { Link } from "react-router-dom";



class AllTrains extends Component {
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
    axios.get("/api/trains/getall")
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
    axios.delete(`http://localhost:8000/item/delete/${id}`).then((res) => {
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
        <h2 className="text1">Train Details</h2>
        <div className="add-button">
            <Link to="/addTrain" className="btn btn-primary">
              Add New Train
            </Link>
          </div>

        <div >
     <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">Start Location</th>
              <th scope="col">Destination</th>
              <th scope="col">Train Class</th>
              <th scope="col">Seat Count</th>
              <th scope="col">Remaining Seats</th>
              <th scope="col">Actions</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <td>{post.name}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>{new Date(post.startTime).toLocaleTimeString()}</td> 
                <td>{post.startLocation}</td>
                <td>{post.destination}</td>
                <td>{post.trainClass}</td>
                <td>{post.seatCount}</td>
                <td>{post.remainingSeats}</td>
                <td>
                      <div className="button-container">
                        <Link to={`/viewTrain/${post._id}`} className="btn btn-info">
                          <i className="fas fa-eye"></i>&nbsp;View
                        </Link>
                        <a
                          className="btn btn-warning"
                          href={`/supplier/update/${post._id}`}
                        >
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        <a
                          className="btn btn-danger"
                          href="#"
                          onClick={() => this.onDelete(post._id)}
                        >
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a>
                      </div>
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

export default AllTrains;
