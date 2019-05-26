import express from 'express'

import routes from './default'
import appRoutes from './app/index'

const NAMESPACE = '/v1'
const router = express.Router()
router.use(`${NAMESPACE}/`, routes)
router.use(`/`, appRoutes.home)
router.use(`/`, appRoutes.about)
router.use(`/`, appRoutes.projects)

export default router
