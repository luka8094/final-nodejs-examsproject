// Date set up inspired from source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
import {Router} from "express"
import {CoinGeckoClient} from "coingecko-api-v3"
const coinGeckoRouter = Router()
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true
})
const currentDate = new Date().toLocaleDateString().replaceAll('.','-')

coinGeckoRouter.get("/api/coins:id", async (req, res) => {
    const COIN_ID = req.params.id
    console.log(client)
    const data = await client.coinId(COIN_ID)
    console.log(data)
    res.send({data: data.data})
})

coinGeckoRouter.get("/api/coins", async (req, res) => {
    const list = await client.coins.list()
    res.send({data: list})
})

coinGeckoRouter.get("/api/coins/history", async (req, res) => {
    const history = await client.coins.fetchHistory("bitcoin", {date: currentDate})
    res.send({data: history})
})


coinGeckoRouter.get("/api/coins/trending", async (req, res) => {
    console.log(client)
    const trend = await client.trending()
    res.send({data: trend.coins})
})


export default coinGeckoRouter