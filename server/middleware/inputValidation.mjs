function loginValidation(req, res, next){
    const {email, password} = req.body

    if(!email) return res.status(401).send({data: "email must not be empty"})

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if(!emailRegex.test(email)) return res.status(401).send({data: "invalid email"})

    if(!password) return res.status(401).send({data: "password must not be empty"})
    if(password.length < 8) return res.status(401).send({data: "password must have at least 8 letters"})
    next()
}

function registrationValidation(req, res, next){
    const {username, email, password, firstname, lastname} = req.body

    if(firstname.length > 255 || lastname.length > 255) return res.status(401).send({data: "first or lastname is too long"})

    if(!username) return res.status(401).send({data: "username must not be empty"})

    if(!email) return res.status(401).send({data: "email must not be empty"})

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if(!emailRegex.test(email)) return res.status(401).send({data: "invalid email"})

    if(!password) return res.status(401).send({data: "password must not be empty"})
    if(password.length < 8) return res.status(401).send({data: "password must have at least 8 letters"})
    next()
}

export {loginValidation, registrationValidation}