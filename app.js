const express = require('express');
const router = express.Router();
const app = express();
const  mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config();

//connect to database
mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser : true },
    () => console.log('connected to db'));


//Imports Routes
const authRoute = require('./routes/auth');


//Route Middleware
app.use('/api/user',authRoute);

app.listen(5000,() => console.log('Server is running'))




module.exports = app;
