import {Router} from "express"
const adminRouter = Router()

import authLimiter from "../middleWare/authLimiter.mjs"
import jwtCheck from "../middleWare/jwtCheck.mjs"
import roleCheck from "../middleWare/roleCheck.mjs"
import ROLES from "../data/presets/ROLES.mjs"
import Account from "../model/account.mjs"
adminRouter.get("/api/users", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async (req, res) => {
    const result = await Account.find({})
    res.send({data: result})
})

adminRouter.get("/api/users:id", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async(req, res) => {
    const {id} = req.params
    const result = Account.findOne({id: id})
    res.send({data: result})
})

import Attempt from "../model/attempt.mjs"
adminRouter.get("/api/attempts", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async(req, res) => {
    const result = await Attempt.find({})
    res.send({data: result})
})

adminRouter.delete("/api/users:id", [authLimiter, jwtCheck, roleCheck([ROLES.ADMIN])], async (req, res) => {
    const {id} = req.params
    const result = await Account.deleteOne({id: id})
    if(!result) res.send({data: "user not found"})
    else res.send({data: "user deleted"})
})

export default adminRouter