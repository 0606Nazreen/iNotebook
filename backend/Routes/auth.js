const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { deleteOne } = require('../Models/User');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisis my project";

//ROUTE1:Create a user using : POST "/api/auth/createUser". No login required

router.post('/createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors, return bad request and the errors
     console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //check whether the user with this email exist already
    let user = await User.findOne({ email: req.body.email });

    console.log(req.body.email)
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    updatedUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      User: {
        id: User._id
      }
    }
    // token 
    const authtoken = jwt.sign(data, JWT_SECRET);
    //console.log(jwtData);
    //res.json(updatedUser)
    res.json({ authtoken })
  }
  //catching errors
  catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
})
//ROUTE 2 :Authenticate a user  using : POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  //if there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "please try to login with correct credentials" });
    }
    const data = {
      User: {
        id: user._id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    return res.json({success, authtoken })

  } catch { errors } {

    console.error(errors.message);
    return res.status(500).send("Internal Server Error");
  }
});



//ROUTE 3 : Get loggedin user Details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let UserID = req.user.id;
    const user = await User.findById(UserID).select("-password")
    return res.json({user})
  } catch (errors) {
    console.error(errors.message);
    return res.status(500).send("Internal Server Error");
  }
})


module.exports = router

