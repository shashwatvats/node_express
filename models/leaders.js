const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leadersSchema = new Schema({
    name:  {
        type: String,
        min: 1,
        max: 5,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    designation:  {
        type: String,
        required: true
    },
    abbr:  {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    featured:  {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('leader', leadersSchema);

module.exports = Leaders;