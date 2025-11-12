// CORE
import mongoose from "mongoose";

export const connectingDb = async () => {
    const NODE_ENV = process.env.NODE_ENV;
    try {
        let DB_CONNECTION_STRING = "";
        if (NODE_ENV === "production") {
            DB_CONNECTION_STRING = process.env.MONGODB_URI!;
        }
        if (NODE_ENV === "development") {
            DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI!;
        }

        const connectionRes = await mongoose.connect(DB_CONNECTION_STRING);
        console.log("DB connection success: ", connectionRes.connection.host);
    } catch (err) {
        console.error("Error connecting to the database: ", err);
        process.exit(1);
    }
};
