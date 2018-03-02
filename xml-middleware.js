// XML POST method handler

let http = require('http'),
    XML = require('pixl-xml');

module.exports = middleware;

function middleware() {
    return XMLMiddleware;

    function XMLMiddleware(request, response, next) {
        console.log(request.method)
        if (request.method == 'POST' || request.method == 'PUT') {
            let headers = request.headers,
                body = '';
            
            if (
                !headers['content-type'] ||
                !~headers['content-type'].indexOf('text/xml')
            ) {
                return next();
            }

            request.setEncoding('utf-8');
            request.on('data', (chunk) => {
                body += chunk;
            });

            request.on('end', () => {
                console.log(body)
                try {
                    request.body = XML.parse(body);
                } catch (error) {
                    return next();
                }

                next();
            });
        } else {
            next();
        }
    }
}