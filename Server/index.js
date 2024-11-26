// ทำการ import http เข้ามาเพื่อทำการ run server
const http = require('http');
const app = require('./app');
require('dotenv').config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT || 4001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
