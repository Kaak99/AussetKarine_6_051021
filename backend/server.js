console.log("hello wrld");

const http = require('http');


const server = http.createServer((req,res) => {
    res.end('voila la réponse du server')
});

//server.listen(process.env.PORT || 3000);
server.listen(3000);