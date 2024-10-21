const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConfig = require('./config/db');
const admin = require("firebase-admin");
const cors = require("cors");
const app = express();
dotenv.config();
 

app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);

mongoose.connect(dbConfig.db).then(
    () => {
        console.log("Database Connected");
    }, (error) => {
        console.error("Database can't be connected: " + error);
    }
);

app.use(express.json());
app.use("/users", require("./routes/users.routes"));
app.use("/products", require("./routes/products.routes"));
app.use("/carts", require("./routes/carts.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/reviews", require("./routes/reviews.routes"));
// app.use("/notifications", require("./routes/notification.routes"));
app.use("/coupons", require("./routes/coupons.routes"));
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({
      success: false,
      message: err.message
    });
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is ready on port " + (process.env.PORT || 4000));
});
