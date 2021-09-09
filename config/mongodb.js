// mongoose connection
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
}
export default connectDB;
