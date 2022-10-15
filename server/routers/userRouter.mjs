import "dotenv/config"
import {Router} from "express"
import jsonwebtoken from "jsonwebtoken"
import Account from "../model/account.mjs"
const userRouter = Router()
const {JWT_TOKEN_KEY} = process.env


userRouter.get("/api/transactions", (req,res) => {
    
})

userRouter.patch("/api/milestones", async (req,res) =>{
    console.log(req.body)
    const token = req.cookies('jwt')
    const claims = jsonwebtoken.verify(token, JWT_TOKEN_KEY)
    
    if(!claims) return console.log("unauthorized")
    const user = await Account.findOne({_id: claims._id})
})

userRouter.patch("/api/bio", (req,res) =>{
    
})

userRouter.post("/api/transactions", (req,res) => {
    
})

import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
const {AES_KEY_B, AES_KEY_C} = process.env
userRouter.patch("/api/password", async (req,res) =>{
    const cookie = req.cookies['jwt']
    const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)

    if(!claims) return res.status(403),send({data:"Missing credentials"})

    const user = await Account.findOne({_id: claims._id})

    if(!user) return res.status(403).send({data:"User not found"})

    if(req.body.username === CryptoJS.AES.decrypt(user.username, AES_KEY_B).toString(CryptoJS.enc.Utf8) && 
        bcrypt.compare(req.body.current, user.password)){
        const changed = CryptoJS.AES.encrypt(req.body.changed, AES_KEY_C).toString()
        const {password, ...data} = await Account.findByIdAndUpdate({_id: claims._id},{password: changed},{new: true})
        delete req.body    

        if(data)res.status(200).send({data: "Password has been changed"})
        else return res.sendStatus(403)
    }
    else return res.sendStatus(403)
})

userRouter.post("/api/payment", async (req, res) => {
    const {number, month, year, cvc} = req.body

    res.send({data:"connected to the payment endpoint"})
})

export default userRouter