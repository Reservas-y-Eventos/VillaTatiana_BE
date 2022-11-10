const mongoose = require('mongoose');
const {Schema,model}= mongoose;

const rentingShema = new Schema ({
    name:{
        type:String,
        require:true
    },
    dni:{
        type: String,
        require:true
    },
    amount:{
        type:Number,
        require:true

    }
   
},{timestamps:true});
module.exports = model("Renting", rentingShema);