import express from 'express'
const router = express.Router()

const defaultController = (req, res) => {
  res.sendStatus(200)
}

router.get('/_ping', defaultController)

export default router
