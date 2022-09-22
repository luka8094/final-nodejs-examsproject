import "dotenv/config"
import express from "express"
const app = express()
const PORT = 3000

import accountsRouter from "./routers/accountsRouter.mjs"
app.use(accountsRouter)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))