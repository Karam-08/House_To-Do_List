import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required'], minlength: 3, maxlength: 80},
    room: {type: String, enum: ['Kitchen', 'Living Room', 'Bathroom', 'Bedroom', 'Garage', 'Yard', 'Other'], default: 'Other'},
    priority: {type: String, enum: ['Low', 'Medium', 'High'], defualt: 'Low'},
    assignee: {type: String},
    dueDate: {type: Date},
    notes: {type: String, maxlength: 500},
    completed: {type: Boolean, default: false}
}, {timestamps: true})

export default mongoose.models.Task || mongoose.model('Task', taskSchema)