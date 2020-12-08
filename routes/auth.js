const express = require('express');
const router = express.Router();
const  BoardingProvider  = require('../model/BoardingProvider');
const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');


router.post('/register',async (req,res) =>{

    //validation
    // const {error} = registerValidation(req.body);
    // if(error)
    //     return res.status(400).send(error.details[0].message)

   // checking if the user already in database
    const  emailExist = await BoardingProvider.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email is already exits');

    // Hash Passwords
    const  salt = await bcrypt.genSalt(10);

    const  hashPassword = await bcrypt.hash(req.body.password,salt)

    const  boardingProvider = new BoardingProvider({
        username:req.body.username,
        fullName:req.body.fullName,
        email:req.body.email,
        password:hashPassword
    })
    try {
        const  savedUser = await  boardingProvider.save();
        res.send(savedUser)

    }
    catch (e) {
        res.send(400).send(e)

    }
});

router.post('/login',async (req,res) =>{
    const  user = await BoardingProvider.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    //Password is incorrect
    const validPass = await  bcrypt.compare(req.body.password,user.password);
    if(!validPass) return  res.status(400).send('invalid password');

    // res.send('Logged In')

   // Create and assign web tokens
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);










})


module.exports=router;
