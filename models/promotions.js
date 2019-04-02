const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var promotionSchema = new Schema({
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
    label:  {
        type: String,
        required: true
    },
    price:  {
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

var Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;