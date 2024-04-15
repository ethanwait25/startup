import { exec } from "child_process";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import express from "express";
const app = express();
import * as DB from "./database.js";
import { peerProxy } from "./peerProxy.js";

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

// Reset logged in users
DB.resetLoggedIn();

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);


// Non-secure endpoints - no token required
//========================================================================

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// REGISTER: CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUserByEmail(req.body.email) || await DB.getUserByName(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.status(200).send({ msg: 'Created' })
  }
});

// LOGIN: GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUserByName(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const avatar = await DB.getAvatar(req.body.username);
      if (avatar) {
        DB.addLoggedIn(avatar);
      }

      setAuthCookie(res, user.token);
      res.status(200).send({ msg: 'Login Successful', email: user.email, avatar: avatar });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// LOGOUT: DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', async (_req, res) => {
  DB.removeLoggedInByToken(_req.cookies[authCookieName]);
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
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// CREATE AVATAR
apiRouter.post('/avatar', async (req, res) => {
  const avatar = await DB.createAvatar(req.body.username, req.body.prompt, req.body.image);
  DB.addLoggedIn(avatar);
  res.status(200).send(avatar);
});

// UPDATE SCORE
apiRouter.post('/score', async (req, res) => {
  const user = await DB.getUserByName(req.body.username);
  if (user) {
    const reply = await DB.updateScore(req.body.username, req.body.score);
    if (reply) {
      res.status(200).send(reply);
    } else {
      res.status(500).send({ msg: 'Server error' });
    }
  } else {
    res.status(404).send({ msg: 'Unknown' });
  }
});

// GET ACTIVE USERS
apiRouter.get('/active', async (_req, res) => {
  const users = await DB.getLoggedIn();
  res.status(200).send(users);
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

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);