import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://anjali22ubc213:CiBARvk8HZz6oWYP@cluster0.8whsc.mongodb.net/',
      
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
