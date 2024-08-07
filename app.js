const express = require("express");
const { connectdb } = require("./connectdb");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const routes=require("./routes")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api",routes);

connectdb();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT||3000 ; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
