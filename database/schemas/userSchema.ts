import mongoose from "mongoose";

export interface IUserDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    passwordHash: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    activationDate: Date;
}

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    firstName: { type: String, unique: false, required: true },
    lastName: { type: String, unique: false, required: true },
    passwordHash: { type: String, unique: false, required: true },
    accessToken: { type: String, unique: false, required: false },
    refreshToken: { type: String, unique: false, required: false },
    email: { type: String, unique: true, required: true },
    activationDate: { type: Date, unique: false, required: false}
})

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);