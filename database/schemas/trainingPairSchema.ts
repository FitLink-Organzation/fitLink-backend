import mongoose from "mongoose";

export interface ITrainingPairDocument extends mongoose.Document {
    coachId: string;
    traineeId: string;
    pairCode: string;
    activationDate: Date;
}

const trainingPairSchema: mongoose.Schema<ITrainingPairDocument> = new mongoose.Schema({
    coachId: { type: String, unique: false, required: true },
    traineeId: { type: String, unique: false, required: true },
    pairCode: { type: String, unique: true, required: true },
    activationDate: { type: Date, unique: false, required: false}
})

export const TrainingPairModel = mongoose.model<ITrainingPairDocument>('TrainingPair', trainingPairSchema);