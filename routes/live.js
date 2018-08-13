var express = require('express');
var router = express.Router();

/* GET live page. */
router.get('/:id', function(req, res, next) {
  res.render('live', { title: '直播间' });
});

module.exports = router;
