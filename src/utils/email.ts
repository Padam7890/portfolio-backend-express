import nodemailer from 'nodemailer';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});



const sendEmail = async (option: any): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: "admin@padamthapa.com.np",
      to: "padamthapamoho@gmail.com",
      subject: option.subject,
      html: option.html,
    };
    

    try {
      logger.info(`Sending mail to - ${emailOptions.to}`);

      const info = await transporter.sendMail(emailOptions);
      logger.info(`Email sent: ${info.response}`);
      return "Email Sent Successfully";
    } catch (error) {
      logger.error(`Error sending mail - ${error}`);
      throw new Error("Error sending email");
    }
  } catch (error) {
    logger.error(`Error creating transporter - ${error}`);
    throw new Error("Error creating transporter");
  }
};

export default sendEmail;
