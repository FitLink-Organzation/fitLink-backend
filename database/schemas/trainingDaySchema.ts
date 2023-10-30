import mongoose from 'mongoose';

export interface ITrainingDayDocument extends mongoose.Document {
    trainingRowId: string;
    name: string;
    order: number;
    status: string;
    dayId: string;
    date: Date;
}

const trainingDaySchema: mongoose.Schema<ITrainingDayDocument> = new mongoose.Schema({
    trainingRowId: { type: String, unique: false, required: true },
    name: { type: String, unique: false, required: true },
    order: { type: Number, unique: false, required: true },
    status: { type: String, unique: false, required: true },
    dayId: { type: String, unique: false, required: true },
    date: { type: Date, unique: false, required: true }
});

export const TrainingDayModel = mongoose.model<ITrainingDayDocument>('TrainingDay', trainingDaySchema);