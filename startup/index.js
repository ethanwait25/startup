import { exec } from "child_process";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import express from "express";
const app = express();
import * as DB from "./database.js";

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Starts Prodia proxy server
const proxyServer = exec("lcp --proxyUrl https://api.prodia.com");

process.on("SIGINT", () => {
  proxyServer.kill();
  process.exit(0);
});

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);


// Non-secure endpoints - no token required
//========================================================================

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// REGISTER: CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("Creating user");
  console.log(req.body);
  if (await DB.getUserByEmail(req.body.email) || await DB.getUserByName(req.body.username)) {
    console.log("Existing user");
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    console.log("Created user");
    res.status(200).send({ msg: 'Created' })
  }
});

// LOGIN: GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUserByName(req.body.username);
  console.log("Attempting login");
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("Login successful");
      const avatar = await DB.getAvatar(req.body.username);
      console.log(avatar);
      setAuthCookie(res, user.token);
      res.status(200).send({ msg: 'Login Successful', email: user.email, avatar: avatar });
      return;
    }
  }
  console.log("Login failed");
  res.status(401).send({ msg: 'Unauthorized' });
});

// LOGOUT: DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// Secure endpoints - require a valid token
//========================================================================

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    console.log("User authenticated, can make secure calls");
    next();
  } else {
    console.log("User unauthorized, no secure calls");
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// CREATE AVATAR
apiRouter.post('/avatar', async (req, res) => {
  const reply = await DB.createAvatar(req.body.username, req.body.prompt, req.body.image);
  console.log("Avatar created");
  res.status(200).send(reply);
});

// GET AVATAR
apiRouter.get('/avatar', async (req, res) => {
  const reply = await DB.getAvatar(req.body.username);
  res.send(reply);
});

// GET SCORE
apiRouter.get('/score', async (req, res) => {
  var user = await DB.getUserByName(req.body.username);
  res.send({ score: user.byte });
});

// UPDATE SCORE
apiRouter.post('/score', async (req, res) => {
  const user = await DB.getUserByName(req.body.username);
  if (user) {
    const reply = await DB.updateScore(req.body.username, req.body.score);
    if (reply) {
      res.send({ status: 200 });
    } else {
      res.status(500).send({ msg: 'Server error' });
    }
  } else {
    res.status(404).send({ msg: 'Unknown' });
  }
  res.send(reply);
});

//========================================================================

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


var scores = new Map();

// function getUserByte(userName) {
//   var score = new Map();
//   score.set("score", scores.get(userName));
//   return JSON.stringify(score);
// }

// function updateUserByte(body) {
//   scores.set(body.playerName, body.score);
//   return JSON.stringify({ "status": 200 });
// }