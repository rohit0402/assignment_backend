const express = require("express");
const { signup, login, logout, getUser } = require("./controllers/Auth");
const {
  createCar,
  editCar,
  deleteCar,
  listCars,
} = require("./controllers/feature");
const { verifyToken } = require("./middleware/verifytoken");

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getUser", verifyToken, getUser);

// Car feature routes
router.post("/createCar", verifyToken, createCar);
router.put("/editCar/:id", verifyToken, editCar);
router.delete("/deleteCar/:id", verifyToken, deleteCar);
router.get("/listCars", listCars);

module.exports = router;
