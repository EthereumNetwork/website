import router from './v1'

const initRoutes = app => {
  app.use('/', router)
}

export default initRoutes
