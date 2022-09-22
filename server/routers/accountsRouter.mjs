import {Router} from "express"
const accountsRouter = Router()

accountsRouter.get("/api/test", (req, res) => {
    res.send("the server is connected.")
})

export default accountsRouter