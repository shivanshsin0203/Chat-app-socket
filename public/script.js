var socket=io();

var imsg=document.getElementById('imsg');
var btn=document.getElementById('btn');
var msglist=document.getElementById('msglist');
btn.onclick=function(){
  socket.emit('msg_send',{
    msg:imsg.value
  });
  imsg.innerText='';
}
socket.on('msg_rvd',(data)=>{
    let limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msglist.appendChild(limsg);
})