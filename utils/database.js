import mongoose from 'mongoose';

let isConnected = false;
let dbHandle;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> MongoDB is already connected');
    return;
  }

  try {
    dbHandle = await mongoose.connect(process.env.MONGODB_URI, {
      // dbName: process.env.MONGODB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('=> MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

const disconnectFromDB = async () => {
  if (!isConnected) {
    console.log('=> MongoDB is not connected');
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('=> MongoDB disconnected');
  } catch (error) {
    console.log(error);
  }
};
