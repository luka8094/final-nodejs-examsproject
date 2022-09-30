import ip from "ip"
let attempts = []

function ipCatcher(req,res,next){
    const loginAttempt = ip.address()
    let counter = 0

    attempts.push(loginAttempt)
    console.log(loginAttempt, attempts)
    attempts.forEach(attempt => attempt === loginAttempt ? counter++ : counter)
    if(counter === 5){ 
        console.log("Account should be blocked due to suspicious activity for 5 failed attempts in row.")
        req.deactivate = true
        attempts = []
    }
    attempts = attempts
    next()
}

export default ipCatcher