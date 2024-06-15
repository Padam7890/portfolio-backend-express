const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  positions: { type: [String], required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  passwordChangedAt: {
    type: Date,
    default: null,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetTokenExpire: {
    type: Date,
    default: null,
  },

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
  title: { type: String, required: true },
  percentage: { type: Number, required: true },
});

// Tags Schema
const TagsSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Portfolio Schema
const PortfolioSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
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
const User = mongoose.model("User", UserSchema);
const Skill = mongoose.model("Skill", SkillsSchema);
const Testimonial = mongoose.model("Testimonial", TestimonialsSchema);
const Client = mongoose.model("Client", ClientsSchema);
const EducationExperience = mongoose.model(
  "EducationExperience",
  EducationExperienceSchema
);
const SkillsPercentage = mongoose.model(
  "SkillsPercentage",
  SkillsPercentageSchema
);
const Tag = mongoose.model("Tag", TagsSchema);
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
const Blog = mongoose.model("Blog", BlogSchema);
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = {
  User,
  Skill,
  Testimonial,
  Client,
  EducationExperience,
  SkillsPercentage,
  Tag,
  Portfolio,
  Blog,
  Contact,
};
