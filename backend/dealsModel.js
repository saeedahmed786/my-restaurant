const mongoose = require('mongoose');


const dealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
       required: true,
       type: String 
   },
   
    priceBefore: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    off: {
        type: Number,
        required: true
    },
   
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }
   
}, {timestamps: true}
);

const dealModel = mongoose.model("Deal", dealSchema);
module.exports = dealModel;