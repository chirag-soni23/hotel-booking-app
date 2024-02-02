import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import moment from "moment";
import swal from "sweetalert2";

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h3 className="text-center" style={{ fontSize: "25px" }}>
        <b>ADMIN PANEL</b>
      </h3>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

// Booking List Compnents

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/bookings/getallbookings"
      );
      const data = response.data;
      setbookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{moment(booking.fromdate).format("DD-MM-YYYY")}</td>
                    <td>{moment(booking.todate).format("DD-MM-YYYY")}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// Rooms List components
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/rooms/getallrooms"
      );
      const data = response.data;
      setrooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// Users List Components
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );
      const data = response.data;
      setusers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Rooms Components

export function Addroom() {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState();
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();
  async function Addroom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    try {
      setLoading(true)
      const result = await axios.post("http://localhost:5000/api/rooms/addroom", newroom);
      setLoading(false)
      swal.fire("Congrats","Your New Room Added Successfully","success")
      // console.log(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false)
      swal.fire("OOps","Something Went wrong","error").then(result =>{
        window.location.href ="/"
      })
    }
    

    setname("");
    setrentperday("");
    setmaxcount("");
    setdescription("");
    setphonenumber("");
    settype("");
    setimageurl1("");
    setimageurl2("");
    setimageurl3("");
    // console.log(newroom);
  }

  return (
    <div className="row">
      <div
        className="col-md-5"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
        {loading && <Loader/>}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
          className="form-control"
          placeholder="Room name"
        />
        <input
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Rent Per Day"
        />
        <input
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Max Count"
        />

        <textarea
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          style={{ resize: "none" }}
          className="form-control"
          cols="70"
          placeholder="Description"
          rows="10"
        ></textarea>
        <input
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Phone number"
        />
      </div>
      <div
        className="col-md-5"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <input
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Type"
        />
        <input
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Image URL 1"
        />
        <input
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Image URL 2"
        />
        <input
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Image URL 3"
        />
        <div className="text-right">
          <button className="btn mt-2" onClick={Addroom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
