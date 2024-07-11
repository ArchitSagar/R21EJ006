import express from "express";
import numbersRouter from "./routes/numbers.js";

const app = express()

app.use(express.json())

app.use("/numbers", numbersRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
