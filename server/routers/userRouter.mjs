import "dotenv/config"
import {Router} from "express"
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
const {JWT_TOKEN_KEY} = process.env
userRouter.post("/api/password", async (req,res) =>{
    const cookie = req.cookies['jwt']
    const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)

    if(!claims) return res.status(403).send({data: "forbidden"})

    const user = await Account.findOne({_id: claims._id})

    if(!user) return res.status(403).send({data: "forbidden"})

    if( req.body.username === CryptoJS.AES.decrypt(user.username, AES_KEY_B).toString(CryptoJS.enc.Utf8) && 
        req.body.current === CryptoJS.AES.decrypt(user.password, AES_KEY_C).toString(CryptoJS.enc.Utf8)){
        const changed = CryptoJS.AES.encrypt(req.body.changed, AES_KEY_C).toString()
        const {password, ...data} = await Account.updateOne(
        {username: claims._id},
        {password: changed}
        )

        res.sendStatus(200)
    }
    else return res.sendStatus(403)
})

export default userRouter