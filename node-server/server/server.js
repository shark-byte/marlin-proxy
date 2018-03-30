const express = require('express');
const path = require('path');
const request = require('request-promise-native');

const app = express();

app.get('/', (req, res) => {
  res.status(302).redirect('/restaurants/75/');
})

// app.use('/', express.static('public'));

const hostname = 'proxy';

app.get('/restaurants/:id', async (req, res) => {
  let galleryHtml, nearbyHtml, sidebarHtml, overviewHtml;
  const { id } = req.params;
  const services = {
    'gallery': `http://${hostname}:8888/gallery/restaurants/${id}`,
    'nearby': `http://${hostname}:8888/nearby/restaurants/${id}`,
    'sidebar': `http://${hostname}:8888/sidebar/restaurants/${id}`,
    'overview': `http://${hostname}:8888/overview/restaurants/${id}`,
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
      nearbyHtml = body;
    }
  });

  await request(services['sidebar'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      sidebarHtml = body;
    }
  });

  // await request(services['overview'], (error, response, body) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     overviewHtml = body;
  //   }
  // });

  const html = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/gallery/styles.css">
        <!-- <link rel="stylesheet" type="text/css" href="/nearby/styles.css"> -->
        <link rel="stylesheet" type="text/css" href="/sidebar/styles.css">
        <!-- <link rel="stylesheet" type="text/css" href="/overview/styles.css"> -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <!-- <link rel="icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico" type="image/x-icon"> -->
        <title>SharkByte</title>
      </head>
      <body>
        <div id="gallery-app">${galleryHtml}</div>
        <div id="midsection">
          <div id="overview-app"></div>
          <div id="sidebar-app">${sidebarHtml}</div>
        </div>
        <div id="nearby-app">${nearbyHtml}</div>
        <script src="/nearby/bundle.js"></script>
        <script src="/gallery/bundle.js"></script>
        <script src="/sidebar/bundle.js"></script>
        <!-- <script src="/overview/bundle.js"></script> -->
      </body>
    </html>
  `;
  
  res.send(html);
});

app.listen(4001, () => console.log('Proxy listening on port 4001'));
