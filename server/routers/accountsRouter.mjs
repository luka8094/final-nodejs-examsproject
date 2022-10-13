import {Router} from "express"
import {Blob} from "buffer"
const accountsRouter = Router()

import "dotenv/config"
import authLimiter from "../mid/authLimiter.mjs"
import Account from "../model/account.mjs"
accountsRouter.get("/api/users", authLimiter, async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

import jsonwebtoken from "jsonwebtoken"
const {JWT_TOKEN_KEY, AES_KEY_A, AES_KEY_B, AES_KEY_C} = process.env
accountsRouter.get("/api/user", authLimiter, async (req, res) =>{
    const cookie = req.cookies['jwt']
    const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)

    if(!claims) return res.status(403).send({message: "unauthenticated"})

    const user = await Account.findOne({_id: claims._id})
    console.log(user)
    if(!user) return res.status(401).send({message: "unauthenticated"})
    const {...data} = user.toJSON()
    data.name = CryptoJS.AES.decrypt(data.name, AES_KEY_A).toString(CryptoJS.enc.Utf8)
    data.username = CryptoJS.AES.decrypt(data.username, AES_KEY_B).toString(CryptoJS.enc.Utf8)
    data.userSettings.milestones = JSON.parse(data.userSettings.milestones.toString())
    if(data.userSettings.description) data.userSettings.description = data.userSettings.description.toString()
    if(data.userSettings.preferences) data.userSettings.preferences = data.userSettings.preferences.toString()
    console.log(data)

    return res.status(201).send({data})
})

import ip from "ip"
import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
accountsRouter.post("/api/login", authLimiter, async (req, res) => {
    const loginAttempt = ip.address()
    let attempts = []

    const account = await Account.findOne({email: req.body.email}).select('password')

    if(!account) return res.status(401).send({data: "your email or password doesn't match"})
    if(!bcrypt.compare(req.body.password, account.password)){
        let counter = 
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
        delete account.password
        delete req.body
        const token = jsonwebtoken.sign({_id: account._id}, JWT_TOKEN_KEY)

        res.cookie('jwt', token, {httpOnly: true, maxAge: 2 * 60 * 1000})
        res.status(202).send({loggedIn: true})
    }
})

import fs from "fs"
import path from "path"
import ROLES from "../data/presets/ROLES.mjs"
import emailDispatch from "../utils/nodemailer.mjs"
//import UserSettings from "../model/settings.mjs"
const {SALT_ROUNDS} = process.env
accountsRouter.post("/api/register", authLimiter, async (req, res) => {  
            const exists = await Account.findOne({email: req.body.email})
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
                const proppedAccount = await Account.findByIdAndUpdate({_id: _id},{userSettings: {milestones: MILESTONES}})

                if(proppedAccount)res.status(201).send({data: proppedAccount})
                else res.sendStatus(503)
            }
        }
    else res.sendStatus(409)
})  

accountsRouter.delete("/api/logout", (req, res) => {    
    res.cookie('jwt', {maxAge: 0})
    res.sendStatus(202)
})


export default accountsRouter