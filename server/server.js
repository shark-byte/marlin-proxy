const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantsInfoRouter = require('./routes/routes.js');
const bundleRouter = require('./routes/bundleRouter.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './../public/index.html'));
});
app.get('/restaurants/:widget/bundle.js', bundleRouter);
app.get('/:widget/bundle.js', bundleRouter);
app.get('/api/restaurants/:id/overview', restaurantsInfoRouter);


app.listen(4001, () => {
  console.log('Proxy listening on port 4001');
});