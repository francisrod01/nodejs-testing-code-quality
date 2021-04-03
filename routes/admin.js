var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:route:admin')
const _ = require('lodash');
const reservations = require('../lib/reservations');

/* GET admin listing. */
router.get('/', function(req, res, next) {
  reservations.getAll()
    .then((reservations) => {
      res.render('admin', {
        title: 'Booking Requests - Nadia\'s Garden',
        reservations,
        header: _.keys(reservations[0])
      });
    })
});

module.exports = router;
