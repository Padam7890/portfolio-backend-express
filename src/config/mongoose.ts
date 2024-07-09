import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI as string;
    await mongoose.connect(db);
    console.log('MongoDB connected...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
