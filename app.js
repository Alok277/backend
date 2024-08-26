const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (req.url === '/') {
        let message = "";
        if (fs.existsSync("message.txt")) {
            message = fs.readFileSync("message.txt", "utf8")
        }
        res.write('<html>')
        res.write('<head><title>Show input text</title></head>')
        res.write('<body>')
        res.write(`<form action="/message" method="POST"><h1>${message}</h1><input type="text" name="message"/><button type="submit">Send</button></form>`)
        res.write('</body>')
        res.write('</html>')
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunks) => {
            body.push(chunks)
        })
        return req.on("end", () => {
            const parser = Buffer.concat(body).toString();

            const message = parser.split("=")[1]

            fs.writeFileSync("message.txt", message.replaceAll("+", " "));

            res.statusCode = "302";
            res.setHeader("LOCATION", "/")
            return res.end()

        })
    }

})

server.listen(4000)