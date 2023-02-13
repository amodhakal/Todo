import dotenv from "dotenv"
import express from "express"

dotenv.config();
const app = express();

app.use(express.json());
app.get("/api", (req, res) => res.send("API Running"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`On http://localhost:${PORT}`))