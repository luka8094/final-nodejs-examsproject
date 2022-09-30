import {Router} from "express"
import axios from "axios"
const axiosRouter = Router()

axiosRouter.get("/api/coins", async (req, res) => {
    const coins = axios.request({})
    res.send({data: coins})
})

axiosRouter.get("/api/coins:id", async (req, res) => {
    const coin = axios.request({})
    res.send({data: coin})
})

axiosRouter.get("/api/coins/history", async (req, res) => {
    const history = axios.request({})
    res.send({data: history})
})


export default axiosRouter