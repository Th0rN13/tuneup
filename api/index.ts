import express from 'express';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import sanitizer from 'express-caja-sanitizer';

const app: Express = express();
const { URL } = require('url');
type Request = import('express').Request;
type Response = import('express').Response;
type Express = import('express').Express;

const SALT = process.env.SALT || 'salt';
const AUTH_URL: string = 'https://login.eveonline.com/v2/oauth/authorize/';
const SCOPES = [
  "esi-skills.read_skills.v1",
];
const BACK_URL = "https://eve-tuneup.site/callback.html";
const STATE_STR = "etu";
const dbParams = {
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'test',
  password: process.env.DB_PASS || 'test',
  database: process.env.DB_BASE || 'test',
};

app.use(express.json());
app.use(sanitizer());

const dbQuery = async (query: String) => {
  let result = await mysql.createConnection(dbParams)
    .then((conn) => (conn.query(query)))
    .then(([rows, fields]) => (rows))
    .then((rows) => (rows));
  return result;
}

const hashOn = (query: string) => {
  return new Promise( (resolve) => {
    const hash = crypto.createHash('sha512');
    hash.on('readable', () => {
      resolve(hash.read().toString('hex'))
    });
    hash.write(query);
    hash.end();
  })
}

const getHash = async (query: string) => {
  return await hashOn('query');
}

app.get('/url', function (req: Request, res: Response) {
  let myUrl = new URL(AUTH_URL);
  myUrl.searchParams.append("response_type", "code");
  myUrl.searchParams.append("redirect_uri", BACK_URL);
  myUrl.searchParams.append("client_id", process.env.CLIENT_ID || '');
  myUrl.searchParams.append("scope", SCOPES.join(" "));
  myUrl.searchParams.append("state", STATE_STR);
  res.send(myUrl.href);
});

app.get('/hash', function (req: Request, res: Response) {
  getHash('data')
    .then((result) => {
      res.send(result);
    });
});

app.get('/user', function (req: Request, res: Response) {
  if (req.query.user) {
    dbQuery("SELECT * FROM `accounts` WHERE `login` LIKE '"+req.query.user+"'")
      .then((result) => {
        res.send(result);
      });
  } else {
    res.send('Need user parameter in query');
  }
});

app.post('/', function (req: Request, res: Response) {
  res.send('POST request to API');
});

export default {
   path: '/api',
   handler: app
}
