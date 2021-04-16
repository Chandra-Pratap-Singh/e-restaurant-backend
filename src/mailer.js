const transporter = require("nodemailer").createTransport({
  service: "gmail",
  auth: {
    user: "erestaurant321@gmail.com",
    pass: process.env.mailPassword,
  },
});

exports.sendMail = (to, subject, message) => {
  var mailOptions = {
    from: "erestaurant321@gmail.com",
    to,
    subject,
    html: `<p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
};
