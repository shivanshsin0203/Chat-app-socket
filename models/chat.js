const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    user:{
        type:String
    },
    content:{
        type:String
    },
    roomId:{
        type:String
    }
});
 const chat=mongoose.model('chat',chatSchema);

 module.exports=chat;