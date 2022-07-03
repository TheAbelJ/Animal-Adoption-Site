
const mongoose = require("mongoose");



mongoose
  .connect("mongodb://127.0.0.1:27017/petRescue", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected')
  })
  .catch((e) => {
    console.log("Database connection failed!");
    console.log(e);
  });