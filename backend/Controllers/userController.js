const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_KEY;
  
  return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async (req, res) => {

  try {
    const {name, email, password} = req.body;

    //Find user in database
    let user = await userModel.findOne({email});

    //Data validation
    if(user){
      return res.status(400).json({message: "User provided already exists"});
    }
    if(!name || !email || !password){
      return res.status(400).json({message: "Please enter all fields"});
    }
    if(!validator.isEmail(email)){
      return res.status(400).json({message: "Please enter a valid email"});
    }
    if(!validator.isStrongPassword(password)){
      return res.status(400).json({message: "Please enter a strong password"});
    }

    //Create user to be inserted into database
    user = new userModel({
      name,
      email,
      password
    });

    //Password Encryption
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Save user to database
    await user.save();

    //Give user a secure token
    const token = createToken(user._id);

    //Send Data to client
    res.status(200).json({_id: user._id, name, email, token});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  };
};

const loginUser = async (req, res) => {
  
  const {email, password} = req.body;

  try {
    let user = await userModel.findOne({email});

    //DATA VALIDATION
    if(!user){
      return res.status(400).json({message: "Invalid email or password"});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      return res.status(400).json({message: "Invalid email or password"});
    }

    //Create User's Token
    const token = createToken(user._id);

    res.status(200).json({_id: user._id, name: user.name, email, token});

  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  };
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {

    const user = await userModel.findById(userId);

    res.status(200).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  };
};

const getUsers = async (req, res) => {
  try {

    const users = await userModel.find();

    res.status(200).json(users);

  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  };
};

module.exports = {registerUser, loginUser, findUser, getUsers};