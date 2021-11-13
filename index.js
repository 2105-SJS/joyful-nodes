// This is the Web Server
require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const path = require('path');
const { PORT = 5000 } = process.env;
const { client } = require('./db');

server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, 'build')));

server.use('/api', require('./routes'));



server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

server.listen(PORT, async () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});