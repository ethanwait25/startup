import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { default as config } from "./dbConfig.json" assert { type: "json" };

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const avatarCollection = db.collection('avatars');
const loggedInCollection = db.collection('loggedIn');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

export async function getUserByName(username) {
  return userCollection.findOne({ username: username });
}

export async function getUserByEmail(email) {
  return userCollection.findOne({ email: email });
}

export async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

export async function getAvatar(username) {
  return avatarCollection.findOne({ username: username });
}

export async function getLoggedIn() {
  return loggedInCollection.find().toArray();
}

export function resetLoggedIn() {
  loggedInCollection.deleteMany({});
}

export async function createUser(email, username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid()
  };
  await userCollection.insertOne(user);

  return user;
}

export async function createAvatar(username, prompt, image) {

  const avatar = {
    username: username,
    prompt: prompt,
    image: image,
    byte: 25,
  };

  avatarCollection.insertOne(avatar);

  return avatar;
}

export async function updateScore(username, score) {
  try {
    await avatarCollection.updateOne(
      { username: username },
      { $set: { byte: score } }
    );

    return { score: score };

  } catch (error) {
    return null;
  }
}

export async function addLoggedIn(avatar) {
  const user = await loggedInCollection.findOne({ username: avatar.username });
  if (!user) {
    loggedInCollection.insertOne(avatar);
  }
}

export async function removeLoggedInByToken(token) {
  if (!token) {
    return;
  }
  const user = await userCollection.findOne({ token: token });
  return loggedInCollection.deleteOne({ username: user.username });
}