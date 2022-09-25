import {Server} from "socket.io"
import http from "http"
import sessionMiddleware from "../mid/session.mjs"

function sessionInit(app){
    const server = http.createServer(app)
    const io = new Server(server)
    const wrapper = middleWare => (socket, next) => middleWare(socket.request, {}, next)

    io.use(wrapper(sessionMiddleware))

    io.on("connection", (socket) => {
        socket.on("messageSent", ({data}) => {
            io.emit("showMessage", {data})
        })
    })
}

export default sessionInit
