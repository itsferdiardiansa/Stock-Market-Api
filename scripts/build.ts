import { build } from 'esbuild'
import { resolve } from 'path'
import fs from 'fs-extra'
import dotenv from 'dotenv'
import moduleAlias from 'module-alias'
import chalk from 'chalk'

dotenv.config({ path: resolve(process.cwd(), '.env') })

const log = (msg: string) => console.log(`${chalk.green('[BUILD]')} ${msg}`)
const warn = (msg: string) => console.warn(`${chalk.yellow('[WARN]')} ${msg}`)
const error = (msg: string) => console.error(`${chalk.red('[ERROR]')} ${msg}`)

const distPath = resolve('dist')

const requiredEnv = [
  'APP_PORT',
  'API_KEY',
  'API_URL',
  'CACHE_URL',
  'ENCRYPTION_KEY',
]

function validateEnv() {
  log('Validating environment...')
  const missing = requiredEnv.filter(k => !process.env[k])
  if (missing.length) {
    warn(`Missing required env keys: ${missing.join(', ')}`)
  }
}

function setupAliases() {
  moduleAlias.addAliases({
    '@': resolve(distPath),
    '@utils': resolve(`${distPath}/utils`),
    '@controllers': resolve(`${distPath}/controllers`),
    '@routes': resolve(`${distPath}/routes`),
    '@middlewares': resolve(`${distPath}/middlewares`),
    '@config': resolve(`${distPath}/config`),
    '@services': resolve(`${distPath}/services`),
  })
}

async function cleanDist() {
  log('Cleaning old dist...')
  try {
    await fs.remove(distPath)
    await fs.ensureDir(distPath)
    log('Dist folder cleaned.')
  } catch (err) {
    error(`Failed to clean dist: ${err}`)
    process.exit(1)
  }
}

async function compileApp() {
  try {
    log('Building project with esbuild...')

    await build({
      entryPoints: ['src/bootstrap.ts'],
      bundle: true,
      outdir: 'dist',
      platform: 'node',
      target: 'node20',
      sourcemap: true,
      minify: process.env.NODE_ENV === 'production',
      format: 'cjs',
      tsconfig: 'tsconfig.json',
      external: ['pino', 'pino-pretty', 'newrelic'],
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      },
      logLevel: 'info',
    })

    log('Build finished successfully.')
  } catch (err) {
    error(`Build failed: ${err}`)
    process.exit(1)
  }
}

async function main() {
  log('Starting build process...')
  validateEnv()
  setupAliases()
  await cleanDist()
  await compileApp()
  log('Build process complete.')
}

main()