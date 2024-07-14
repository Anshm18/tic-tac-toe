const { Socket } = require('engine.io');
const express = require('express');
const app = express();
const {Server} = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expserver = app.listen(3000,()=>{
    console.log("server is runing on port 3000");
})

const io = new Server(expserver);
let users=[];
let cnt = 0;

io.on('connection',socket =>{
    console.log('player is playing');
    users.push(socket.id)

    io.emit('users',socket.id)

    socket.broadcast.emit('activity','O')
    socket.on('event',(i)=>{
        if(socket.id === users[0]){
            io.emit('OeventOccured',i);
        }else{
            io.emit('XeventOccured',i);
        }
    })
    socket.on('disconnect',()=>{
        users = [];
        socket.emit('disconnection');
        console.log('player leave');
    })
})