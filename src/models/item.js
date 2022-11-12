const mongoose = require('mongoose');
const {Schema,model}= mongoose;

const itemShema = new Schema({
    name:{
        type: String,
        require:true
    },
    time:{
        type: String,
        require:true
    },
    price:{
        type: String,
        require:true
    },
    type:{
        type: String,
        enum: ['KITCHENWARE', 'ENTERTAINMENT'],
        require:true
    },
    stock:{
        type: Number,
        require:true
    },
    url:{
        type: String
    }
},{timestamps:true});
module.exports = model("Item", itemShema);