const express = require('express');
const router = express.Router();
const app = express();

//Imports Routes
const authRoute = require('./routes/auth');


//Route Middleware
app.use('/api/user',authRoute);

app.listen(5000,() => console.log('Server is running'))




module.exports = app;
