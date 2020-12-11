const express = require('express');
const router = express.Router();
const  BoardingProvider  = require('../model/BoardingProvider');
const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');


router.post('/register',async (req,res) =>{

    if ((!req.body.username) || (!req.body.password)) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else{

        const  emailExist = await BoardingProvider.findOne({email:req.body.email});
        if(emailExist) return  res.json({success: false, msg: 'Email is already exits'});

        // Hash Passwords
        const  salt = await bcrypt.genSalt(10);

        const  hashPassword = await bcrypt.hash(req.body.password,salt)

        const  boardingProvider = new BoardingProvider({

            username:req.body.username,
            fullName:req.body.fullName,
            email:req.body.email,
            password:hashPassword
        })



        boardingProvider.save(function (err,boardingProvider){
            if(err){
                res.json({success: false, msg: 'Failed to save'})
            }
            else {
                res.json({success: true, msg: 'Successfully saved'})
            }
        })

    }







});

router.post('/login',async (req,res) =>{

    if ((!req.body.username) || (!req.body.password)) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else{

        const  user = await BoardingProvider.findOne({email:req.body.email});
        if(!user) return  res.json({success: false, msg: 'Email is not found'}) ;

        //Password is incorrect
        const validPass = await  bcrypt.compare(req.body.password,user.password);
        if(!validPass) return  res.json({success: false, msg: 'Password is in correct'}) ;

        res.send('Logged In')

        // Create and assign web tokens
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        // res.header('auth-token',token).send(token);

    }













})


module.exports=router;
