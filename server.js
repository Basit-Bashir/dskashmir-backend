require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/hp", require("./routes/hp"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
