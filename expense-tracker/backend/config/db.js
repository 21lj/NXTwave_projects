import mongoose from 'mongoose';

const connectDB = async () => {
  const url = process.env.MONGO_URI

  try {
    await mongoose.connect(url);
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
