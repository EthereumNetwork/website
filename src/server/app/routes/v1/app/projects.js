import express from 'express'
const router = express.Router()

const projectController = (req, res) => {
  res.render('projects.html')
}

router.get('/projects', projectController)

export default router
