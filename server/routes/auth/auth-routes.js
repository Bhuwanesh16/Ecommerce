const express= require('express');
const {registerUser, login} = require('../../controllers/auth/auth-controller');


const router= express.Router();

router.post('/register',registerUser)
module.exports=router;