import {Router} from "express"
const accountsRouter = Router()

import "dotenv/config"
import Account from "../model/account.mjs"
accountsRouter.get("/api/users", async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

accountsRouter.get("/api/user", async (req, res) =>{
    console.log("get data for one account.")
})

import jsonwebtoken from "jsonwebtoken"
import CryptoJS from "crypto-js"
const {JWT_TOKEN_KEY, AES_KEY_A, AES_KEY_B, AES_KEY_C} = process.env
accountsRouter.post("/api/login", async (req, res) => {
    const account = await Account.findOne({email: req.body.email})

    if(!account) return res.status(401).send({data: "user not valid."})
    if(req.body.password !== CryptoJS.AES.decrypt(account.password, AES_KEY_C).toString(CryptoJS.enc.Utf8)){ 
        return res.status(401).send({data: "your email or password doesn't match."})
    }else{
        const {password,...data}= account.toJSON()
        const token = jsonwebtoken.sign({_id: account._id}, JWT_TOKEN_KEY)

        res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 1000})
        res.status(202).send({data})
    }
    return res.status(503).send({})
})

accountsRouter.post("/api/register", async (req, res) => {   
    const exists = await Account.findOne({email: req.body.email})

    if(!exists){
        const fullname = req.body.firstname.concat(" ", req.body.lastname)
        const newAccount = new Account({
            name: CryptoJS.AES.encrypt(fullname, AES_KEY_A).toString(),
            username: CryptoJS.AES.encrypt(req.body.username, AES_KEY_B).toString(), 
            email: req.body.email, 
            password: CryptoJS.AES.encrypt(req.body.password, AES_KEY_C).toString()
        })
        delete req.body
        const saved = await newAccount.save()

        if(saved)res.status(201).send({data: saved})
        else res.status(503).send({})
    }
    else res.status(409).send({})
})  

accountsRouter.delete("/api/logout", (req, res) => {
    console.log("logout endpoint")
    res.cookie('jwt', {maxAge: 0})
    res.status(202).send({data:"no content."})
})

export default accountsRouter