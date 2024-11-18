import mongoose from "mongoose";
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/usersDB');
        console.log('Connected to database');
        return mongoose.connection;
    }
    catch (error) {
        console.error('Error connecting to database: ', error);
        throw new Error('Error connecting to database');
    }
};
export default db;
