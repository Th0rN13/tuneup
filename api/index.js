import Express, { Router } from 'express';
// const router = Router();
// const express = Express();
const app = Express();

// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, express.request);
//   Object.setPrototypeOf(res, express.response);
//   req.res = res;
//   res.req = req;
//   next();
// })

// router.post('/char', (req, res) => {
//   console.log('Posted char!', req.body.data);
//   res.status(200).json({message : 'Success!'});
// })

// router.get('/char', (req, res) => {
//   console.log('Get char!', req.body.data);
//   res.status(200).json({ message: 'Success!' });
// })

app.get('/', function (req, res) {
  res.send('GET request to APIv3');
});

app.post('/', function (req, res) {
  res.send('POST request to APIv3');
});

export default {
   path: '/api',
   handler: app
}