import { spawn } from 'child_process'
import chalk from 'chalk'
import chokidar from 'chokidar'

const isWindows = process.platform === 'win32'
const SCRIPT_FILE = './src/server.ts'

console.log(chalk.blue.bold('🚀 Dev server is starting...\n'))

let nodemonProcess: any

const runESLint = () => {
  return new Promise<void>(resolve => {
    console.log(chalk.cyan('🔍 Linting...'))

    const eslintProcess = spawn(
      isWindows ? 'npx.cmd' : 'npx',
      ['eslint', '--max-warnings=0', './src', '--format', 'stylish'],
      { stdio: 'inherit' }
    )

    eslintProcess.on('close', code => {
      if (code === 0) {
        console.log(chalk.green('✅ No ESLint errors!\n'))
      } else {
        console.log(chalk.red('❌ ESLint found errors! Check above for details.\n'))
      }
      resolve()
    })

    eslintProcess.on('error', err => {
      console.error(chalk.red('❌ Error running ESLint:', err))
      resolve()
    })
  })
}

const startNodemon = () => {
  if (nodemonProcess) {
    console.log(chalk.yellow('♻️ Restarting server...\n'))
    nodemonProcess.kill()
  }

  nodemonProcess = spawn(
    isWindows ? 'npx.cmd' : 'npx',
    [
      'nodemon',
      '--quiet', // no need to show the nodemon's info
      '--require',
      'tsconfig-paths/register',
      '--ext',
      'ts,js,json',
      '--ignore',
      'node_modules/',
      SCRIPT_FILE,
    ],
    { stdio: 'inherit' }
  )

  nodemonProcess.on('error', err => {
    console.error(chalk.red('❌ Error starting Nodemon:', err))
  })
}

;(async () => {
  await runESLint()
  startNodemon()
})()

chokidar
  .watch('./src', { ignored: /node_modules/, ignoreInitial: false })
  .on('change', async filePath => {
    console.clear()
    console.log(chalk.magenta(`📝 File changed: ${filePath}`))

    await runESLint()
    startNodemon()
  })
  .on('error', error => {
    console.clear()
    console.error(chalk.red('❌ File watcher error:', error))
  })

const shutdown = () => {
  console.log(chalk.yellow('\n🛑 Shutting down...'))
  if (nodemonProcess) nodemonProcess.kill()
  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
