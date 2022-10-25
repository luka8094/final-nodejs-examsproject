import "dotenv/config"
import jsonwebtoken from "jsonwebtoken"
const {JWT_TOKEN_KEY} = process.env
function jwtCheck(req, res, next){
        const cookie = req.cookies['jwt']
        const claims = jsonwebtoken.verify(cookie, JWT_TOKEN_KEY)
        if(!claims) return res.sendStatus(403)
        else{ 
            req.body.id = claims._id
            req.body.role = claims.role
            next()
        }
    }

export default jwtCheck