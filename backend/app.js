// app.js
const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes

app.use('/file', fileRoutes);  // /file/upload        /file/get_file/filaname

app.use('/', (req , res)=>{
    res.status(200).send("<h1>Welcome to server</h1>");
})

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
