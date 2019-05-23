import path from 'path'
import express from 'express'
const router = express.Router()

const aboutController = (req, res) => {
  res.sendFile(path.join(__dirname+'/../../../../../../dist/about.html'))
}

router.get(`/about`, aboutController)

export default router
