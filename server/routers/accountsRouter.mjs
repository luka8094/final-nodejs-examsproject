import {Router} from "express"
const accountsRouter = Router()

import "dotenv/config"
import Account from "../model/account.mjs"
accountsRouter.get("/api/users", async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

import jsonwebtoken from "jsonwebtoken"
const {JWT_TOKEN_KEY, AES_KEY_A, AES_KEY_B, AES_KEY_C} = process.env
accountsRouter.get("/api/user", async (req, res) =>{
    const cookie = req.cookies('jwt')
    const claims = jsonwebtoken.verify(cookie,JWT_TOKEN_KEY)

    if(!claims) return res.status(401).send({message: "unauthenticated."})

    const user = await Account.findOne({_id: claims._id})

    if(!user) return res.status(401).send({message: "unauthenticated."})
    const {password,...data} = user.toJSON()

    return res.status(205).send({data})
})

import CryptoJS from "crypto-js"
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

import emailDispatch from "../utils/nodemailer.mjs"
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
        const sent = await emailDispatch(req.body.email).catch(console.error)

        delete req.body
        const saved = await newAccount.save()

        if(saved && sent)res.status(201).send({data: saved})
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