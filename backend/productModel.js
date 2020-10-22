const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
       required: true,
       type: String 
   },
   
    price: {
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
    },
    category: {
        type: String,
        required: true
        
    }
    
   
}, {timestamps: true}
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;