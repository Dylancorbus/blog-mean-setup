var nodemailer = require('nodemailer');
const username = process.env.EMAIL;
const password = process.env.EMAILPASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: username,
        pass: password
    }
});

var mailOptions = {
    from: username
};

//body of request
module.exports = (data) => {
    //set the text to the message
    mailOptions.html = JSON.stringify(data);
    //set to
    mailOptions.to = 'dylancorbus@outlook.com';
    //set subject
    mailOptions.subject = 'New contact request';
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.debug('Email sent: ' + info.response);
        }
    });
}