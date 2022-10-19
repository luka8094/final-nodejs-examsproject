import {Router} from "express"
const accountsRouter = Router()

import "dotenv/config"
import authLimiter from "../mid/authLimiter.mjs"
import jwtCheck from "../mid/jwtCheck.mjs"
import roleCheck from "../mid/roleCheck.mjs"
import ROLES from "../data/presets/ROLES.mjs"
import Account from "../model/account.mjs"
import CryptoJS from "crypto-js"
const {JWT_TOKEN_KEY, AES_KEY_A, AES_KEY_B} = process.env
accountsRouter.get("/api/user", [authLimiter, jwtCheck, roleCheck([ROLES.USER, ROLES.ADMIN])], async (req, res) =>{
    const user = await Account.findOne({_id: req.body.id})

    if(!user) return res.status(401).send({message: "unauthenticated"})
    delete req.body.id

    const {_id, __v, createdAt, updatedAt, ...data} = user.toJSON()

    data.name = CryptoJS.AES.decrypt(data.name, AES_KEY_A).toString(CryptoJS.enc.Utf8)
    data.username = CryptoJS.AES.decrypt(data.username, AES_KEY_B).toString(CryptoJS.enc.Utf8)
    data.milestones = JSON.parse(data.userSettings.milestones.toString())
    data.description = data.userSettings.description.toString()
    data.preferences = JSON.parse(data.userSettings.preferences.toString())

    delete data.userSettings
    
    return res.status(201).send({data})
})

import ip from "ip"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
accountsRouter.post("/api/login", authLimiter, async (req, res) => {
    const loginAttempt = ip.address()
    let attempts = []

    const account = await Account.findOne({email: req.body.email}).select('password')

    if(!account) return res.status(401).send({data: "your email or password doesn't match"})
    if(! await bcrypt.compare(req.body.password, account.password)){
        return res.status(401).send({data: "email or password doesn't match"})
    }else{
        delete account.password
        delete req.body

        const {role} = await Account.findOne({id: account._id}).select('role')
        const token = jsonwebtoken.sign({_id: account._id, role: role}, JWT_TOKEN_KEY)
        delete account._id

        res.cookie('jwt', token, {httpOnly: true, maxAge: 2 * 60 * 1000})
        res.status(202).send({loggedIn: true})
    }
})

import fs from "fs"
import path from "path"
import emailDispatch from "../utils/nodemailer.mjs"
//import UserSettings from "../model/settings.mjs"
const {SALT_ROUNDS} = process.env
accountsRouter.post("/api/register", authLimiter, async (req, res) => {  
    //TODO: !IMPORTANT - proper evalutation of user input prior to registration

            const exists = await Account.findOne({email: req.body.email})
        if(!exists){
            const fullname = req.body.firstname.concat(" ", req.body.lastname)

            //NOTE DANGEROUS: THIS MUST BE MOVED TO THE POPULATE FILE EVENTUALLY
            const ROLE = await Account.find({}).count() === 0 ? ROLES.ADMIN : ROLES.USER
            console.log(ROLE)
            const newAccount = new Account({
                name: CryptoJS.AES.encrypt(fullname, AES_KEY_A).toString(),
                username: CryptoJS.AES.encrypt(req.body.username, AES_KEY_B).toString(), 
                email: req.body.email, 
                password: await bcrypt.hash(req.body.password,  Number(SALT_ROUNDS)),
                role: await bcrypt.hash(ROLE, Number(SALT_ROUNDS))
            })

            const sentMail = await emailDispatch(req.body.email)
            console.log(sentMail)
            delete req.body
            const {_id, ...savedAccount} = await newAccount.save()

            if(savedAccount){
                const MILESTONES = fs.readFileSync(path.resolve("./data/presets/milestones.json"))
                const PREFERENCES = fs.readFileSync(path.resolve("./data/presets/preferences.json"))
                const proppedAccount = await Account.findByIdAndUpdate(
                    {_id: _id},
                    {userSettings: {milestones: MILESTONES, preferences: PREFERENCES}}
                    )

                if(proppedAccount)res.status(201).send({data: proppedAccount})
                else res.sendStatus(503)
            }
        }
    else res.sendStatus(409)
})  

accountsRouter.delete("/api/logout", [jwtCheck, roleCheck([ROLES.ADMIN, ROLES.USER])], (req, res) => {    
    res.cookie('jwt', {maxAge: 0})
    res.sendStatus(202)
})


export default accountsRouter