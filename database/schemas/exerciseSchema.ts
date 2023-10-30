import mongoose from "mongoose";

export interface IExerciseDocument extends mongoose.Document {
    name: string;
    description: string;
    muscleGroup: string;
    difficulty: string;
    videoUrl: string;
    imageUrl: string;
}

const exerciseSchema: mongoose.Schema<IExerciseDocument> = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, unique: false, required: true },
    muscleGroup: { type: String, unique: false, required: true },
    difficulty: { type: String, unique: false, required: true },
    videoUrl: { type: String, unique: false, required: true },
    imageUrl: { type: String, unique: false, required: true }
});

export const ExerciseModel = mongoose.model<IExerciseDocument>('Exercise', exerciseSchema);