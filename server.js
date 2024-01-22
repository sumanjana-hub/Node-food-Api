const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectdb = require('./config/Db');
const authRoutes = require('./routes/authRouter')
const getRoutes = require("./routes/userRoutes")
const resturtant = require("./routes/restaurtantRoutes")
const category = require("./routes/categoryRoutes")
const food = require("./routes/foodRoutes")

const app = express();

//dotenv config
dotenv.config();

connectdb();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/test", authRoutes);
app.use("/api/v1/user", getRoutes);
app.use("/api/v1/restaurtant", resturtant)
app.use("/api/v1/category", category)
app.use("/api/v1/food", food)

app.get('/', (req,res)=>{
    res.status(200).json({message:"hello from the server"});
})

app.use("/home",(req,res)=>{
    res.json({message:"hello from the server"})
})

const port = process.env.PORT ;

app.listen(port,()=>{
    console.log("listening on port 4000");
})