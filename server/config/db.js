import mongoose from "mongoose";

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
  );
};

export default connectDB;
