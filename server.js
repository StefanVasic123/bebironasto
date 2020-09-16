const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const config = require('config');

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

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server started on port ${port}`))

