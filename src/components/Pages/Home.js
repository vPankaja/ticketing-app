import React from 'react';
import './home.css';

function Home() {
  return (
    <div>
      <div className="understand">
        <img
          src="https://images4.alphacoders.com/150/150168.jpg"
          alt="Buy on Inventory"
          style={{
            width: '100%',
            height: '70vh',
            objectFit: 'cover',
            borderRadius: '10%',
           
          }}
        />
      </div>

      <h1 className="heading">OUR TEAMS ARE HERE</h1>

      <div className="center-content">
        <p>
          <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          <br /> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          <br /> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
          <br /> aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        </p>


        <div className="button-container">
          {/* <button type="button" className="btn btn-lg btn-primary mr-2" disabled>
            <a href="/addreservation" style={{ textDecoration: 'none', color: 'white' }}>
              <span className="button-text">Reservation</span>
              <FaArrowRight />
            </a>
          </button> */}


          {/* <button type="button" class="btn btn-lg btn-primary mr-2" disabled><a href="/addbooking">  Booking  </a><FaArrowRight /></button>
          <button type="button" class="btn btn-lg btn-primary " disabled><a href="/addreservation">  Primary button  </a><FaArrowRight /></button> */}
        </div>

        <div>
          <div className="container1 form1">
            <div className="row">

              <div className="col-md-6">
                <img
                  src="https://uploads-ssl.webflow.com/5ea704591b73e7337746aa7b/641b18a1221649d6aba7cf4a_9%20Essential%20Features%20of%20a%20Good%20Ticketing%20Systems.png" // Replace with the URL of your image
                  alt="Item Image"
                  className="img-fluid"
                />
              </div>


              <div className="col-md-6">
                <div className="card1" style={{ width: "85%" }}>
                  <div className="card-body">
                    <div className="col-md-8 mt-4 mx-auto">
                      <b><u><h1 className="hed">E-Ticketing</h1></u></b>
                      <i><p className="para">
                        E-ticketing, short for electronic ticketing, is a digital solution that has revolutionized the way tickets are issued, purchased, and used for various events and transportation services. Unlike traditional paper tickets, e-tickets are delivered electronically through email, mobile apps, or websites, eliminating the need for physical documents. This technology has been widely adopted in the travel, entertainment, and event industries, offering numerous benefits, such as convenience, cost savings, reduced environmental impact, and enhanced security. E-ticketing has become a standard practice for booking flights, trains, buses, concerts, movies, and various other events and services, making it easier for consumers to access and manage their tickets while streamlining the ticketing process for providers.
                      </p></i>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row second">
              <div className="col-md-6">
                <div className="card1" style={{ width: "85%" }}>
                  <div className="card-body">
                    <div className="col-md-8 mt-4 mx-auto">
                      <b><u><h1 className="hed">E-Ticketing</h1></u></b>
                      <i><p className="para">
                        E-ticketing, short for electronic ticketing, is a digital solution that has revolutionized the way tickets are issued, purchased, and used for various events and transportation services. Unlike traditional paper tickets, e-tickets are delivered electronically through email, mobile apps, or websites, eliminating the need for physical documents. This technology has been widely adopted in the travel, entertainment, and event industries, offering numerous benefits, such as convenience, cost savings, reduced environmental impact, and enhanced security. E-ticketing has become a standard practice for booking flights, trains, buses, concerts, movies, and various other events and services, making it easier for consumers to access and manage their tickets while streamlining the ticketing process for providers.
                      </p></i>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6  ">
                <img
                  src="https://media.istockphoto.com/id/1334776032/vector/train-station-crowd-flat-design.jpg?s=612x612&w=0&k=20&c=gxtkOZEjX_xxf0dtxVpZOnKXZTfH3SA3KbvihnpRBjU=" // Replace with the URL of your image
                  alt="Item Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
