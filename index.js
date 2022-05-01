const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");

//Local server details declaration
const hostname = "localhost";
const port = 3000;

//Initialization of express
const app = express();

//Initialization of morgan
app.use(morgan("dev"));

//Initialization of bodyparser in express
app.use(bodyParser.json());

//Mounting the dish router
app.use("/dishes", dishRouter);

//Serving up static files with express
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

//Creating and starting server
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
