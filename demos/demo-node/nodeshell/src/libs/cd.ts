import { ParsedArgs } from 'minimist'

function help() {
  console.log('usage: cd <dir>')
}

/**
 * 目录切换
 * @param args
 */
export default function (args: ParsedArgs) {
  const target = args._[0]
  if (!target || args.help === true) {
    return help()
  }
  process.chdir(target)
}
