// import * as crypto from "crypto";
// import { User } from "../models/models";

// const resetpasswordtoken = async (userId:number) => {
//   const resettoken = crypto.randomBytes(32).toString("hex");
//   const tokenhash = crypto
//     .createHash("sha256")
//     .update(resettoken)
//     .digest("hex");

//   try {
//     await User.update({
//       where: { id: userId },
//       data: {
//         passwordResetToken: tokenhash,
//         passwordResetTokenExpire: new Date(new Date().getTime() + 3600 * 1000),
//       },
//     });
    

//     return resettoken;
//   } catch (error) {
//     console.error("Error updating user record:", error);
//     throw new Error("Failed to generate reset token");
//   }
// };

// module.exports = resetpasswordtoken;
