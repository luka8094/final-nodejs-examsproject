import "dotenv/config"
const {SESSION_KEY} = process.env

import session from "express-session"
const sessionMiddleware = session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
})

export default sessionMiddleware