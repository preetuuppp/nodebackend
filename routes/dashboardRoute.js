const express = require("express");
const { auth } = require("../middleware/auth");

const { dashboardModel } = require("../model/dahboardSchema");
const dashboardRouter = express.Router();

dashboardRouter.use(auth);
dashboardRouter.post("/employees", async (req, res) => {
  try {
    const dashboard = new dashboardModel(req.body);
    await dashboard.save();
    res.json({ msg: "New dashboard created", dashboard: req.body });
  } catch (error) {
    res.json({ msg: "Could not create" });
  }
});

//Getting dashboards
dashboardRouter.get("/", async (req, res) => {
  try {
    const dashboard = await dashboardModel.find({ userID: req.body.userID });

    res.json(dashboard);
  } catch (error) {
    res.json({ msg: "Could not found" });
  }
});

// updating a dashboard

dashboardRouter.patch("/edit/:userID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { userID } = req.params;
  try {
    const dashboard = await dashboardModel.findOne({ _id: userID });
    console.log(dashboard);
    const userIDindashboardDoc = dashboard.userID;
    if (userIDinUserDoc === userIDindashboardDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in dashboard",
      //   userIDindashboardDoc
      // );
      await dashboardModel.findByIdAndUpdate({ _id: userID }, req.body);
      res.json({ msg: `${dashboard.FirstName} has been updated` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in dashboard",
      //   userIDindashboardDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

// deleted a dashboard
dashboardRouter.delete("/delete/:userID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { userID } = req.params;
  try {
    const dashboard = await dashboardModel.findOne({ _id: userID });
    console.log(dashboard);
    const userIDindashboardDoc = dashboard.userID;
    if (userIDinUserDoc === userIDindashboardDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in dashboard",
      //   userIDindashboardDoc
      // );
      await dashboardModel.findByIdAndDelete({ _id: userID });
      res.json({ msg: `${dashboard.FirstName} has been deleted` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in dashboard",
      //   userIDindashboardDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

// *********A GET route to get the data of all the post and filter part with qyery by Salery*********
dashboardRouter.get("/salary", async (req, res) => {
  try {
    let query = {};

    query.Salary = { $gte: min, $lte: max };
    const data = await dashboardModel.find(query);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "something went wrong" });
  }
});

// ****** A GET route to handle the pages and responses as well, basically apply pagination***
dashboardRouter.get("/number/:pagination", async (req, res) => {
  const pagination = +req.params.pagination;
  if (pagination) {
    skip_page = 2 * pagination - 2;
    const postpage = await dashboardModel.find().limit(5).skip(skip_page);
    res.status(200).send(postpage);
  } else {
    res.send({ msg: "Page number not valid" });
  }
});

module.exports = {
  dashboardRouter,
};
