const router = require('express').Router();

router.use('/articles', require('./api/articles'));
router.use('/users', require('./api/users'));
router.use('/images', require('./api/images'));

module.exports = router;