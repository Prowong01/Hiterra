import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
    },
    date: {
        type: Date,
    },
    cycle: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly'],
    },
    status: {
        type: String,
        enum: ['Created', 'In Progress', 'Completed'],
    },
    tag: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Task = models?.Task || model("Task", TaskSchema);

export default Task;
