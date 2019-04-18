import express, { Request, Response, Express } from 'express';


const app: Express = express();

app.get('/', function (req: Request, res: Response) {
  res.send('GET request to API');
});

app.post('/', function (req: Request, res: Response) {
  res.send('POST request to API');
});

export default {
   path: '/api',
   handler: app
}