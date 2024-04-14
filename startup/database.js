const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const avatarCollection = db.collection('avatars');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getUserByName(username) {
  return userCollection.findOne({ username: username });
}

async function getUserByEmail(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function getAvatar(username) {
  return avatarCollection.findOne({ username: username });
}

async function createUser(email, username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function createAvatar(username, prompt, image) {

  const avatar = {
    username: username,
    prompt: prompt,
    image: image,
    byte: 25
  };

  avatarCollection.insertOne(avatar);

  return avatar;
}

async function updateScore(username, score) {
  try {
    await avatarCollection.updateOne(
      { username: username },
      { $set: { byte: score } }
    );

  } catch (error) {
    return null;
  }
}

module.exports = {
  getUserByName,
  getUserByEmail,
  getUserByToken,
  getAvatar,
  createUser,
  createAvatar,
  updateScore
};
