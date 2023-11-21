import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const mailTransport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    secure:true,
    auth:{
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.EMAIL_PASSWORD,
    }
})

export const sendMail = async (userEmail,autoCode,amountTotal) =>{
    try{
        await mailTransport.sendMail({
            from:  `e-Commerce CoderHouse <${process.env.MAIL_ADDRESS}>`,
            to: userEmail,
            subject: 'e-Commecer Coder comprobante de compra',
            html:
            `<div>
            <h1>Gracias por tu compra!</h1>
            <h2> A continuación verás los detalles de tu compra:</h2>
            <div>
            <h3>Código de compra: ${autoCode}</h3>
            <h3>Total de la compra: U$D ${amountTotal}</h3>
            <h3>Comprador: ${userEmail}</h3>
            
            </div>
            </div>
            `
        })
    }
    catch(error){
        throw error
    }
} 