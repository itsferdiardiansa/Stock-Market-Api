import chalk from 'chalk'
import figlet from 'figlet'

export const showBanner = () => {
  console.log(chalk.blue.bold(figlet.textSync('Stock Market Eye')))
  console.log(chalk.cyan('\n🚀 Server Status'))
  console.log(chalk.gray('---------------------------------------'))
}

export const showAppBanner = (value: number) => {
  console.log(chalk.green.bold('\n✅ Server is running!'))
  console.log(chalk.gray('---------------------------------------'))
  console.log(chalk.cyan(`🌐 Local: http://localhost:${value}`))
}
