const nodemailer = require("nodemailer");

const sendMail = (email, message) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_MAIL,
    to: email,
    subject: "Password Reset Link From Nepal Bazzar",
    html: `
    <h1 style="font-size : 30px;text-align : center;font-weight : bold;">Nepal Bazzar</h1><br/>
    <h2 style="font-size : 20px;text-align : center;font-weight : bold;">Click Button To Reset Your Password.</h2><br/>
    <div style="display:flex;justify-content : center;width:100%;cursor:pointer;margin-left:50%;">
    <a href=${message} style="text-decoration:none;color:black;">
    <button 
   
    style="background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;">Click</button>
    </a>
    </div>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };
