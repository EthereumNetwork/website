import express from 'express'
const router = express.Router()

const aboutController = (req, res) => {
  res.render('about.html')
}

router.get(`/about`, aboutController)

export default router
