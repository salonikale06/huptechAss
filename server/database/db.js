import mongoose from "mongoose";

const db = async () => {
    try {
        const url = process.env.URL;
        await mongoose.connect(url);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error while connecting database");
    }
}

export default db;