import 'dotenv/config'
import moduleAlias from 'module-alias'
import { resolve } from 'path'
import chalk from 'chalk'
import { fork } from 'child_process'

const log = (msg: string) => console.log(`${chalk.blue('[START]')} ${msg}`)
const error = (msg: string) => console.error(`${chalk.red('[ERROR]')} ${msg}`)

// Setup aliases
moduleAlias.addAliases({
  '@': resolve('dist'),
  '@utils': resolve('dist/utils'),
  '@controllers': resolve('dist/controllers'),
  '@routes': resolve('dist/routes'),
  '@middlewares': resolve('dist/middlewares'),
  '@config': resolve('dist/config'),
  '@services': resolve('dist/services'),
})

const startServer = () => {
  const serverPath = resolve('dist/bootstrap.js')

  if (!serverPath || !serverPath.endsWith('.js')) {
    error('Server file not found or invalid path.')
    process.exit(1)
  }

  const server = fork(serverPath, {
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  })

  server.on('exit', (code) => {
    error(`Server exited with code: ${code}`)
    if (code !== 0) {
      log('Restarting server...')
      setTimeout(startServer, 1000) // retry
    }
  })

  server.on('error', (err) => {
    error(`Server error: ${err}`)
  })

  process.on('SIGINT', () => {
    log('Graceful shutdown...')
    server.kill('SIGTERM')
    process.exit(0)
  })
}

startServer()