const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // console.log(name, email, password)

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  // res.status(201).json({ message: 'Register User' })
});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // console.log(password)

  const user = await User.findOne({ email })
  // console.log(user)

  // if (!user) {
  //   res.status(400)
  //   throw new Error('No user with that email found')
  // }

  // if (user) {
  //   if (!password || password === "undefined") {
  //     res.status(422)
  //     throw new Error('Please enter password')
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password)
  //   if (!isMatch) {
  //     res.status(422)
  //     throw new Error('Password not correct')
  //   }  

  //   return res.status(201).json({
  //     _id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     token: generateToken(user._id),
  //   })
  // }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  // res.status(201).json({ message: 'Login User' })
});



const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
  // res.status(201).json({ message: 'Get User' })
});



module.exports = {
  registerUser,
  loginUser,
  getMe
}