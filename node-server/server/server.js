const express = require('express');
const path = require('path');
const request = require('request-promise-native');

const app = express();

app.get('/', (req, res) => {
  res.status(302).redirect('/restaurants/75/');
})

// app.use('/', express.static('public'));

app.get('/restaurants/:id', async (req, res) => {
  let galleryHtml, nearbyHtml, sidebarHtml, overviewHtml;
  const { id } = req.params;
  const services = {
    'gallery': `http://localhost:3001/gallery/restaurant/${id}`,
    'nearby': `http://localhost:8000/nearby/restaurant/${id}`,
    'sidebar': `http://localhost:3003/sidebar/restaurant/${id}`,
    'overview': `http://localhost:8000/overview/restaurant/${id}`,
  }

  await request(services['gallery'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  // await request(services['nearby'], (error, response, body) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     galleryHtml = body;
  //   }
  // });

  await request(services['sidebar'], (error, response, body) => {
    if (error) {
      throw error;
    } else {
      galleryHtml = body;
    }
  });

  // await request(services['overview'], (error, response, body) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     galleryHtml = body;
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
        ${galleryHtml}

        ${sidebarHtml}

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
