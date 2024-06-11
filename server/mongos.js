import { connect, Schema, model } from "mongoose";

export const connectDB = async () => {
    try {
        await connect("mongodb://localhost:27017/snapmart", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

export const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export const User = model("User", userSchema);
