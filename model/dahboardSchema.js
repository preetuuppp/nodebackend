const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    Email: String,
    Department: String,
    user: String,
    userID: String,
    Salary: Number,
  },
  {
    versionKey: false,
  }
);

const dashboardModel = mongoose.model("dashboard", dashboardSchema);

module.exports = {
  dashboardModel,
};
