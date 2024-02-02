const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.js');
const Room = require("../models/room.js")
const moment = require('moment')

router.post('/bookroom', async (req, res) => {
  const {
    room,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
  } = req.body;

  try {
    const newbooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate, "DD-MM-YYYY"),
      todate: moment(todate, "DD-MM-YYYY"),
      totalamount,
      totaldays,
      transactionid: '1234',
    });

    const booking = await newbooking.save();

    // Update the room's current bookings
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate, "DD-MM-YYYY"), todate: moment(todate, "DD-MM-YYYY"), userid: userid, status: booking.status });
    await roomtemp.save();

    // Respond with a success message or the booking data
    res.status(200).send({ message: 'Booking successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the room' });
  }
});
router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid
  try {
    const bookings = await Booking.find({ userid: userid })
    res.send(bookings)

  } catch (error) {
    return res.status(400).json({ error })

  }
})
router.post("/cancelbookings", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    if (!bookingitem) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    bookingitem.status = 'cancelled';
    await bookingitem.save();
    const room = await Room.findOne({ _id: roomid });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    const bookings = room.currentbookings;
    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();
    res.send("Your booking was canceled successfully.");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings = await Booking.find();
    res.send(bookings)

    
  } catch (error) {
    return res.status(400).json({error})
    
  }
})


module.exports = router;




