const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser=require("cookie-parser")

const user=require("./routes/auth.routes")
const TaskUpdate = require("./routes/task.routes")

app.use(cors({
    origin: true, // Replace with your frontend URL (e.g., "http://localhost:5173") when connecting a frontend
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API Operational');
});

app.use("/api/auth",user)
app.use("/api/task",TaskUpdate)

module.exports = app;