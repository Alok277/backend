const http = require('http');

const server = http.createServer((req, res) => {
    console.log(res)

    res.end('Alok Ranjan');
})

server.listen(4000)