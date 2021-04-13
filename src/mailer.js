const sgMail = require("@sendgrid/mail").setApiKey(
  process.env.SENDGRID_API_KEY
);

exports.sendMail = (to, subject, message) => {
  const msg = {
    to,
    from: "erestaurant321@gmail.com",
    subject,
    // text: message,
    html: `<p>${message}</p>`,
  };
  return sgMail.send(msg);
};
