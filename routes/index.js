const router = require('express').Router({ mergeParams: true });
const validate  = require('../helpers/validation');
const vote = require('./vote');
const schema = require('./validation');

router.patch('/vote', validate(schema) ,vote);

module.exports = router;