import {Router} from "express"
const accountsRouter = Router()

import authLimiter from "../middleWare/authLimiter.mjs"
import jwtCheck from "../middleWare/jwtCheck.mjs"
import roleCheck from "../middleWare/roleCheck.mjs"
import ROLES from "../data/presets/ROLES.mjs"
accountsRouter.get("/api/token",[authLimiter, jwtCheck, roleCheck([ROLES.USER, ROLES.ADMIN])], async(req, res) =>{
    res.send({loggedIn: true})
})

import "dotenv/config"
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
    data.milestones = data.userSettings.milestones
    data.description = data.userSettings.description.toString()
    data.preferences = data.userSettings.preferences

    delete data.userSettings

    return res.status(201).send({data})
})

import address from "address"
import bcrypt from "bcrypt"
import {loginValidation} from "../middleWare/inputValidation.mjs"
import jsonwebtoken from "jsonwebtoken"
import Attempt from "../model/attempt.mjs"
accountsRouter.post("/api/login", authLimiter, loginValidation, async (req, res) => {
    //TODO: PROPER USER DATA VALIDATTION (SIZE, LEXICAL CONTENT, SYNTAX)
    const {email, password} = req.body

    const account = await Account.findOne({email: email}).select('password')
    console.log(account)
    if(!account) return res.status(401).send({data: "email or password doesn't match"})
    if(!await bcrypt.compare(password, account.password)){
        console.log("testing")
        const loginAttempt = {}

        loginAttempt.email = email
        loginAttempt.password = password
        loginAttempt.ipvFour = address.ip()
        loginAttempt.ipvSix = address.ipv6()
        loginAttempt.machine = address.mac()

        const newAttempt = new Attempt({
            useremail: loginAttempt.email,
            password: loginAttempt.password,
            ipvFour: loginAttempt.ipvFour,
            ipvSix: loginAttempt.ipvSix,
            machine: loginAttempt.machine
        })

        const loggedAttempt = await newAttempt.save()
        delete loginAttempt.email
        delete loginAttempt.password
        delete loginAttempt.ipvFour
        delete loginAttempt.ipvSix
        delete loginAttempt.machine
        delete req.body

        if(loggedAttempt) return res.status(401).send({data: "email or password doesn't match"})
        else res.sendStatus(502)
    }else{
        delete account.password
        delete req.body

        const {role} = await Account.findOne({_id: account._id}).select('role')
        const isAdmin = await bcrypt.compare(ROLES.ADMIN, role)
        const token = jsonwebtoken.sign({_id: account._id, role: role}, JWT_TOKEN_KEY)

        delete account._id
        console.log(isAdmin)
        res.cookie('jwt', token, {httpOnly: true, maxAge: 5 * 60 * 1000})
        res.status(202).send({loggedIn: true, admin: isAdmin, message: "Login success!"})
    }
})

import {MILESTONES,PREFERENCES} from "../data/presets/SETTINGS.mjs"
import emailDispatch from "../utilities/nodemailer.mjs"
const {SALT_ROUNDS} = process.env 
accountsRouter.post("/api/register", authLimiter, async (req, res) => {  
    //TODO: !IMPORTANT - proper evalutation of user input prior to registration
    //PROPER USER DATA VALIDATTION (SIZE, LEXICAL CONTENT, SYNTAX)
        const exists = await Account.findOne({email: req.body.email})

        if(!exists){
            const fullname = req.body.firstname.concat(" ", req.body.lastname)
            let ROLE
            //NOTE DANGEROUS: THIS MUST BE MOVED TO THE POPULATE FILE EVENTUALLY
            if(await Account.count({}) === 0) ROLE = ROLES.ADMIN
            else ROLE = ROLES.USER
            console.log(ROLE)
            const newAccount = new Account({
                name: CryptoJS.AES.encrypt(fullname, AES_KEY_A).toString(),
                username: CryptoJS.AES.encrypt(req.body.username, AES_KEY_B).toString(), 
                email: req.body.email, 
                password: await bcrypt.hash(req.body.password, Number(SALT_ROUNDS)),
                role: await bcrypt.hash(ROLE, Number(SALT_ROUNDS))
            })

            const sentMail = await emailDispatch(req.body.email)
            console.log(sentMail)
            delete req.body
            const {_id, ...savedAccount} = await newAccount.save()

            if(savedAccount){
                const proppedAccount = await Account.findByIdAndUpdate(
                    {_id: _id},
                    {userSettings: {
                        milestones: MILESTONES, 
                        preferences: PREFERENCES
                        }}
                    )

                if(proppedAccount)res.status(201).send({data: "registration successful"})
                else res.sendStatus(503)
            }
        }
    else res.sendStatus(409)
})  

accountsRouter.delete("/api/logout", authLimiter, (req, res) => {    
    res.cookie('jwt', {maxAge: 0})
    res.sendStatus(202)
})


export default accountsRouter