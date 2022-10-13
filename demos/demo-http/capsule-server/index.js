const http = require("http")
const uuid = require("uuid")

let types = new Map([
  ["txt", "text/plain; charset=utf-8"],
  ["html", "text/html; charset=utf-8"],
  ["css", "text/css; charset=utf-8"],
  ["js", "application/javascript; charset=utf-8"],
  ["json", "application/json; charset=utf-8"],
  ["png", "image/png"],
  ["jpg", "image/jpeg"],
])

let arr = []

const server = http.createServer(async (req, res) => {
  try {
    // 解析路由
    let [reqPath, query] = req.url.split("?")
    // GET请求需要解析search
    let params = query ? new URLSearchParams(query) : {}
    // 解析cookie
    // 解析body
    let chunks = []
    req.on("data", (chunk) => chunks.push(chunk))
    req.on("end", () => {
      // 拼接Buffer，生成body
      try {
        let data = Buffer.concat(chunks).toString("utf-8")
        req.body = JSON.parse(data)
      } catch (error) {
        req.body = {}
      }
      // res.setHeader('Access-Control-Allow-Origin', '*')
      // 映射路由函数
      try {
        if (reqPath === "/api/add") {
          if (
            req.body.time &&
            req.body.content &&
            req.body.name &&
            req.body.email
          ) {
            let id = uuid.v4()
            arr.push({ ...req.body, tip: req.body.tip || "", id })
            res.end(JSON.stringify({ stat: "ok", id }))
          } else {
            res.end(JSON.stringify({ stat: "param_lost", msg: "参数缺失" }))
          }
        } else if (reqPath === "/api/get") {
          if (params.has("id")) {
            let cap = arr.find((x) => x.id === params.get("id"))
            if (cap) {
              return res.end(JSON.stringify({
                stat: "ok",
                data: cap
              }))
            } else {
              return res.end(
                JSON.stringify({ stat: "not_found", msg: "胶囊未找到" }),
              )
            }
          } else {
            res.end(JSON.stringify({ stat: "param_lost", msg: "参数缺失" }))
          }
        } else {
          res.statusCode = 404
        }
      } catch (err) {
        res.statusCode = 500
      } finally {
        res.end()
      }
    })
  } catch (error) {
    console.trace(error)
    res.statusCode = 500
    res.end()
  }
})

server.listen(3280, () => console.log(3280))
