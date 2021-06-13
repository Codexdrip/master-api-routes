const path = require('path');
const express = require('express');
const router = express.Router();
const cors = require("cors");
const transporter = require('./config');
//const dotenv = require('dotenv');
//dotenv.config();


router.post('/send', cors(), (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email, // sender address
      to: [req.body.email], // list of receivers
      subject: req.body.subject, // Subject line
      attachments: [
        {   // file on disk as an attachment
          filename: 'Fam.zip',
          path: './routes/reunion/Fam.zip' // stream this file
        }
      ],
      html: `
      <p>Thanks for requesting the reunion album. Just download the attachment in the email, open it, and you should see the pictures.</p>
      <p>If you have any pics you want me to add, please email them codedotrunners@gmail.com.
      <h3>Thanks!</h3>
      `
    };

    const mailOptions2 = {
      from: req.body.email, // sender address
      to: [process.env.email], // list of receivers
      subject: 'Fam Reunion', // Subject line
      html: `
      <p>Someone downloaded file.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      `
    };
    // Sends email to me
    transporter.sendMail(mailOptions2, function (err, info) {
      if (err) {
        respon = {
          success: false,
          message: '[12]Something went wrong. Try again later ' + err,
        }
        console.log(respon)  
          //check: process.env.email + " " + process.env.password
        
      } else {
       respon = {
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        }
        console.log(respon)
      }
    });
    // Send email to user
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: '[1]Something went wrong. Try again later ' + err,
          //check: process.env.email + " " + process.env.password
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: '[2]Something went wrong. Try again later ' + mailOptions.subject
    });
  }
});

module.exports = router;

