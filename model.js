const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const formSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
      data: Buffer,
      contentType: String
    }
    // image: {type: String, data: buffer},
});

var schema = mongoose.model('model', formSchema);
module.exports = schema;
