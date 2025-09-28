import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({    
    complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'issue',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }    
}, { timestamps: true });
const Rate = mongoose.model('Rate', rateSchema);
export default Rate;