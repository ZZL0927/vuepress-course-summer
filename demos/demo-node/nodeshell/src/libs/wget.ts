import { ParsedArgs } from "minimist";
import axios from "axios";
import ora from "ora";
import chalk from "chalk";
import { finished } from "stream/promises";
import * as fs from "fs";
import * as path from "path";
/**
 * 文件下载
 * @param args
 */
async function download(url: string, args: ParsedArgs) {
  //   const url = "https://www.keaidian.com/uploads/allimg/190424/24110307_8.jpg";
  // 请求下载地址，需要指定responseType为stream，让resp.data以可读流的形式返回
  const { headers, data } = await axios.get(url, {
    responseType: "stream",
  });
  // 根据下载地址获取文件名
  let name = "";
  if (args.o && args.o !== true) {
    name = args.o;
  } else if (headers["content-disposition"]) {
    name = headers["content-disposition"].split('=')[1];
  } else {
    name = path.basename(url).split('?')[0].split('/').reverse()[0]
  }
  // 获取下载文件的大小
  const size = Number(headers["content-length"]);
  // 创建一个文件写入流
  const stream = fs.createWriteStream(name);
  // 将响应数据流通过pipe管道连接到文件写入流
  data.pipe(stream);
  console.log(`downloading ${name}...`);
  // 创建一个加载指示器
  const spinner = ora("Loading unicorns").start();
  // 指示器的颜色
  spinner.color = "green";
  // 记录已经下载的数据长度
  let loaded = 0;
  // 记录开始下载时的时间戳
  let startTime = new Date().getTime();
  // 监听响应流的data事件，chunk是本次读取的buffer数据
  data.on("data", (chunk: Buffer) => {
    // loaded累加到达的数据长度
    loaded += chunk.byteLength;
    // 计算完成的百分比
    const percent = ((loaded / size) * 100).toFixed(1);
    const speed = (loaded / (new Date().getTime() - startTime)) * 1000;
    if (speed >= 0.1 * 1024 * 1024) {
      spinner.text = `${percent}% ${(speed / 1024 / 1024).toFixed(1)}MB/s`;
    } else if (speed >= 0.1 * 1024 && speed <= 0.1 * 1024 * 1024) {
      spinner.text = `${percent}% ${(speed / 1024).toFixed(1)}KB/s`;
    } else {
      spinner.text = `${percent}% ${speed.toFixed(1)}B/s`;
    }
  });
  // 等待写入流的结束，即下载完成
  await finished(stream);
  // 修改指示器的状态
  spinner.stopAndPersist({
    symbol: chalk.green("√"),
  });
  spinner.text = `${100.0}%`;
}
function help() {
  console.log("usage: wget url <-o name>");
}
export default async function wget(args: ParsedArgs) {
  const target = args._[0];
  if (!target || args.help === true) {
    return help();
  }
  if (args.o && args.o === true) {
    console.log("usage:wget -o filename");
    return;
  }
  download(args._[0], args);
}
