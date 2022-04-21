const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController') 
const { protect } = require('../middleware/authMiddleware')


router.route('/')
  .get(protect, getGoals)
  .post(protect, setGoal)

router.route('/:id')
  .put(protect, updateGoal)
  .delete(protect, deleteGoal)

// router.get('/', (req, res) => res.status(200).json({ message: 'Get goals' }))
// router.get('/', getGoals)

// router.post('/', (req, res) => res.status(200).json({ message: 'Set goal' }))
// router.post('/', setGoal)

// router.put('/:id', (req, res) => res.status(200).json({ message: `Update goal ${req.params.id}` }))
// router.put('/:id', updateGoal)

// router.delete('/:id', (req, res) => res.status(200).json({ message: `Delete goal ${req.params.id}` }))
// router.delete('/:id', deleteGoal)


module.exports = router
