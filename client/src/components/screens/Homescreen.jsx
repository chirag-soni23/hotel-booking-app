import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Rooms from "../Rooms";
import Loader from "../Loader";
import { DatePicker, Input } from "antd";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [fromdate, setFromdate] = useState(null);
  const [todate, setTodate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("all"); // Initialize room type filter
  const currentDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.get("http://localhost:5000/api/rooms/getallrooms")
        ).data;
        setRooms(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterRooms = () => {
    // Filter rooms based on searchQuery and selectedRoomType
    const filteredRooms = rooms.filter((room) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseName = room.name.toLowerCase();
      const lowerCaseDescription = room.description.toLowerCase();

      return (
        (lowerCaseName.includes(lowerCaseSearchQuery) ||
          lowerCaseDescription.includes(lowerCaseSearchQuery)) &&
        (selectedRoomType === "all" || room.type === selectedRoomType)
      );
    });

    return filteredRooms;
  };

  const handleSearchKeyUp = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row bs">
        <div className="col-md-4">
          <RangePicker
            format="DD-MM-YYYY"
            onChange={(dates, dateStrings) => {
              setFromdate(dateStrings[0]);
              setTodate(dateStrings[1]);
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <Input className="input"
            placeholder="Search rooms"
            onKeyUp={handleSearchKeyUp}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={selectedRoomType}
            onChange={handleRoomTypeChange}
          >
            <option value="all">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-2">
        {loading ? (
          <Loader />
        ) : filterRooms().length > 0 ? (
          filterRooms().map((room) => (
            <div key={room._id} className="col-md-9 mt-4">
              <Rooms rooms={room} fromdate={fromdate} todate={todate} currentDate={currentDate} />
            </div>
          ))
        ) : (
          <p>No matching rooms found.</p>
        )}
      </div>
    </div>
  );
}

export default Homescreen;

