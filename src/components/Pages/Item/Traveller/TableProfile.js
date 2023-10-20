import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import loadingGif from "../../../images/loading.gif";

class TableProfile extends Component {
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
      .get("/api/travelers/getall")
      .then((res) => {
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

  onDelete = (nic) => {
    axios.delete(`/api/travelers/delete/${nic}`).then((res) => {
      
        swal("Success", "Traveler Deleted Successful", "success");
        this.retrievePosts();
    }).catch((error) => {
      console.error("Axios Error:", error);
      swal("Network Error", "Failed to connect to the server", "error");
    });
  };

  togglePasswordVisibility = (index) => {
    const updatedPosts = [...this.state.posts];
    updatedPosts[index].passwordVisible = !updatedPosts[index].passwordVisible;
    this.setState({ posts: updatedPosts });
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="container card p-5 m-5">
          <h1
            className="text-center"
            style={{ color: "#FF5733", fontFamily: "Baufra" }}
          >
            <b>Traveller Profile Details</b>
          </h1>

          <div className="container">
            {this.state.loading ? (
              <div className="text-center">
                <img src={loadingGif} alt="Loading..." />
              </div>
            ) : (
              <table class="table bordered">
                <thead>
                  <tr>
                    {" "}
                    <th scope="col">#</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dob</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{post.nic}</td>
                      <td>{post.name}</td>
                      <td>{post.phone}</td>
                      <td>{new Date(post.dob).toLocaleDateString()}</td>
                      <td>{post.email}</td>
                      <td>{post.status === 1 ? "Active" : "Inactive"}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={`/travellerprofile/${post.nic}`}
                            className="btn btn-outline-success mx-2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            &nbsp;View
                          </Link>
                          {post.status === 1 && (
                            <Link
                              to={`/edittravel/${post.nic}`}
                              className="btn btn-outline-dark mx-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              &nbsp;Edit
                            </Link>
                          )}
                          <button
                            className="btn btn-outline-danger mx-2"
                            onClick={() => this.onDelete(post.nic)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            &nbsp;Delete
                          </button>{" "}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TableProfile;
