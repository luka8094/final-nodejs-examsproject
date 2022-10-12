import {Router} from "express"
const accountsRouter = Router()

import "dotenv/config"
import authLimiter from "../mid/authLimiter.mjs"
import Account from "../model/account.mjs"
accountsRouter.get("/api/users", authLimiter, async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

/*
import jsonwebtoken from "jsonwebtoken"
const {JWT_TOKEN_KEY, AES_KEY_A, AES_KEY_B, AES_KEY_C} = process.env
accountsRouter.get("/api/user", authLimiter, async (req, res) =>{
    const cookie = req.cookies['jwt']
    const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)

    if(!claims) return res.status(403).send({message: "unauthenticated"})

    const user = await Account.findOne({_id: claims._id})

    if(!user) return res.status(401).send({message: "unauthenticated"})
    const {password, createdAt, updatedAt,_id,__v,...data} = user.toJSON()

    data.name = CryptoJS.AES.decrypt(data.name, AES_KEY_A).toString(CryptoJS.enc.Utf8)
    data.username = CryptoJS.AES.decrypt(data.username, AES_KEY_B).toString(CryptoJS.enc.Utf8)

    return res.status(201).send({data})
})

import ip from "ip"
*/
import CryptoJS from "crypto-js"
/*
accountsRouter.post("/api/login", authLimiter, async (req, res) => {
    const loginAttempt = ip.address()
    let attempts = []

    const account = await Account.findOne({email: req.body.email})

    if(!account) return res.status(401).send({data: "your email or password doesn't match"})
    if(req.body.password !== CryptoJS.AES.decrypt(account.password, AES_KEY_C).toString(CryptoJS.enc.Utf8)){
        let counter = 0
        attempts.push(loginAttempt)
        attempts.forEach(attempt => attempt === ip.address() ? counter++ : counter)
        if(counter === 5){
            console.log("Account should be blocked for exhausting 5 attempts.")
            //TODO: implement account blocking
            attempts = []
            console.log(attempts)
        }else{
            console.log(attempts)
            return res.status(401).send({data: "your email or password doesn't match"})
        }
        attempts = attempts
    }else{
        delete req.body
        const token = jsonwebtoken.sign({_id: account._id}, JWT_TOKEN_KEY)

        res.cookie('jwt', token, {httpOnly: true, maxAge: 2 * 60 * 1000})
        res.status(202).send({login: true})
    }
})
*/
import fs from "fs"
import path from "path"
import bcrypt from "bcrypt"
import ROLES from "../data/presets/ROLES.mjs"
import emailDispatch from "../utils/nodemailer.mjs"
import UserSettings from "../model/settings.mjs"
const {AES_KEY_A, AES_KEY_B} = process.env
const {SALT_ROUNDS} = process.env
accountsRouter.post("/api/register", authLimiter, async (req, res) => {  
            const exists = await Account.findOne({email: req.body.email})
            console.log(exists)
        if(!exists){
            const fullname = req.body.firstname.concat(" ", req.body.lastname)
            const ROLE = await Account.find({}).count() === 0 ? ROLES.ADMIN : ROLES.USER
            console.log(ROLE)
            const newAccount = new Account({
                name: CryptoJS.AES.encrypt(fullname, AES_KEY_A).toString(),
                username: CryptoJS.AES.encrypt(req.body.username, AES_KEY_B).toString(), 
                email: req.body.email, 
                password: await bcrypt.hash(req.body.password,  Number(SALT_ROUNDS)),
                role: await bcrypt.hash(ROLE, Number(SALT_ROUNDS))
            })

            //const sentMail = await emailDispatch(req.body.email).catch(console.error)
            //console.log(sentMail)
            delete req.body
            const {_id, ...savedAccount} = await newAccount.save()

            if(savedAccount){
                const MILESTONES = fs.readFileSync(path.resolve("./data/presets/milestones.json"))
                const proppedAccount = await Account.findByIdAndUpdate({"_id": _id},{$push:{userSettings:{milestones: MILESTONES}}})

                console.log("Milestones %s.", MILESTONES)
                console.log("account: %s ", proppedAccount)

                if(proppedAccount)res.status(201).send({data: proppedAccount})
                else res.sendStatus(503)
            }
        }
    else res.sendStatus(409)
})  

/*
accountsRouter.delete("/api/logout", (req, res) => {
    delete req.login
    
    res.cookie('jwt', {maxAge: 0})
    res.sendStatus(202)
})
*/

export default accountsRouter