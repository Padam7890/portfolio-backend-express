const user = require("../model/user");
const { apiresponse } = require("../utils/apiresponse");
const sendEmail = require("../utils/email");

const sendPasswordResetEmail = async (email, emailHTML, getuser, response) => {
    try {
      await sendEmail({
        to: email,
        subject: "Password Reset",
        html: emailHTML,
      });
      return response.json(
        apiresponse(200, "Password reset link sent to your email")
      );
    } catch (error) {
      try {
        await user.update({
          where: { id: getuser.id }, 
          data: {
            passwordResetToken: null,
            passwordResetTokenExpire: null,
          },
        });
        console.log(error);

        return response.json(
          apiresponse(500, "Error sending email due to this error", error)

        );
      } catch (error) {
        console.error("Error updating user record:", error);
        return response.json(
          apiresponse(500, "Error updating user record", error)
        );
      }
    }
  };
  
  module.exports = { sendPasswordResetEmail };
  