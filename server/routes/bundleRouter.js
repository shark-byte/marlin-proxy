const express = require('express');

const bundleRoutes = {
  gallery: (req, res) => res.redirect('http://127.0.0.1:3000/bundle.js'),
  overview: (req, res) => res.redirect('http://127.0.0.1:3001/bundle.js'),
  sidebar: (req, res) => res.redirect('http://127.0.0.1:3002/bundle.js'),
  recommendations: (req, res) => res.redirect('http://127.0.0.1:3003/bundle.js'),
}

const bundleRouter = (req, res) => {
  console.log('in this or not?', req.url);
  if (bundleRoutes[req.params.widget]) {
    bundleRoutes[req.params.widget](req, res)
  } else {
    res.sendStatus(404);
  }
};


module.exports = bundleRouter;
// (req, res) => res.redirect('http://127.0.0.1:3001/bundle.js')