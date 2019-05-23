import express from 'express'
import path from 'path'
const router = express.Router()

const homeController = (req, res) => {
  res.sendFile(path.join(__dirname+'/../../../../../../dist/index.html'))
}

router.get(`/`, homeController)

export default router
