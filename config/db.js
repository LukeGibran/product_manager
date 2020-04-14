const mongoose = require("mongoose");
const config = require("config");

const URL = process.env.MONGO_URL;

const connect = async () => {
  console.log(URL);
  try {
    const res = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connected Successfully!");
  } catch (err) {
    console.log(err);
  }
};

connect();
