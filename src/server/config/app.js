const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Ethereum Network',
      format: String,
      default: 'Ethereum Network'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 12345,
    env: 'port'
  },
  namespace: {
    doc: 'Version of routes',
    format: String,
    default: 'v1',
    env: 'NAMESPACE'
  },
  logs: {
    directory: {
      doc: 'Directory where logs found',
      format: String,
      default: 'logs',
      env: 'LOG_DIRECTORY'
    },
    level: {
      doc: 'level of log',
      format: String,
      default: 'debug',
      env: 'LOG_LEVEL'
    },
  }
})

const env = config.get('env')

config.loadFile(__dirname + '/environment/' + env + '.json')

config.validate({ allowed: 'strict' })

export default config
