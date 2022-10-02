//inspired by source: https://www.youtube.com/watch?v=jI4K7L-LI58

function authRole(role){
    return (res, req, next) => {
        if(res.user.role !== role){ 
           return res.status(401).send({data:"not allowed"})
        }
        else next()
    }
}