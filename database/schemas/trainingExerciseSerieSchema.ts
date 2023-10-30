import mongoose from "mongoose";

export interface ITrainingExerciseSerieDocument extends mongoose.Document {
    trainingRowId: string;
    exerciseId: string;
    supposedRepetitions: number;
    actualRepetitions: number;
    supposedWeight: number;
    actualWeight: number;
    status: string;
}

const trainingExerciseSerieSchema: mongoose.Schema<ITrainingExerciseSerieDocument> = new mongoose.Schema({
    trainingRowId: { type: String, unique: false, required: true },
    exerciseId: { type: String, unique: false, required: true },
    supposedRepetitions: { type: Number, unique: false, required: true },
    actualRepetitions: { type: Number, unique: false, required: true },
    supposedWeight: { type: Number, unique: false, required: true },
    actualWeight: { type: Number, unique: false, required: true },
    status: { type: String, unique: false, required: true }
});

export const TrainingExerciseSerieModel = mongoose.model<ITrainingExerciseSerieDocument>('TrainingExerciseSerie', trainingExerciseSerieSchema);