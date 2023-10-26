import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    userName: string;
    passwordHash: string;
}

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    firstName: { type: String, unique: false, required: true },
    lastName: { type: String, unique: false, required: true },
    userName: { type: String, unique: true, required: true },
    passwordHash: { type: String, unique: false, required: true }
})

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);