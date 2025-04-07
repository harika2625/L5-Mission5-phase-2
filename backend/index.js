const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
const UserModel = require("./models/user");

mongoose.connect("mongodb://localhost:27017/Zusers");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
