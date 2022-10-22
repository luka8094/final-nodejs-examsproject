import {Router} from "express"
const adminRouter = Router()

import authLimiter from "../mid/authLimiter.mjs"
import jwtCheck from "../mid/jwtCheck.mjs"
import roleCheck from "../mid/roleCheck.mjs"
import ROLES from "../data/presets/ROLES.mjs"
import Account from "../model/account.mjs"
adminRouter.get("/api/chatlogs", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async(req, res) => {
    res.send({data: "reached get all chatlogs endpoint."})
})

import Attempt from "../model/attempt.mjs"
adminRouter.get("/api/attempts", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async(req, res) => {
    console.log(Attempt)
    res.send({data: "reached attempts endpoint."})
})

adminRouter.get("/api/users", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

adminRouter.get("/api/users:id", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async(req, res) => {
    res.send({data: "reached get one user endpoint."})
})

adminRouter.delete("/api/users:id", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async (req, res) => {
    res.send({data: "reached delete user endpoint."})
})


export default adminRouter