const express = require('express');
const path = require('path');
const restaurantsInfoRouter = require('./routes/routes.js');
const bundleRouter = require('./routes/bundleRouter.js');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  res.status(302).redirect('/restaurants/75/');
})

app.use('/', express.static('public'));

app.get('/restaurants/:id', async (req, res) => {
  let galleryHtml, nearbyHtml, sidebarHtml, overviewHtml;
  const { id } = req.params;
  const services = {
    'gallery': `http://localhost:3001/restaurant/${id}`,
    'nearby': `http://localhost:8000/restaurant/${id}`,
    'sidebar': '',
    'overview': '',
  }

  await request(services['gallery'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  await request(services['nearby'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  await request(services['sidebar'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  await request(services['overview'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  const html = `
    <html>
      <head>
        <!-- <link rel="stylesheet" href="/gallery/styles.css"> -->
        <!-- <link rel="stylesheet" href="/nearby/styles.css"> -->
        <!-- <link rel="stylesheet" href="/sidebar/styles.css"> -->
        <!-- <link rel="stylesheet" href="/overview/styles.css"> -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <!-- <link rel="icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico" type="image/x-icon"> -->
      </head>
      <body>
        ${galleryHtml}
        ${nearbyHtml}
        ${sidebarHtml}
        ${overviewHtml}
      </body>
    </html>
  `;
  
  res.send(html);
});

// app.get('/restaurants/:id/:service/bundle.js', bundleRouter);

// app.get('/api/restaurants/:id/:service', restaurantsInfoRouter);

app.listen(4001, () => console.log('Proxy listening on port 4001'));
