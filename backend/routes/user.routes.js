const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    let users = await UserModel.find();
    if (search) {
      users = users.find((item) => item.name.contains(search));
    }
    res.status(200).json({ status: "success", users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let newUser = new UserModel(req.body);
    await newUser.save();
    let users = await UserModel.find();
    res.status(200).json({ status: "success", message: "User Added", users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error.message });
  }
});

userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);
    let users = await UserModel.find();
    res.status(200).json({ status: "success", message: "User Updated", users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    let users = await UserModel.find();
    res.status(200).json({ status: "success", message: "User Deleted", users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error.message });
  }
});

module.exports = { userRouter };
