const { signup, login, logout, getUser } = require("./controllers/Auth");
const { verifyToken } = require("./middleware/verifytoken");

const router=require("express").router();


//authroutes
router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getUser",verifyToken,getUser);

//carfeaureRoutes
