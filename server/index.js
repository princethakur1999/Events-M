const User = require('../server/models/user');

const express = require('express');

const app = express();

require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4000;


const { connect } = require('./config/database');

// Database connection
connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: '*', // Adjust the origin based on your requirements
        credentials: true,
    })
);

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');
const profileRoute = require('./routes/profile');


// Routes
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.use('/', formRoutes);
app.use('/', profileRoute);




// Default route
app.get('/', (req, res) => {

    return res.json({

        success: true,
        message: 'Your server is up and running.',
    });
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});