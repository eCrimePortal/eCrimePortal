require("dotenv").config();
const express = require("express");
var mailer=require('../models/mailer');
var db=require('../models/donations');
const bodyParser = require("body-parser");
const cors = require("cors");
const {initPayment, responsePayment} = require("../paytm/services/index");
var router = express.Router();
router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/donate", async (req, res) => {
    res.render("donate/donate", {path: req.originalUrl});
  });
  router.get("/donate/status", async (req, res) => {
    res.render("donate/donationcheck", {path: req.originalUrl});
  });
  router.post("/donation/record", async (req, res) => {
    res.render("donate/status", {path: req.originalUrl, times: await db.find({ email: req.body.email })});
  });  
  router.post("/oncedonate", (req, res) => {
    initPayment(req.body.amount).then(
        success => {
          const donordata = new db ({
            "orderid": success.ORDER_ID,
            "email": req.body.email,
            "name": req.body.name,
            "lname": req.body.surname,
            "address": req.body.address,
            "address2": req.body.address2,
            "region": req.body.region,
            "country": req.body.country,
            "state": req.body.city_state,
            "city": req.body.city,
            "zip": req.body.zip,
            "message": req.body.message,
          })
          donordata.save(function (error, document) {
            if (error) console.error(error)
          });
          res.render("donate/paytm.ejs", {
            resultData: success,
            paytmFinalUrl: process.env.PAYTM_FINAL_URL
        });
        },
        error => {
            res.send(error);
        }
    );
  });
  
  router.post("/success", async (req, res) => {
    responsePayment(req.body).then(
       async success => {
          console.log(success)
          const dda = await db.findOne({ orderid: success.ORDERID })
          dda.orderid = success.ORDERID,
          dda.amount = success.TXNAMOUNT,
          dda.txnid = success.TXN_ID,
          dda.txndate = success.TXNDATE,
          dda.status = success.STATUS,
          dda.gateway = success.GATEWAYNAME,
          dda.mode = success.PAYMENTMODE
          const dep = await  dda.save()
            var successmail={
              from: `eCrimePortal <${process.env.emailID}>`,
              to: dep.email,
              subject: `Thank You ${dep.name}!`,
              html: `Dear ${dep.name},<br><br>I feel so delighted to be the one to thank you for your INR ${success.TXNAMOUNT} one-time gift to a world more secure.<br><br>When you browse the eCrimePortal next, we hope you will feel like it belongs to you.<br><br>Thank you for giving the eCrimePortal shape, and purpose, and momentum. Thank you for fitting us into your life.<br><br>With immense gratitude,<br><br>Akshit Kumar<br>Director, eCrimePortal<br><br>For your records: Your donation, ID ${success.ORDERID}, on ${success.TXNDATE} was INR ${success.TXNAMOUNT}.<br>This letter may serve as a record of your donation. No goods or services were provided, in whole or in part, for this contribution.<br><br>You have received this E-Mail because you entered it when you initiated the donation process.`
            };
            var failmail={
              from: `eCrimePortal <${process.env.emailID}>`,
              to: dep.email,
              subject: 'Transaction Failure!',
              html: `Dear ${dep.name},<br><br>This E-Mail is to inform you that the transaction, of INR ${dep.amount}, you initaited towards eCrimePortal has failed.`
            };          
            if (success.STATUS === "TXN_SUCCESS") {
            mailer.send(successmail,(err,data)=>{
              if(err)
                console.log(err);
            }); 
          } else {
            mailer.send(failmail,(err,data)=>{
              if(err)
                console.log(err);
            }); 
          }
            res.render("donate/donationsuccess.ejs", {resultData: "true", ret: success, rer: dep, path: req.originalUrl});
        },
        error => {
            res.send(error);
        }
      );
  });
module.exports = router;