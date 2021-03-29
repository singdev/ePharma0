module.exports = function sendEmail(content, dst) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'nho.notification@gmail.com',
          pass: 'ABClotus'
      }
  });
  var mailOptions = {
      from: 'Test<nho.notification@gmail.com>',
      to: dst,
      subject: "Objet du mail",
      html: content
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}