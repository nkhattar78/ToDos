const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    description: {
        type: String
    },
    owner: {
        type: String
    },
    priority: {
        type: String
    },
    comppletionStatus: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);