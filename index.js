const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
const port =  8080
const myAccount = {
    user: process.env.LOGIN , 
    pass: process.env.PASSWORD
}
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myAccount.user, 
        pass: myAccount.pass, 
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${req.body.email}`, // sender address
        to: "mr.baranok@mail.ru", // list of receivers
        subject: `Hello it is ${req.body.name}`, // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>${req.body.message}${req.body.email}</b>`, // html body
    });
    res.send(req.body)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
