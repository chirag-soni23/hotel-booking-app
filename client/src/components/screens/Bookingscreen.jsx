import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Error from "../Error";
import moment from "moment";
import swal from "sweetalert2";

function BookingScreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // if(localStorage.getItem("currentUser")){
    //   window.location.reload="/login"
    // }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:5000/api/rooms/getroombyid`,
          { roomid: roomid }
        );
        const data = response.data;

        setRoom(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  const fromDateObj = moment(fromdate, "DD-MM-YYYY");
  const toDateObj = moment(todate, "DD-MM-YYYY");
  const totalDays = toDateObj.diff(fromDateObj, "days");
  const rentPerDay = room ? room.rentperday : 0;
  const totalAmount = totalDays * rentPerDay;

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
    };

    const isConfirmed = await swal
      .fire({
        title: "Confirm Booking",
        text: "Are you sure you want to book this room?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      })
      .then((result) => result.isConfirmed);

    if (isConfirmed) {
      try {
        setLoading(true);
        const result = await axios.post(
          "http://localhost:5000/api/bookings/bookroom",
          bookingDetails
        );
        setLoading(false);
        if (result.data === " Your Room is booked") {
          swal.fire("Your Room", " is Booked ", "success");
        } else {
          swal.fire("success", "Your Room is Booked", "success");
          window.location.href = "/profile";
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        swal.fire(
          "Error",
          "Something went wrong. Please try again later.",
          "error"
        );
      }
    } else {
      swal.fire("Your", "Booking is canceled", "info");
    }
  }
  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="Room" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking details</h1>
                <hr />
                <b>
                  <p>
                    <b>Name</b>: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p><b>From Date</b>: {fromDateObj.format("DD-MM-YYYY")}</p>
                  <p><b>To Date</b>: {toDateObj.format("DD-MM-YYYY")}</p>
                  <p><b>Max Count</b>: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p><b>Total days</b>:{totalDays}</p>
                  <p><b>Rent Per Days</b>: ₹{rentPerDay}</p>
                  <p><b>Total Amount</b>: ₹{totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn" onClick={bookRoom}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
