const express = require("express");
const cors = require("cors");
const { connections } = require("./db");
const { userRouter } = require("./routes/userRoute");
const { dashboardRouter } = require("./routes/dashboardRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello developer" });
});

app.use("/users", userRouter);
app.use("/dashboards", dashboardRouter);

app.listen(8080, async () => {
  try {
    await connections;
    console.log("Listening on port");
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
});
