const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const collectionsController = require('./controllers/collectionsController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const app = express();
const apiRouter = require('./routes/apiRouter');
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//Routes
app.use('/api', apiRouter);

app.post('/signup', userController.createUser, cookieController.setJWTCookie, sessionController.startSession, (req, res) => {
  // TODO: Finish this route and it's middleware
  if (res.locals.status === 300) return res.sendStatus(300);
  res.sendStatus(200);
});

app.post('/login', userController.verifyUser, cookieController.setJWTCookie, sessionController.startSession, (req, res) => {
  // TODO: Finish this route and it's middleware
  if (res.locals.status === 300) return res.sendStatus(300);
  res.sendStatus(200);
});

// app.post('/addToWishlist', restaurantController.addRestaurant, collectionsController.addToWishlist, (req, res) => {
//   res.status(200);
//   res.send(res.locals);
// });

// app.post('/addToFavorites', restaurantController.addRestaurant, collectionsController.addToFavorites, (req, res) => {
//   res.status(200);
//   res.send(res.locals);
// });

// app.post('/addToReviews', restaurantController.addRestaurant, collectionsController.addToReviews, (req, res) => {
//   res.status(200);
//   res.send(res.locals);
// });

// app.get('/reviews', collectionsController.getReviews, (req, res) => {
//   res.status(200).send()
// })

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../client/src/index.html'));
});

app.use((error, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'}
  };
  const errorObj = Object.assign({}, defaultErr, error);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;