//inspired by source: https://www.youtube.com/watch?v=jI4K7L-LI58
import bcrypt from "bcrypt"
function authRole(role){
    return (res, req, next) => {
        const ROLE = bcrypt.compare(req.body.role, role) 
        if(ROLE){ 
           return res.status(401).send({data:"not allowed"})
        }
        next()
    }
}

export default authRole