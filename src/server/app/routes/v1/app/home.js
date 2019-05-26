import express from 'express'
const router = express.Router()

const homeController = (req, res) => {
  res.render('index.html')
}

router.get(`/`, homeController)

export default router
