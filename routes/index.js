const express = require('express');
const { handleRequest } = require('../controllers');
const router = express.Router();
const apicache = require('apicache');


cache = apicache.middleware;

// which database is being used for caching and which algorithm is being implemented.
router.get('/',cache('2 minutes'), handleRequest); 

module.exports=router;