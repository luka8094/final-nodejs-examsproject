import "dotenv/config"
import express, { json } from "express"
const app = express()
const {PORT} = process.env

import connection from "./database/mongodbConnection.mjs"
connection

import accountsRouter from "./routers/accountsRouter.mjs"
app.use(express.json())
app.use(accountsRouter)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))