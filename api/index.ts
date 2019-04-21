import express from 'express';
import mysql from 'mysql2/promise';

const app: Express = express();
const { URL } = require('url');
type Request = import('express').Request;
type Response = import('express').Response;
type Express = import('express').Express;

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

const dbQuery = async (query: String) => {
  let result;
  await mysql.createConnection(dbParams)
    .then((conn) => (conn.query(query)))
    .then(([rows, fields]) => (result = rows))
  return result;
}

app.get('/', function (req: Request, res: Response) {
  let myUrl = new URL(AUTH_URL);
  myUrl.searchParams.append("response_type", "code");
  myUrl.searchParams.append("redirect_uri", BACK_URL);
  myUrl.searchParams.append("client_id", process.env.CLIENT_ID || '');
  myUrl.searchParams.append("scope", SCOPES.join(" "));
  myUrl.searchParams.append("state", STATE_STR);
  dbQuery('SELECT * FROM `accounts` WHERE 1')
    .then((result) => {
      res.send(result);
    });
  // res.send(myUrl.href);
});

app.post('/', function (req: Request, res: Response) {
  res.send('POST request to API');
});

export default {
   path: '/api',
   handler: app
}
