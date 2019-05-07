import express from 'express'

import routes from './default'

const NAMESPACE = '/v1'
const router = express.Router()

router.use(`${NAMESPACE}/`, routes)

export default router

