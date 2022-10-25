import fs from "fs"
import "dotenv/config"
import {Router} from "express"
import jsonwebtoken from "jsonwebtoken"
import authLimiter from "../middleWare/authLimiter.mjs"
import jwtCheck from "../middleWare/jwtCheck.mjs"
import roleCheck from "../middleWare/roleCheck.mjs"
import ROLES from "../data/presets/ROLES.mjs"
import Account from "../model/account.mjs"
const userRouter = Router()
const {JWT_TOKEN_KEY} = process.env

userRouter.patch("/api/milestones", [jwtCheck, roleCheck([ROLES.ADMIN, ROLES.USER])] ,async (req, res) =>{
    console.log("milestones api")
    
    const {milestones} = req.body
    console.log(milestones)
    
    const account = await Account.findById({_id: req.body.id})
    const updated = await account.set("userSettings.milestones", milestones).save()
    console.log(updated)
    if(updated){ 
        delete req.body
        return res.sendStatus(204)
    }
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

import Stripe from "stripe"
const {STRIPE_PRIVATE_KEY} = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY,{apiVersion: '2022-08-01'})
userRouter.post("/api/payment", async (req, res) => {
    const {number, month, year, cvc} = req.body
    const testItems = new Map([
        [1, {priceInCents: 10000000, name: 'bitcoin'}],
        [2, {priceInCents: 2000000, name: 'dogecoin'}]
    ])

    try{
        const paymentSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: testItems.map(),
            success_url: '/account',
            cancel_url: '/cryptobag'
        })
    }catch(e){
        console.log("Error: %s",e.message)
    }
    res.send({data:"connected to the payment endpoint"})
})

export default userRouter