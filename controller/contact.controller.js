const nodemailer = require('nodemailer');

module.exports.index = (req, res) => {
   res.render('contact/contact', { title: 'Contact' });
}


module.exports.sendMail = (req, res, next) => {
    const transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: process.env.USER,
        to: req.body.email,
        subject: 'Test Nodemailer',
        text: 'You recieved message from ' + req.body.email,
        html: '<p>You have got a new message</b><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Username:' + req.body.message + '</li></ul>'
    }
    transporter.sendMail(mainOptions, (err, info)=>{
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
}