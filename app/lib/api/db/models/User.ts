import mongoose, { Schema } from "mongoose";

export type User = {
    ionUsername: string
    email: string
    firstName: string
    lastName: string
    gradYear: number
    isOfficer: boolean
    onEmailList: boolean
}

const UserSchema = new Schema<User>({
    ionUsername: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gradYear: { type: Number, required: true, min: 2000, max: 3000 },
    isOfficer: { type: Boolean, default: false },
    onEmailList: { type: Boolean, default: false }
});

export const UserModel: mongoose.Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);
