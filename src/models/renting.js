const mongoose = require('mongoose');
const {Schema,model}= mongoose;

const rentingShema = new Schema ({
    namePerson:{
        type:String,
        require:true
    },
    item:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true

    },
    cedula:{
        type:String,
        require:true
    }
    

},{timestamps:true});
module.exports = model("Renting", rentingShema);