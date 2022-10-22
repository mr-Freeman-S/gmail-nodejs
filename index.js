const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const myAccount = {
  user: process.env.LOGIN,
  pass: process.env.PASSWORD,
};
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myAccount.user,
    pass: myAccount.pass,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendMessage", async (req, res) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `mr.baranok.slava@gmail.com`, // sender address
    to: "mr.baranok.slava@gmail.com", // list of receivers
    subject: `FROM PORTFOLIO`, // Subject line
    //text: "Hello world?", // plain text body
    html: `<div>
            <h1>My name is ${req.body.name}</h1>
            <h2>My Email ${req.body.email}</h2>
            <p>${req.body.message}</p>
        </div>`, // html body
  });
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
