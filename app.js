const express = require('express')
const fs = require('fs');
const https = require('https');
var cors = require('cors');


var privateKey = fs.readFileSync('/opt/bitnami/apache2/conf/www.finddylan.com.key', 'utf8');
var certificate = fs.readFileSync('/opt/bitnami/apache2/conf/www.finddylan.com.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


const app = express();

app.use(cors());

const initializeDatabases = require('./dbs')
const routes = require('./routes')
let port = 80;
initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  let server = https.createServer(credentials, routes(app, dbs));
  server.listen(port, () => {
  console.log("server starting on port : " + port)
});
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})
