const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const port = 8888

const app = express();
app.use(cors());
const routes = require('./routes/index.route');
app.use(routes);

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`My current music http server listening at port ${port}`);

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port + 1);
// console.log(`[${serviceName}] https server listening at port ${port + 1}`);
