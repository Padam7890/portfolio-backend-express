import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  positions: string[];
  email: string;
  phone: string;
  password: string;
  passwordChangedAt?: Date | null;
  passwordResetToken?: string | null;
  passwordResetTokenExpire?: Date | null;
  birthday: Date;
  location: string;
  aboutMe: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  profileImage: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  positions: { type: [String], required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  passwordChangedAt: { type: Date, default: null },
  passwordResetToken: { type: String, default: null },
  passwordResetTokenExpire: { type: Date, default: null },
  birthday: { type: Date, required: true },
  location: { type: String, required: true },
  aboutMe: { type: String, required: true },
  facebookUrl: { type: String },
  instagramUrl: { type: String },
  linkedinUrl: { type: String },
  profileImage: { type: String, required: true },
});
// Skills Schema
const SkillsSchema = new Schema({
  title: { type: String, required: true },
  descriptions: { type: String, required: true },
  image: { type: String, required: true },
});

// Testimonials Schema
const TestimonialsSchema = new Schema({
  name: { type: String, required: true },
  descriptions: { type: String, required: true },
  photo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Clients Schema
const ClientsSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
});

// Education/Experience Schema
const EducationExperienceSchema = new Schema({
  title: { type: String, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["education", "experience"], required: true },
});

// Skills Percentage Schema
const SkillsPercentageSchema = new Schema({
  title: { type: String, required: true, unique:true },
  percentage: { type: Number, required: true },
  portfolios: [{
    type: Schema.Types.ObjectId,
    ref: 'Portfolio'
  }]
});


interface ICategory extends Document {
  name: string;
  portfolios: mongoose.Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  portfolios: [{
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  }],
});


// Portfolio Schema
const PortfolioSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});


// Blog Schema
const BlogSchema = new Schema({
  categoryName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Contact Schema
const ContactSchema = new Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Models
export const User = model<IUser>('User', UserSchema);
export const Skill = mongoose.model("Skill", SkillsSchema);
export const Testimonial = mongoose.model("Testimonial", TestimonialsSchema);
export const Client = mongoose.model("Client", ClientsSchema);
export const EducationExperience = mongoose.model(
  "EducationExperience",
  EducationExperienceSchema
);
export const SkillsPercentage = mongoose.model(
  "SkillsPercentage",
  SkillsPercentageSchema
);

export const Category = mongoose.model("Category", categorySchema);
export const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export const Blog = mongoose.model("Blog", BlogSchema);
export const Contact = mongoose.model("Contact", ContactSchema);



