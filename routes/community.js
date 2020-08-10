require("dotenv").config();
var sendotp=require('../models/sendotp');
var generate=require('../models/generate');
var otp=require('../controllers/otp');
const express = require("express");
var db=require('../models/community');
var router = express.Router();

router.get("/new", async (req, res) => {
  res.render("community/new", {path: req.originalUrl});
});

router.post("/new", async (req, res) => {
  const cdata = new db ({
    "name": req.body.email,
    "email": req.body.name,
    "address": req.body.address,
    "address2": req.body.address2,
    "country": req.body.country,
    "state": req.body.state,
    "zip": req.body.zip,
    "message": req.body.extra,
    "subdomain": req.body.csdomain,
    "cemail": req.body.cemail,
    "formationdate": Math.floor(new Date() / 1000)
  })
  cdata.save(function (error, document) {
    if (error) console.error(error)
    console.log("done!")
  });
  var x=generate.generateOtp();
  var mailOptions={
    from: process.env.emailID,
    to: req.body.email,
    subject: 'Email Verification',
    html: 'Your OTP for Email Verification is <b>'+x+'</b>'
  };
  sendotp.send(mailOptions,(err,data)=>{
    if(err)
      res.send(err);
    else
    {
      otp.save(req.body.email,x,(error,dataa)=>{
        if(error)
          res.send(error);
        res.render('other/verifyOtp.ejs',{email:req.body.email, path: req.originalUrl});
      });
    }
  });
	});
	router.post('/verify', async (req,res)=>{
		otp.match(req.body.email,req.body.otp, async (err,data)=>{
			if(err)
				res.send(err);
			if(data==undefined)
				res.send("OTP Expired. Please try again!");
			else if(data==true)
			{
				otp.remove(req.body.email, async (error,dataa)=>{
					if(error)
						res.send(error);
					else
          res.send("Your request has been submitted!");
          const fin = await db.findOne({ email: req.body.email })
          fin.otpstat = "verified"
          const st = await fin.save()
          console.log(st)
				})
			}
			else {
        res.send("Failure. Kindly check again.");
        const e = await db.findOne({  })
        const deleted = await e.remove()
}
})
});
router.get("/india", async (req, res) => {
    res.render("community/india", {path: req.originalUrl});
  });
router.get("/report", async (req, res) => {
    res.render("community/report", {path: req.originalUrl});
  });
router.get("/*", async (req, res) => {
    res.render("community/404", {path: req.originalUrl});
  });
module.exports = router;
