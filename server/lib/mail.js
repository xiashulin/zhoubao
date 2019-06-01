const nodemailer = require('nodemailer')

async function send(fromUser, fromPwd, fromAddr, toAddr, subject, text, html) {

    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        service: 'QQex',
        auth: {
            user: fromUser, // generated ethereal user
            pass: fromPwd // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: fromAddr,
        to: toAddr,
        subject,
        text,
        encoding:'utf-8',
        html
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports.send = send;