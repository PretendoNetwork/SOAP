const express = require('express');
const subdomain = require('express-subdomain');
const logger = require('../logger');

const ctrRouter = express.Router();

const ecsRouter = express.Router();
const ccsRouter = express.Router();
const ccsCDNRouter = express.Router();

const routes = require('./routes');

// Create subdomains
logger.info('[CTR] Creating \'ecs.c.shop\' subdomain');
ctrRouter.use(subdomain('ecs.c.shop', ecsRouter));

logger.info('[CTR] Creating \'ccs.c.shop\' subdomain');
ctrRouter.use(subdomain('ccs.c.shop', ccsRouter));

logger.info('[CTR] Creating \'ccs.cdn.c.shop\' subdomain');
ctrRouter.use(subdomain('ccs.cdn.c.shop', ccsCDNRouter));

// Setup routes
logger.info('[CTR] Applying imported routes');
ecsRouter.use('/ecs/services/ECommerceSOAP', routes.ECOMMERCE);
ccsRouter.use('/ccs', routes.CCS);
ccsCDNRouter.use('/ccs', routes.CCS_CDN);

module.exports = ctrRouter;