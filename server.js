const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
/* const http = require('http').createServer(app);
const io = require('socket.io')(http); */
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);

const { addUser, removeUser, getUser, getUsersInRoom} = require('./chatUsers');

const config = require('config');

const io = socketio(server.listen(config.port), {
    cors: {
       origin: "*",
    },
})

io.on('connection', (socket) => { 
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if(error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        
        callback();
    });
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
         
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} izasao je iz grupe.`})
            io.to(user.room).emit('roomData', { room: user.room, text: getUsersInRoom(user.room) })
        }
    })
})
app.use(express.json());

// DB Configuration
const db = config.get("mongoURI");

//Connecing Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

// Request /api/items search in items
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/relieve', require('./routes/api/relieve'));
app.use('/api/eat', require('./routes/api/eat'));
app.use('/api/sleep', require('./routes/api/sleep'));
app.use('/api/todo', require('./routes/api/todo'));
app.use('/api/router', require('./routes/api/router'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

server.listen(port, () => console.log(`Server started on port ${port}`))

