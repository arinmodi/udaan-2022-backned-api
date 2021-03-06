const router = require('express').Router({ mergeParams: true });
const validate  = require('../helpers/validation');
const vote = require('./vote');
const getVotes = require('./getVotes');
const schema = require('./validation');

router.patch('/vote', validate(schema) ,vote);
router.get('/udaan22/fetch/votes/awards/red/carpet', getVotes);

module.exports = router;