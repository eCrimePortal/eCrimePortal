require("dotenv").config();
const express = require("express");
var request = require('request');
var router = express.Router();

router.get("/new", async (req, res) => {
  res.render("request/new", {path: req.originalUrl});
});
router.post("/new", async (req, res) => {
  var options = {
    'method': 'POST',
    'url': 'https://api.ecrime.xyz/request/',
    'headers': {
      'Authorization': `Basic ${process.env.apikey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': '__cfduid=da076f4cee71a484d10f73a7c4fc3bb171596301569'
    },
    form: {
      'name': req.body.fullname,
      'email': req.body.email,
      'subject': req.body.subject,
      'message': req.body.message
    }
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  if (response.statusCode === 201) {
    res.render('request/success', {ret: JSON.parse(response.body), path: req.originalUrl})
  } else {
    res.render('request/err', {path:req.originalUrl, errc: response.body})
}
});
});
router.get("/status", async (req, res) => {
  res.render("request/status", {path: req.originalUrl});
});
  router.post("/status", async (req, res) => {
    var options = {
      'method': 'GET',
      'url': 'https://api.ecrime.xyz/request/',
      'headers': {
        'Authorization': `Basic ${process.env.apikey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': '__cfduid=da076f4cee71a484d10f73a7c4fc3bb171596301569'
      },
      form: {
        'uid': req.body.uid
      }
    };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    if (response.statusCode === 200) {
      res.render('request/success', {ret: JSON.parse(response.body), path: req.originalUrl})
    } else {
      if (response.statusCode === 204) {
        res.render('request/err', {path:req.originalUrl, errc: "Please check the UID you entered!"})
      } else {
      res.render('request/err', {path:req.originalUrl, errc: "Something went wrong!"})
    }
  }
  });
  });
  router.get("/delete", async (req, res) => {
    res.render("request/delete", {path: req.originalUrl});
  });
    router.post("/delete", async (req, res) => {
      var options = {
        'method': 'DELETE',
        'url': 'https://api.ecrime.xyz/request/',
        'headers': {
          'Authorization': `Basic ${process.env.apikey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': '__cfduid=da076f4cee71a484d10f73a7c4fc3bb171596301569'
        },
        form: {
          'uid': req.body.uid
        }
      };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      if (response.statusCode === 200) {
        res.render('request/deldone', {ret: JSON.parse(response.body), path: req.originalUrl})
      } else {
        if (response.statusCode === 204) {
          res.render('request/err', {path:req.originalUrl, errc: "Please check the UID you entered!"})
        } else {
        res.render('request/err', {path:req.originalUrl, errc: "Something went wrong!"})
      }
    }
    });
    });
module.exports = router;
