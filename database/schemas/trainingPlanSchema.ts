import mongoose from "mongoose";

export interface ITrainingPlanDocument extends mongoose.Document {
    pairId: string;
    activationDate: Date;
    name: string;
    status: string;
    code: string;
}

const trainingPlanSchema: mongoose.Schema<ITrainingPlanDocument> = new mongoose.Schema({
    pairId: { type: String, unique: false, required: true },
    activationDate: { type: Date, unique: false, required: false},
    name: { type: String, unique: false, required: true },
    status: { type: String, unique: false, required: true },
    code: { type: String, unique: true, required: true }
})

export const TrainingPlanModel = mongoose.model<ITrainingPlanDocument>('TrainingPlan', trainingPlanSchema);