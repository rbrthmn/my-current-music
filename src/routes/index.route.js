const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.get('/', (req, res) => res.redirect('/callback'));
router.route('/callback').get(controller.callback)
router.route('/login').get(controller.login)
router.route('/save-current-music').get(controller.currentMusic)

module.exports = router;