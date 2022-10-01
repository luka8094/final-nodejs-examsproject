import "dotenv/config"
import {Router} from "express"
import jsonwebtoken from "jsonwebtoken"
const userRouter = Router()

userRouter.get("/api/milestones", (req,res) =>{
    
})

userRouter.get("/api/transactions", (req,res) => {
    
})

userRouter.post("/api/bio", (req,res) =>{

})

userRouter.post("/api/milestones", (req,res) =>{

})

userRouter.post("/api/transactions", (req,res) => {
    
})

import Account from "../model/account.mjs"
import CryptoJS from "crypto-js"
const {JWT_TOKEN_KEY, AES_KEY_B, AES_KEY_C} = process.env
userRouter.patch("/api/password", async (req,res) =>{
    console.log(req.body)
    const cookie = req.cookies['jwt']
    const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)

    if(!claims) return res.status(403),send({data:"Missing credentials"})

    const user = await Account.findOne({_id: claims._id})

    if(!user) return res.status(403).send({data:"User not found"})

    if(req.body.username === CryptoJS.AES.decrypt(user.username, AES_KEY_B).toString(CryptoJS.enc.Utf8) && 
        req.body.current === CryptoJS.AES.decrypt(user.password, AES_KEY_C).toString(CryptoJS.enc.Utf8)){
        const changed = CryptoJS.AES.encrypt(req.body.changed, AES_KEY_C).toString()
        const {password, ...data} = await Account.findByIdAndUpdate({_id: claims._id},{password: changed},{new: true})

        if(data)res.status(200).send({data: "Password has been changed"})
        else return res.sendStatus(403)
    }
    else return res.sendStatus(403)
})

export default userRouter