const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const stripe = require("stripe")(
  "sk_test_51J53wDSIvrJoJ2HuMjtiAWAneQB2O47ivnKbAZiun1djVBATBurpaegCnASAvwLKXjP7XI0ao34Xbeal2kLXaP9g00H30q6f4v"
);
const { v4: uuidv4 } = require("uuid");
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
  try {
    const customer = await stripe.customers.create({email : token.email, source : token.id})
    const payment = await stripe.charges.create({
      amount: totalamount * 100,
      customer: customer.id,
      currency: 'inr',
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4()
    });
    
    if(payment){
      
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid: userid,
          fromdate: fromdate,
          todate: todate,
          totalamount,
          totaldays,
          transactionId: "1234",
        });
        
        const booking = await newbooking.save();
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: fromdate,
          todate: todate,
          userid: userid,
          status: "booked",
        });
        await roomtemp.save();
    
        
      
    }
    res.send('payment successful')
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" }); 
  }

  
});
router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userId;
  console.log(userid);
  try {
    const bookings = await Booking.find({ userid: userid });
    console.log(bookings,'Bookings Route');
    res.send(bookings);
  } catch (error) {
    res.send.status(400).json({ message: "Getuserbyid error" });
  }
});
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings
    const newbookings = bookings.filter((booking) => {
      return booking.bookingid != bookingid;
    });
    room.currentbookings = newbookings;
    await room.save();
    res.send("Booking Cancelled");
    
    
  } catch (error) {
   return res.status(400).json({ message: "Something went wrong Booking not cancelled" }); 
  }
});
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.send.status(400).json({ message: "Getallbookings error" });
  }
});
module.exports = router;
