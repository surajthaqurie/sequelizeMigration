const http = require('http');
const app = require('./app');

const server = http.createServer(app);


const port = 3000 || process.env.PORT;

server.listen(port, () => {
    console.log(`Listening on ${port} on ` + Date(new Date()));
});


process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});