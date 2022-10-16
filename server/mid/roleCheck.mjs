//inspired by source: https://www.youtube.com/watch?v=jI4K7L-LI58
import bcrypt from "bcrypt"
function roleCheck(role){
    return (req, res, next) => {
        console.log(role, req.body)
        const ROLE = bcrypt.compare(role, req.body.role) 
        if(!ROLE){ 
            return res.status(401).send({data:"denied"})
        }
        next()
    }
}

export default roleCheck