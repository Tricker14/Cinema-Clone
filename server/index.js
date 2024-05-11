require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

db.sequelize.sync().then(function(){
    app.listen(3000, function(){
        console.log("Server is running on port 3000");
    });
});