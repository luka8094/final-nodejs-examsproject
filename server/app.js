import "dotenv/config"
import express from "express"
const app = express()
const {PORT} = process.env

import path from "path"
app.use(express.static(path.resolve("../client/knox/public")))

import connection from "./database/mongodbConnection.mjs"
connection

import sessionInit from "./utils/sockets.mjs"
sessionInit(app)

import accountsRouter from "./routers/accountsRouter.mjs"
import cookieParser from "cookie-parser"
app.use(express.json())
app.use(cookieParser())
app.use(accountsRouter)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))