import "dotenv/config"
import session from "express-session"
const {SESSION_KEY} = process.env
const sessionMiddleware = session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
})

export default sessionMiddleware