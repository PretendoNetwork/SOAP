//////////////////////////////////////////////////////////////////
///                                                            ///
///                        Dependencies                        ///
///                                                            ///
//////////////////////////////////////////////////////////////////

let port = 8080,
    debug = require('./debugger'),
    path = require('path'),
    express = require('express'),
    subdomain = require('express-subdomain'),
    XMLMiddleware = require('./xml-middleware'),
    colors = require('colors'),
    morgan = require('morgan'),
    app = express();

let server_debugger = new debug('Server');

// Routers and subdomains
const ROUTERS = {
    WUP: { // WiiU
        CAS_WUP_SHOP: express.Router(),
        CCS_CDN_WUP_SHOP: express.Router(),
        ECS_WUP_SHOP: express.Router(),
        IAS_WUP_SHOP: express.Router(),
        PUS_WUP_SHOP: express.Router()
    },
    CTR: { // Old 3DS/2DS
    },
    KTR: { // New 3DS/2DS
    },
}

// Route definitions
server_debugger.log('Importing routes');
const ROUTES = {
    WUP: { // WiiU
        SOAP: {
            NET_UPDATE: require('./routes/wup/pus.wup.shop/NetUpdateSOAP')
        }
    },
    CTR: { // Old 3DS/2DS
    },
    KTR: { // New 3DS/2DS
    },
}

// START APPLICATION
app.set('etag', false);

// Create router
server_debugger.log('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.json());
app.use(XMLMiddleware());
app.use(express.urlencoded({
    extended: true
}));

// Create WUP subdomains
server_debugger.log('Creating \'cas.wup.shop\' subdomain');
app.use(subdomain('cas.wup.shop', ROUTERS.WUP.CAS_WUP_SHOP));

server_debugger.log('Creating \'ccs.cdn.wup.shop\' subdomain');
app.use(subdomain('ccs.cdn.wup.shop', ROUTERS.WUP.CCS_CDN_WUP_SHOP));

server_debugger.log('Creating \'ecs.wup.shop\' subdomain');
app.use(subdomain('ecs.wup.shop', ROUTERS.WUP.ECS_WUP_SHOP));

server_debugger.log('Creating \'ias.wup.shop\' subdomain');
app.use(subdomain('ias.wup.shop', ROUTERS.WUP.IAS_WUP_SHOP));

server_debugger.log('Creating \'pus.wup.shop\' subdomain');
app.use(subdomain('pus.wup.shop', ROUTERS.WUP.PUS_WUP_SHOP));

// Setup routes
server_debugger.log('Applying imported routes');
ROUTERS.WUP.PUS_WUP_SHOP.use('/pus/services/NetUpdateSOAP', ROUTES.WUP.SOAP.NET_UPDATE); // NetUpdateSOAP

// 404 handler
server_debugger.log('Creating 404 status handler');
app.use((request, response) => {
    response.status(404);
    response.send();
});

// non-404 error handler
server_debugger.log('Creating non-404 status handler');
app.use((error, request, response) => {
    let status = error.status || 500;
    response.status(status);
    response.json({
        app: 'api',
        status: status,
        error: error.message
    });
});

// Starts the server
server_debugger.log('Starting server');
app.listen(port, () => {
    server_debugger.log('Started '.green + 'on port '.blue + new String(port).yellow);
});