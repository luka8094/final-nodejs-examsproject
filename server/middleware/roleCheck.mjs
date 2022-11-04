//inspired by source: https://www.youtube.com/watch?v=jI4K7L-LI58
import bcrypt from "bcrypt"
function roleCheck(rolesArray){
    return async (req, res, next) => {
        let AUTHORIZED = false

        for(let i = 0; i < rolesArray.length; i++){
            AUTHORIZED = await bcrypt.compare(rolesArray[i], req.body.role)
            if(AUTHORIZED) break
        }
        
        if(AUTHORIZED) next()
        else return res.status(401).send({data:"unauthorized"})
    }
}

export default roleCheck