import dotenv from "dotenv"
import express from "express"

import register from "./controllers/auth/register.js"
import login from "./controllers/auth/login.js"

dotenv.config();
const app = express();
app.use(express.json());

app.get("/api", (req, res) => res.send("API Running"))

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On http://localhost:${PORT}`))