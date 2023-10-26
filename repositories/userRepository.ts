import { IUserDocument } from "../database/schemas/userSchema";
import { UserModel } from "../database/schemas/userSchema";
import User from "../models/user";

export default class UserRepository {
    public async createUser(user: User): Promise<void> {
        await UserModel.create(user);
    }

    public async getByUserName(userName: string): Promise<IUserDocument | null> {
        return await UserModel.findOne({ userName: userName });
    }

    public async getByUserId(userId: string): Promise<IUserDocument | null> {
        return await UserModel.findOne({ userId: userId });
    }
}