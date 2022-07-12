const {Schema,model} = require('mongoose');
const noteShema =  new Schema({
    title:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
    }
},{timestamps:true});
module.exports = model("Notes", noteShema);
