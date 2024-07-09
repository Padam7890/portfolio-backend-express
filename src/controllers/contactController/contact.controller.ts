import asyncHandler from "../../middleware/asyncHandler";

import sendEmail from "../../utils/email";

const getContact = asyncHandler(async(req, res) => {
     try {
        
   const {fullName, emailAddress, message} = req.body

   const emailHTML = `
   <h2>New Message Recieved</h2>
   <p><strong>Full Name:</strong> ${fullName}</p>
   <p><strong>Email Address:</strong> ${emailAddress}</p>
   <p><strong>Message:</strong> ${message}</p>
   `
    try {
      // Send mail successfully
      await sendEmail({
        from:emailAddress,
        subject: "New Message Recieved",
        html: emailHTML,
      });
      return res.status(200).json({
        msg:"Thank you for your message"
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Failed to send email" });
    }
        
     } catch (error) {
         console.log(error)
         return res.status(500).json({ msg: "Server Error" })
        
     }

})

export default getContact;