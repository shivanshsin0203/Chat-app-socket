const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const connect=require('./config/database-config')
const app=express();
const chat=require('./models/chat')
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('a user connected '+socket.id);
    socket.on('join_room',(data)=>{
        console.log("joining room "+data.roomid)
        socket.join(data.roomid)
    })
    socket.on('msg_send',async (data)=>{
        console.log(data);
        await chat.create({
            user:data.user,
            content:data.msg,
            roomId:data.roomid
        });
        
        io.to(data.roomid).emit('msg_rvd',data)
    })
});
app.set('view engine', 'ejs');
app.use('/',express.static(__dirname+'/public'));
app.get('/chat/:roomid',async (req,res)=>{
    const msgs=await chat.find({});
    console.log(msgs)
    
    res.render('index',{
        name:'Shivansh',
        id:req.params.roomid,
        data:msgs
    })
})
server.listen(3000,async()=>{
    console.log('Server started at 3000');
    await connect();
    console.log("Database connected")
})