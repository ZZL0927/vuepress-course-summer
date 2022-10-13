{
  const str = '十'
  const buf_1 = Buffer.from(str, 'utf-8') // 将utf-8字符串转换为Buffer，汉字需要用多个字节表示
  console.log(buf_1) // <Buffer e5 8d 81>，utf-8编码的汉字“十”对应的三个字节，此处为十六进制表示
  console.log(buf_1.byteLength, str.length) // buf_1的字节长度为3，但是字符串长度为1，如果使用utf-8编码保存“十”将会占用3个字节
  const buf_2 = Buffer.from('a', 'utf-8') // 英文字母只占用一个字节
  console.log(buf_2) // <Buffer 61>，字母a对应的ASCII码为97，用十六进制表示就是61
}
{
  const buf = Buffer.from([0xe5, 0x8d, 0x81]) // 直接使用字节数组创建Buffer
  console.log(buf.toString('utf-8')) // 十，将Buffer转换为utf-8编码字符串
  console.log(buf.toString('base64')) // 5Y2B，将Buffer转换为Base64编码字符串
  console.log(buf.toString('hex')) // e58d81，将Buffer转换为十六进制编码字符串
  const str = Buffer.from('5Y2B', 'base64').toString('utf-8') // 将Base64字符串转换为utf-8编码
  console.log(str) // 十
  const buf_2 = Buffer.from([0xf0, 0x9f, 0x98, 0x80]) // emoji字符需要用更多的字节来表示
  console.log(buf_2.toString('utf-8')) // 😀
}
{
  const buf_1 = Buffer.from([0xe5, 0x8d, 0x81]) // 对应utf-8编码的“十”
  const buf_2 = Buffer.from([0xe4, 0xb8, 0x80]) // 对应utf-8编码的“一”
  const buf = Buffer.concat([buf_1, buf_2]) // 合并多个Buffer片段
  console.log(buf.toString('utf-8')) // 十一
}
