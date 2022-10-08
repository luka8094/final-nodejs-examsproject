// Date set up inspired from source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
import {Router} from "express"
import CoinGecko from "coingecko-api"
const coinGeckoRouter = Router()
const CoinGeckoClient = new CoinGecko()
const currentDate = new Date().toLocaleDateString().replaceAll('.','-')

coinGeckoRouter.get("/api/coins", async (req, res) => {
    console.log(currentDate)
    const status = await CoinGeckoClient.ping()
    const data = await CoinGeckoClient.coins.fetchMarketChart("bitcoin", {days: 7, vs_currency: 'eur'})
    res.send({data: data.data})
})

coinGeckoRouter.get("/api/coins:id", async (req, res) => {
    console.log(CoinGecko)
    res.send({data: "text"})
})

coinGeckoRouter.get("/api/coins/history", async (req, res) => {
    console.log(CoinGecko)
    res.send({data: "test"})
})


export default coinGeckoRouter