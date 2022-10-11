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
    const data = await client.coinIdMarketChart({
        id: COIN_ID, 
        vs_currency: 'eur', 
        days: 7
    })
    res.send({data: data})
})

coinGeckoRouter.get("/api/coins", async (req, res) => {
    const list = await client.coinMarket({
        order: "gecko_desc", 
        vs_currency: "eur",
        sparkline: true, 
        category: "decentralized_finance_defi", 
        per_page: 20, 
        page: 0
    })
    console.log(list)
    const listTest = await client.global()
    const events = await client.events({
        country_code: "US", 
        page: 1, 
        upcoming_events_only: false, 
        from_date: currentDate
    })
    res.send({data: {list, listTest, events}})
})

coinGeckoRouter.get("/api/coins/trending", async (req, res) => {
    const trend = await client.trending()
    res.send({data: trend.coins})
})

coinGeckoRouter.get("/api/coins/news", async(req, res) =>{
    res.send({})
})


export default coinGeckoRouter