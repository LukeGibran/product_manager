require("dotenv").config();

const express = require("express");

require("./config/db");

const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());

app.use(express.json({ extended: false }));

app.use("/api/user", require("./routes/users"));

app.use("/api/product_type", require("./routes/product_type"));

app.use("/api/product", require("./routes/product"));

app.use("/api/customer", require("./routes/customer"));

app.use("/api/receipt", require("./routes/receipt"));

app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
