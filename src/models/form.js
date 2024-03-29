const {Schema,model} = require('mongoose');
const formShema =  new Schema({
    date:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    service: {
        type: String,
        required:true
    }
},{timestamps:true});
module.exports = model("Forms", formShema);
