const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type:String,
        required: true,
        default: "0"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Post = mongoose.model('post',PostSchema);