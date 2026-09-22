# payswitch
my pay.switch
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(req.url.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";
  const file = path.join(publicDir, pathname);
  if (!file.startsWith(publicDir)) {
    res.writeHead(403); return res.end("Forbidden");
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type":"text/plain"});
      return res.end("Not found");
    }
    const ext = path.extname(file);
    const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8"};
    res.writeHead(200, {"Content-Type": types[ext] || "application/octet-stream"});
    res.end(data);
  });
});
server.listen(port, "0.0.0.0", () => console.log(`PaySwitch listening on ${port}`));
