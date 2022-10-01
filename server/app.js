import "dotenv/config"
import express from "express"
const app = express()
const {PORT} = process.env

import path from "path"
app.use(express.static(path.resolve("../client/knox/public")))

import helmet from "helmet"
app.use(helmet())

import connection from "./database/mongodbConnection.mjs"
connection

import cookieParser from "cookie-parser"
app.use(express.json())
app.use(cookieParser())

import baseLimiter from "./mid/baseLimiter.mjs"
app.use(baseLimiter)

import accountsRouter from "./routers/accountsRouter.mjs"
import userRouter from "./routers/userRouter.mjs"
app.use(accountsRouter)
app.use(userRouter)

import http from "http"
import {Server} from "socket.io"
import sessionMiddleware from "./mid/session.mjs"
const server = http.createServer(app)
const io = new Server(server)
const wrapper = middleWare => (socket, next) => middleWare(socket.request, {}, next)

io.use(wrapper(sessionMiddleware))

io.on("connection", (socket) => {
    socket.on("chatmessageSent", ({data}) => {
        io.emit("showChatmessage", {data})
    })
})

server.listen(PORT, () => console.log("Server running on port: %s", PORT))