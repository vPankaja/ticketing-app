import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Train.css";
import { Link } from "react-router-dom";
import loadingGif from "../../../images/loading.gif";

class AllTrains extends Component {
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
    axios.get("/api/trains/getall")
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

  onDelete = (id) => {
    axios
      .delete(`/api/trains/cancel/${id}`)
      .then((res) => {
        swal("Deleted Successful", "Category is removed", "success");
        this.retrievePosts();
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        swal("Network Error", "Failed to connect to the server", "error");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="tabl">
          <br />
          <h2 className="text1">Train Details</h2>
          <div className="add-button">
            <Link to="/addTrain" className="btn btn-primary">
              Add New Train
            </Link>
          </div>
          {this.state.loading ? (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." />
            </div>
          ) : (
            <div>
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
                      <td style={{ display: "none" }}>{post.id}</td>
                      <td>{post.name}</td>
                      <td>{new Date(post.date).toLocaleDateString()}</td>
                      <td>{post.startTime}</td>
                      <td>{post.startLocation}</td>
                      <td>{post.destination}</td>
                      <td>{post.trainClass}</td>
                      <td>{post.seatCount}</td>
                      <td>{post.remainingSeats}</td>
                      <td>
                        <div className="button-container">
                          <Link to={`/trains/${post.id}`} className="btn btn-info">
                            <i className="fas fa-eye"></i>&nbsp;View
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.onDelete(post.id)}
                          >
                            <i className="fas fa-trash" href="#"></i>&nbsp;Delete
                          </button>
                        </div>
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

export default AllTrains;
