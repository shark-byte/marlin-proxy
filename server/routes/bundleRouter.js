const express = require('express');

const bundleRoutes = {
  gallery: (req, res) => res.redirect('http://127.0.0.1:3001/restaurants/id/bundle.js'),
  overview: (req, res) => res.redirect('http://127.0.0.1:3002/restaurants/id/bundle.js'),
  sidebar: (req, res) => res.redirect('http://127.0.0.1:3003/restaurants/id/bundle.js'),
  recommendations: (req, res) => res.redirect('http://127.0.0.1:3004/restaurants/id/bundle.js'),
};

const bundleRouter = (req, res) => {
  if (bundleRoutes[req.params.widget]) {
    bundleRoutes[req.params.widget](req, res)
  } else {
    res.sendStatus(404);
  }
};


module.exports = bundleRouter;
