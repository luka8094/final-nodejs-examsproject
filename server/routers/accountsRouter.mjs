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

import bcrypt from "bcrypt"
accountsRouter.post("/api/register", async (req, res) => {     
    const newAccount = new Account({
        username: req.body.username, 
        email: req.body.email, 
        password: await bcrypt.hash(req.body.password, 14)
    })
    const saved = await newAccount.save()

    res.status(201).send({data: saved})
})  

accountsRouter.post("/api/logout", (req, res) => {
    console.log("logout endpoint")
})

export default accountsRouter