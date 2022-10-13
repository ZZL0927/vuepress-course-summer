/**
 * 清屏
 */
export default function cls() {
  process.stdout.write('\033c')
}