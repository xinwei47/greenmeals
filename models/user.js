import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
})

// Instead of adding the password directly to the schema, add on the password package to the userSchema
// Passport-Local-Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
// Passport-Local-Mongoose also add some static methods to the model (i.e. User.authenticate(), User.register())
userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);