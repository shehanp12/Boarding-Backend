const express = require('express');
const router = express.Router();
const app = express();
const  mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config();
mongoose.set('useNewUrlParser', true);
//connect to database
mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser : true ,useUnifiedTopology: true},
    () => console.log('connected to db'));



//Imports Routes
const authRoute = require('./routes/auth');

//Middleware
app.use(express.json());




//Route Middleware
app.use('/api/user',authRoute);

app.listen(5000,() => console.log('Server is running'))




module.exports = app;
