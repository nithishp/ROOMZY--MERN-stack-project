const express = require('express');
const app = express();
const dbconfig = require("./db");       
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/userRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const reviewRoute = require("./routes/NewRoute");
app.use(express.json());     
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);  
app.use("/api/bookings", bookingsRoute);
app.use("/api/reviews", reviewRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));