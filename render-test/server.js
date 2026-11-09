import http from "http";

let port = process.env.PORT || 3000;

let server = http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    let now = new Date();

    res.writeHead(200, {"Content-Type": "text/plain" });
    res.end("Hello from my server!!! The server's clock says " + now.toString());
});

server.listen(port, () => {
    console.log("Server running on port " + port);
});