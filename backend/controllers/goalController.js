const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')



const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  // res.status(200).json({ message: 'Get goals' })
  res.status(200).json(goals)
});



const setGoal = asyncHandler(async (req, res) => {
  // console.log(req.body)
  if (!req.body.text) {
    // res.status(400).json({ message: 'Please add some text' })
    res.status(400)
    throw new Error('Please add some text')   // express built in error handler, which will be handled by "errorMiddleware"
  }

  const goal = await Goal.create({
    text: req.body.text
  })

  // res.status(200).json({ message: 'Set goal' })
  res.status(200).json(goal)
});



const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // { new: true } - will create the document if it doesn't already exist
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // res.status(200).json({ message: `Update goal ${req.params.id}` })
  res.status(200).json(updatedGoal)
});



const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndRemove((req.params.id))

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // res.status(200).json({ message: `Delete goal ${req.params.id}` })
  res.status(200).json({ id: req.params.id })
});



module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}