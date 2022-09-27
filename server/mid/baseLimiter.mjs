import rateLimit from "express-rate-limit"
const baseLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})

export default baseLimiter