import mongoose from 'mongoose';
const { Schema } = mongoose;

const recipeSchema = new Schema({
    recipeId: Number,
    image: String,
    title: String,
})

export default mongoose.model('Recipe', recipeSchema);