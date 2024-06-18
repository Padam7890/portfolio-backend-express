const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose");
const groupRoutes = require("./route/mainRoute");
require("dotenv").config();

const app = express();


//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(
    {
      origin: "http://localhost:5173",
      credentials: true,
    }
));



connectDB();
groupRoutes(app)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});