"use strict";

var nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user: process.env.emailID, // Address to send the Emails from
        pass: process.env.password
	}
});

exports.send = (mailOptions,cb)=>
{
	transporter.sendMail(mailOptions,(err,info)=>{
		if(err)
			cb(err);
		cb(null,info);
	});
}