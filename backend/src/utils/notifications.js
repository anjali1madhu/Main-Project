const nodemailer = require("nodemailer");

async function sendReminder(email, taskName, date) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: `Reminder: ${taskName}`,
    text: `This is a reminder for the task: ${taskName} scheduled on ${date}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${email}`);
  } catch (error) {
    console.error("Error sending reminder:", error);
  }
}

module.exports = { sendReminder };
