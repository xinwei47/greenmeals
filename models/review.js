import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    recipeId: Number,
    rating: Number,
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Review', reviewSchema);