import {Router} from "express"
import * as CoinGecko from "coingecko-api"
const axiosRouter = Router()

axiosRouter.get("/api/coins", async (req, res) => {
    console.log(CoinGecko)
    res.send({data: "test"})
})

axiosRouter.get("/api/coins:id", async (req, res) => {
    console.log(CoinGecko)
    res.send({data: "text"})
})

axiosRouter.get("/api/coins/history", async (req, res) => {
    console.log(CoinGecko)
    res.send({data: "test"})
})


export default axiosRouter