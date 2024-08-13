import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    let mailOptions = {
      from: process.env.USER,
      to: to,
      subject: subject,
      text: text,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (err) {
    console.error("Error sending email", err);
  }
};

export default sendEmail;
