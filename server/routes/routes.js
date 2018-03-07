const express = require('express');
const router = express.Router();

router.get('/api/restaurants/:id/overview', (req, res) => {
  console.log('this is the incoming ID', req.params.id)
  res.redirect(`http://127.0.0.1:3001/api/restaurants/${req.params.id}/overview`);
});

module.exports = router;
