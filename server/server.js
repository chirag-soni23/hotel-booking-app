require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000; // Use the provided port or default to 5000
const dbconfig = require("./db"); // Import database configuration (if you have it)
const roomRoute = require("./routes/roomRoutes.js"); // Import room routes
const userRoute = require("./routes/usersRoutes.js"); // Import user routes
const bookingRoute = require("./routes/bookingRoutes.js"); // Import booking routes
const cors = require("cors");
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors()); // Enable CORS for your server

app.use(express.json()); // Parse incoming JSON data

app.use("/api/rooms", roomRoute); // Use the room routes for paths starting with "/api/rooms"
app.use("/api/users", userRoute); // Use the user routes for paths starting with "/api/users"
app.use("/api/bookings", bookingRoute); // Use the booking routes for paths starting with "/api/bookings"

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
