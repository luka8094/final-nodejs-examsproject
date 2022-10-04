import "dotenv/config"
import jsonwebtoken from "jsonwebtoken"
const {JWT_ACCESS_TOKEN} = process.env
function jwtCheck(req, res){
    return (req, res, next) =>{
        const cookie = req.cookie['jwt']
        const claims = jsonwebtoken.verify(cookie,JWT_ACCESS_TOKEN)
        if(!claims) return res.sendStatus(403)
        else next()
    }
}