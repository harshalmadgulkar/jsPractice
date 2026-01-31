import mongoose from "mongoose";

function connectDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

export default connectDB;