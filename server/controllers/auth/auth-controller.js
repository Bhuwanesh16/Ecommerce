const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser= async(req, res) => {
    const {userName,email,password}=req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username: userName,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json(
            {
                success:true,
                message:"User registered successfully"
            }
        );

    }
    catch(e)
    {
        console.log(e);
        res.status(500).json(
            {
                success:false,
                message:"Internal server error"
            }
        )
    }
}

const login= async(req, res) => {
    const {email,password}=req.body;
    try{

    }
    catch(e)
    {
        console.log(e);
        res.status(500).json(
            {
                success:false,
                message:"Internal server error"
            }
        )
    }
}
module.exports = {registerUser}