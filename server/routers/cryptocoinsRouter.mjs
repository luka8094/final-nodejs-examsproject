// Date set up inspired from source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
import {Router} from "express"
import CoinGecko from "coingecko-api"
const coinGeckoRouter = Router()
const CoinGeckoClient = new CoinGecko()
const currentDate = new Date().toLocaleDateString().replaceAll('.','-')

coinGeckoRouter.get("/api/coins:id", async (req, res) => {
    console.log(req.params)
    const COIN_ID = req.params.id
    const status = await CoinGeckoClient.ping()
    const data = await CoinGeckoClient.coins.fetchMarketChart(COIN_ID, {days: 7, vs_currency: 'eur'})
    res.send({data: data.data})
})

coinGeckoRouter.get("/api/coins", async (req, res) => {
    const status = await CoinGeckoClient.ping()
    const list = await CoinGeckoClient.coins.list()
    res.send({data: list})
})

coinGeckoRouter.get("/api/coins/history", async (req, res) => {
    const status = await CoinGeckoClient.ping()
    const history = await CoinGeckoClient.coins.fetchHistory("bitcoin", {date: currentDate})
    res.send({data: history})
})


export default coinGeckoRouter