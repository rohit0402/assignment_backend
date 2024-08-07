const Car = require("../models/carSchema");
const User = require("../models/userSchema");

const createCar = async (req, res) => {
  const { carImage, quantity, price, year, model } = req.body;
  try {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    let newCar = new Car({
      carImage,
      quantity,
      price,
      year,
      model,
    });

    await newCar.save();
    res.status(201).json({
      success: true,
      message: "Car created successfully",
      car: newCar,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const editCar = async (req, res) => {
  const { carImage, quantity, price, year, model } = req.body;
  try {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const carId = req.params.id;
    let car = await Car.findByIdAndUpdate(
      carId,
      { carImage, quantity, price, year, model },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({ success: true, message: "Car updated successfully", car });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const carId = req.params.id;
    let car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


const listCars = async (req, res) => {
  try {
    let cars = await Car.find();
    res.status(200).json({ success: true, cars });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCar,
  editCar,
  deleteCar,
  listCars,
};
