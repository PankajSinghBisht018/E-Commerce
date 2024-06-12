import { connect, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

export const connectDB = async () => {
    try {
        await connect("mongodb://localhost:27017/snapmart");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

export const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


export const User = model("User", userSchema);

