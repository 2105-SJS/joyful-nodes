// This is the Web Server
require("dotenv").config();
const express = require("express");
const { PORT = 3000 } = process.env;
const server = express();
const morgan = require("morgan");
const { client } = require('./db');
const path = require('path');

server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, 'build')));

server.use('/api', require('./routes'));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});