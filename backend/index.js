const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/contacts", userRouter);

app.listen(process.env.PORT || 4500, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Server is running at PORT ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
