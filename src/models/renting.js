const mongoose = require('mongoose');
const {Schema,model}= mongoose;

const rentingShema = new Schema ({
    item:{
        type:String,
        require:true
    },
    user:{
        type:string,
        require:true
    },
    amount:{
        type:Number,
        require:true

    }
   
},{timestamps:true});
module.exports = model("Renting", rentingShema);