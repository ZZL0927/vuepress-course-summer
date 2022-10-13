import chalk from 'chalk'
import minimist from 'minimist'
import * as readline from 'readline'

import cd from './libs/cd'
import find from './libs/find'
import cls from './libs/cls'
import exit from './libs/exit'
import ls from './libs/ls'
import cloc from './libs/cloc'
import wget from './libs/wget'

const commands = {
  cd,
  find,
  cls,
  exit,
  ls,
  cloc,
  wget
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function run() {
  rl.question(
    chalk.cyan('NodeShell') + ' ' + process.cwd() + '> ',
    async answer => {
      try {
        const arr = answer
          .split(' ')
          .map(item => item.trim())
          .filter(item => item !== '')
        const cmd = arr[0]
        const args = minimist(arr.slice(1))
        if (commands[cmd]) await commands[cmd](args)
        else console.error(chalk.red('command ' + cmd + ' not found'))
      } catch (error) {
        console.trace(error)
      }
      run()
    }
  )
}

cls()
run()
