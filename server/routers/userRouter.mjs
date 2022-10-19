import "dotenv/config"
import {Router} from "express"
import jsonwebtoken from "jsonwebtoken"
import jwtCheck from "../mid/jwtCheck.mjs"
import Account from "../model/account.mjs"
const userRouter = Router()
const {JWT_TOKEN_KEY} = process.env

userRouter.patch("/api/milestones", async (req,res) =>{
    console.log("milestones api", req.body)
    const token = req.cookies('jwt')
    const claims = jsonwebtoken.verify(token, JWT_TOKEN_KEY)
    
    if(!claims) return res.sendStatus(403)
    const {milestones} = req.body

    const updated = await Account.findOneAndUpdate({_id: claims._id},{userSettings: {milestones: milestones}})
    if(updated) return res.sendStatus(204)
    else res.sendStatus(503)
})

userRouter.patch("/api/bio", (req,res) =>{
    console.log("bio api", req.body)
})

userRouter.get("/api/transactions", async(req, res) =>{
    console.log("reach get transactions endpoint")
})

userRouter.post("/api/transactions", (req,res) => {
    console.log("reach post transactions endpoint")
})


import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
const {AES_KEY_B, SALT_ROUNDS} = process.env
userRouter.patch("/api/password", jwtCheck, async (req,res) =>{
    const user = await Account.findOne({_id: req.body.id})
    const {password} = await Account.findOne({_id: req.body.id}).select('password')

    if(!user) return res.status(403).send({data:"User not found"})

    if(req.body.username === CryptoJS.AES.decrypt(user.username, AES_KEY_B).toString(CryptoJS.enc.Utf8) && 
        await bcrypt.compare(req.body.current, password)){
            const changed = await bcrypt.hash(req.body.changed, Number(SALT_ROUNDS))
            const {password, ...data} = await Account.findByIdAndUpdate({_id: user._id},{password: changed},{new: true})
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