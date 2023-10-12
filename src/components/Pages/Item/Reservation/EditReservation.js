import React from 'react';
import "./reservation.css";

function EditReservation() {
    return (
        <div>
            <div className="container1 form1">
                <div className="row">

                    <div className="col-md-6">
                        <img
                            src="https://media.istockphoto.com/id/1278801008/vector/calendar-and-check-mark-vector-icon.jpg?s=612x612&w=0&k=20&c=mb3TThoC0BJiFFB3JcwMPkTZULhSn5osrHK3o3gDUxg=" // Replace with the URL of your image
                            alt="Item Image"
                            className="img-fluid"
                        />
                    </div>


                    <div className="col-md-6">
                        <div className="card1" style={{ width: "85%" }}>
                            <div className="card-body">
                                <div className="col-md-8 mt-4 mx-auto">
                                    <h1 className="text-center topic1 text1"> Update Reservation Form </h1>
                                    <form className="needs-validation form" noValidate>
                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ marginBottom: "5px" }}>Item Name: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter Name"
                                                value=""
                                                onChange=""
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ marginBottom: "5px" }}>Quantity: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="quantity"
                                                placeholder="Quantity"
                                                value=""
                                                onChange=""
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                            <label style={{ marginBottom: "5px" }}>Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="price"
                                                placeholder="Enter Price"
                                                value=""
                                                onChange=""
                                                style={{ width: "100%" }}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-primary btn-lg"
                                            type="submit"
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
            </div>

            <br />
            <br />
        </div>
    );
}

export default EditReservation;
