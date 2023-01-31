var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var app = express();
const bodyParser = require("body-parser");
var routes = require("./routes/userRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/", routes);

mongoose
  .connect("mongodb://localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.error(err);
  });
let port = 8081;
app.listen(port, function () {
  console.log("Server listening on port:", port);
});
