import dotenv from "dotenv"
import express from "express"

import register from "./controllers/auth/register.js"
import login from "./controllers/auth/login.js"

import getTasks from "./controllers/tasks/getTasks.js"
import addTask from "./controllers/tasks/addTask.js"
import deleteTask from "./controllers/tasks/deleteTask.js"
import authToken from "./util/authToken.js"

dotenv.config();
const app = express();
app.use(express.json());

app.get("/api", (req, res) => res.send("API Running"))

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.get("/api/tasks/getTasks", authToken, getTasks);
app.post("/api/tasks/addTask", authToken, addTask);
app.post("/api/tasks/deleteTask", authToken, deleteTask);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On http://localhost:${PORT}`))