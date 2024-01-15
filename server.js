const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productRoute = require("./routes/ProductRoute");
const UserRoute = require("./routes/UserRoute");
const authRoute = require("./controllers/authController");
const env = require("./config/env");
const authenticator = require("./middleware/authMiddleware");

// enable cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);
app.use("/api/users", authenticator, UserRoute); // Private route - require JWT token
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
