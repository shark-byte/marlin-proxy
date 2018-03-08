const express = require('express');const router = express.Router();

const routes = {
  gallery: (req, res) => res.redirect(`http://127.0.0.1:3001/api/restaurants/${req.params.id}/gallery`),
  overview: (req, res) => res.redirect(`http://127.0.0.1:3002/api/restaurants/${req.params.id}/overview`),
  sidebar: (req, res) => res.redirect(`http://127.0.0.1:3003/api/restaurants/${req.params.id}/sidebar`),
  recommendations: (req, res) => res.redirect(`http://127.0.0.1:3004/api/restaurants/${req.params.id}/recommendations`),
}

router.get('/api/restaurants/:id/:widget', (req, res) => {
  if (routes[req.params.widget]) {
    routes[req.params.widget](req, res)
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
