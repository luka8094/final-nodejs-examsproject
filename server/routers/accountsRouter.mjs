import "dotenv/config"
import {Router} from "express"
import Account from "../model/account.mjs"
const accountsRouter = Router()

accountsRouter.get("/api/user", (req, res) => {
    res.send("the server is connected.")
})

accountsRouter.post("/api/login", (req, res) => {
    console.log("login endpoint")
})

accountsRouter.post("/api/register", (req, res) => {
    console.log("register endpoint")
})  

accountsRouter.post("/api/logout", (req, res) => {
    console.log("logout endpoint")
})

export default accountsRouter