const app = require('express')();
const server  = require('http').Server(app);
const io =  require('socket.io')(server);
const port = 6060

server.listen(port , () => {
    console.log(`server listening on ${port}`);
})

app.get('*', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

