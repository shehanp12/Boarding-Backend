const express = require('express');
const router = express.Router();
const  BoardingProvider  = require('../model/BoardingProvider');
const {registerValidation } = require('../routes/validation');
const Joi = require('@hapi/joi');

router.post('/register',async (req,res) =>{

    //validation
    // const {error} = registerValidation(req.body);
    // if(error)
    //     return res.status(400).send(error.details[0].message)

   // checking if the user alrady in database
    const  emailExist = await BoardingProvider.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email is already exits');

    const  boardingProvider = new BoardingProvider({
        username:req.body.username,
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    })
    try {
        const  savedUser = await  boardingProvider.save();
        res.send(savedUser)

    }
    catch (e) {
        res.send(400).send(e)

    }
});


module.exports=router;
