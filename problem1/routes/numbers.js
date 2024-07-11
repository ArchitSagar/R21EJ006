import express from "express";
import { getEven, getFibonnaci, getPrime, getRandom } from "../controller/numbersController.js";

const numbersRouter = express.Router()

numbersRouter.get("/e", getEven)
numbersRouter.get("/p", getPrime)
numbersRouter.get("/f", getFibonnaci)
numbersRouter.get("/r", getRandom)


export default numbersRouter
