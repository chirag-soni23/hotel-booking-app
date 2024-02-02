import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
const { TabPane } = Tabs;
import Loader from "../Loader";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3 bs">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBooking() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cancellationState, setCancellationState] = useState(false);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/bookings/getbookingsbyuserid",
          {
            userid: user._id,
          }
        );
        const data = response.data;
        setbookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchUserBookings();
  }, []);

  async function cancelbooking(bookingid, roomid) {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/bookings/cancelbookings",
        {
          bookingid,
          roomid,
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "error",
          title: "Cancellation Failed",
          text: "Something went wrong. Please try again later.",
        });

        const updatedBookings = bookings.map((booking) => {
          if (booking._id === bookingid) {
            return { ...booking, status: "canceled" };
          }
          return booking;
        });
        setbookings(updatedBookings);
        setCancellationState(true);
      } else {
        Swal.fire({
          icon: "success",
          title: "Booking Canceled",
          text: "Your booking has been successfully canceled!",
        });
      }

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Cancellation Failed",
        text: "An error occurred while canceling the booking. Please try again later.",
      });
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-6">
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className="bs">
                    <h1>{booking.room}</h1>
                    <p>
                      <b>Booking</b> : {booking._id}
                    </p>
                    <p>
                      <b>Check In</b> :{" "}
                      {moment(booking.fromdate).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <b>Check Out</b> :{" "}
                      {moment(booking.todate).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <b>Amount</b> : ₹{booking.totalamount}
                    </p>
                    <p>
                      <b>Status</b> :{" "}
                      {booking.status === "cancelled" ? (
                        <Tag color="red">CANCELLED</Tag>
                      ) : (
                        <Tag color="green">CONFIRMED</Tag>
                      )}
                    </p>
                    {booking.status === "booked" && !cancellationState && (
                      <div className="text-right">
                        <button
                          className="btn"
                          onClick={() => {
                            cancelbooking(booking._id, booking.roomid);
                          }}
                        >
                          CANCEL BOOKING
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
