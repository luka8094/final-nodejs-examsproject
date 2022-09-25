import "dotenv/config"
import nodemailer from "nodemailer"

async function emailDispatch(recipient){
    const {NODEMAILER_HOST,NODEMAILER_PORT,NODEMAILER_SEC,NODEMAILER_USER,NODEMAILER_PASSWORD,NODEMAILER_REJ} = process.env
    const nodemailTransporter = nodemailer.createTransport({
        host: NODEMAILER_HOST,
        port: NODEMAILER_PORT,
        secure: NODEMAILER_SEC,
        auth:{
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASSWORD
        },
        tls:{
            rejectUnauthorized: NODEMAILER_REJ
        }
    })

    nodemailTransporter.verify((error, success) =>{
        if(error) return new Error("An error occured: %s", error.message)
        else console.log("Status: %s. Connection %s.", success ? "OK": "--", success ? "operational" : "interrupted.")
    }) 

    const OPTIONS = {
        from: `${NODEMAILER_USER}`,
        to: `${recipient}`,
        subject: "Registration complete",
        html: `
        <h2>Welcome to KNOX</h2>
        <br>
        <p>We'd like to thank you for signing up for a KNOX membership.</p>
        <p>Many members are eagerly waiting for your to join the discussions!.</p>
        <a href="#">https://www.knox.it</a> 
        <br>
        <p>Sincerely,</p>
        <p>The KNOX team</p>`
    }

    const info = nodemailTransporter.sendMail(OPTIONS,(error, info) => {
        if(error) new Error("An error occured: %s", error.message)
        else console.log("Email was sent: %s \n preview: %s", info.messageId, nodemailer.getTestMessageUrl(info))
    })
}

export default emailDispatch