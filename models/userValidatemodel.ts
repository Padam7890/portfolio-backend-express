import Joi, { ValidationError } from "joi";

interface UserModel {
  name: string;
  positions: string;
  email: string;
  phone: string;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetTokenExpire: Date;
  birthday: Date;
  location: string;
  aboutMe: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  profileImage: string;
}

function validateUserModel(data: UserModel): ValidationError | undefined {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    positions: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    passwordChangedAt: Joi.date().required(),
    passwordResetToken: Joi.string().required(),
    passwordResetTokenExpire: Joi.date().required(),
    birthday: Joi.date().required(),
    location: Joi.string().required(),
    aboutMe: Joi.string().required(),
    facebookUrl: Joi.string().required(),
    instagramUrl: Joi.string().required(),
    linkedinUrl: Joi.string().required(),
    profileImage: Joi.string().required(),
  });

  const { error } = userSchema.validate(data);
  return error;
}

export default validateUserModel;
