import {Router} from "express"
const accountsRouter = Router()

import "dotenv/config"
import * as jwt from "jsonwebtoken"
import Account from "../model/account.mjs"
accountsRouter.get("/api/user", async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

accountsRouter.post("/api/login", (req, res) => {
    console.log("login endpoint")
})

accountsRouter.post("/api/register", async (req, res) => {
    console.log("register endpoint")
    //const {username, password, email} = req.body
    
    //const newAccount = new Account({username: username, email: email, password: password})
    //const saved = newAccount.save()

    res.send({data: req.body})
})  

accountsRouter.post("/api/logout", (req, res) => {
    console.log("logout endpoint")
})

export default accountsRouter