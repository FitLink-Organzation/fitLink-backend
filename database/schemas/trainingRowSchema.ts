import mongoose from 'mongoose';

export interface ITrainingRowDocument extends mongoose.Document {
    trainingPlanId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
}

const trainingRowSchema: mongoose.Schema<ITrainingRowDocument> = new mongoose.Schema({
    trainingPlanId: { type: String, unique: false, required: true },
    name: { type: String, unique: false, required: true },
    startDate: { type: Date, unique: false, required: true },
    endDate: { type: Date, unique: false, required: true },
    status: { type: String, unique: false, required: true }
})

export const TrainingRowModel = mongoose.model<ITrainingRowDocument>('TrainingRow', trainingRowSchema);