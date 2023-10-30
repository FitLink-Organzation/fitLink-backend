import mongoose from 'mongoose';

export interface ITrainingDocument extends mongoose.Document {
    dayId: string;
    exerciseId: string;
    order: number;
    status: string;
}

const trainingSchema: mongoose.Schema<ITrainingDocument> = new mongoose.Schema({
    dayId: { type: String, unique: false, required: true },
    exerciseId: { type: String, unique: false, required: true },
    order: { type: Number, unique: false, required: true },
    status: { type: String, unique: false, required: true }
});

export const TrainingModel = mongoose.model<ITrainingDocument>('Training', trainingSchema);