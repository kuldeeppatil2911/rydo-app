const nodemailer = require('nodemailer');

exports.sendEmergencyAlert = async (user, booking) => {
  if (!user.emergencyAlertsEnabled || !user.emergencyContact?.email) {
    console.log("Emergency alerts disabled or no email provided.");
    return;
  }

  // Check if Nodemailer is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Nodemailer credentials not found in .env. Mocking emergency alert:");
    console.log(`[MOCK ALERT] Email to: ${user.emergencyContact.email}`);
    console.log(`[MOCK ALERT] Subject: EMERGENCY RIDE ALERT for ${user.name}`);
    console.log(`[MOCK ALERT] Ride Details - Pickup: ${booking.pickup}, Dropoff: ${booking.dropoff}, OTP: ${booking.otp}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.emergencyContact.email,
      subject: `RIDE ALERT: ${user.name} has started a ride`,
      text: `Hello ${user.emergencyContact.name || 'Emergency Contact'},\n\n` +
            `${user.name} has booked a ride via Rydo.\n` +
            `Pickup: ${booking.pickup}\n` +
            `Dropoff: ${booking.dropoff}\n` +
            `OTP for ride: ${booking.otp}\n` +
            `Estimated Fare: ${booking.fare}\n\n` +
            `Stay safe!`
    };

    await transporter.sendMail(mailOptions);
    console.log('Emergency alert sent via Email.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
