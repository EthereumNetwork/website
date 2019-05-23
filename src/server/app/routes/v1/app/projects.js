import path from 'path'
import express from 'express'
const router = express.Router()

const projectController = (req, res) => {
  res.sendFile(path.join(__dirname+'/../../../../../../dist/projects.html'))
}

router.get('/projects', projectController)

export default router
