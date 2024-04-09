import express from 'express';
import { exec } from "child_process";
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Starts Prodia proxy server
const proxyServer = exec("lcp --proxyUrl https://api.prodia.com");

process.on("SIGINT", () => {
  proxyServer.kill();
  process.exit(0);
});

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScore
apiRouter.get('/score', (req, res) => {
  var reply = getUserByte(req.query.playerName);
  res.send(reply);
});

// SetScore
apiRouter.post('/score', (req, res) => {
  var reply = updateUserByte(req.body);
  res.send(reply);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


var scores = new Map();

function getUserByte(userName) {
  var score = new Map();
  score.set("score", scores.get(userName));
  return JSON.stringify(score);
}

function updateUserByte(body) {
  scores.set(body.playerName, body.score);
  return JSON.stringify({ "status": 200 });
}