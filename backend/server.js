var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
var app = express();
const bodyParser = require("body-parser");
var auth = require("./routes/userRoute");
var intrest = require("./routes/intrestRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", auth);
app.use("/intrest", intrest);

mongoose
  .connect(
    "mongodb+srv://demoProject:MlwQqGzWa55foywD@cluster0.stg1vg7.mongodb.net/demo-project",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.error(err);
  });
let port = 8081;
app.listen(port, function () {
  console.log("Server listening on port:", port);
});
