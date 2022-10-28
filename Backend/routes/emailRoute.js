import express from 'express';
import nodemailer from 'nodemailer';


const emailRouter = new express.Router();

emailRouter.post('/submitquery',(req,res)=>{

    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'amriteshgupta12z@gmail.com',
            pass : 'rekjhzwofdnnzlkd'
        }
    })

    const mailOptions = {
        to : '19ucc142@lnmiit.ac.in',
        from : req.body.from,
        subject : 'BTP Query',
        text : req.body.text
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            console.log('Email sent' + info.response);
            res.status(201).send('Email sent');
        }
    })
})

export default emailRouter;