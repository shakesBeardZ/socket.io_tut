const app = require('express')();
const server  = require('http').Server(app);
const io =  require('socket.io')(server);
const port = 6060;

server.listen(port , () => {
    console.log(`server listening on ${port}`);
})

app.get('*', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})


const tech = io.of('/tech')
tech.on("connection", (socket) => {
    
    socket.on('join' , (data)=> {
        socket.join(data.room);
        tech.in(data.room).emit( 'message',`New user has joined the room ${data.room}`);
    })

    socket.on("message" , (data)=> {
        tech.in(data.room).emit('message',data.msg);
    })

    socket.on('disconnect' , () => {
        console.log('user disconnected ');
        tech.emit('message' , 'user disconnected ')
    })
})


