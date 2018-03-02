let routes = require('express').Router(),
    json2xml = require('json2xml'),
    debug = require('../../../debugger'),
    route_debugger = new debug('NetUpdateSOAP');

route_debugger.success('Loading \'NetUpdateSOAP\'');
/**
 * [POST]
 * Replacement for: https://nus.wup.shop.nintendo.net/nus/services/NetUpdateSOAP
 * Description: Returns console titlehash to check if any apps need updating
 */
routes.all('/', (request, response) => {
    response.set('Content-Type', 'text/xml;charset=utf-8');

    let SOAPXML = request.body;

    response.send(json2xml({
        attributes: {
            "xmlns:soapenv": 'http://schemas.xmlsoap.org/soap/envelope/',
            "xmlns:xsd": 'http://www.w3.org/2001/XMLSchema',
            "xmlns:xsi": 'http://www.w3.org/2001/XMLSchema-instance',
        },
        "soapenv:Envelope": {
            "soapenv:Body": {
                attributes: {
                    xmlns: 'urn:nus.wsapi.broadon.com',
                },
                GetSystemTitleHashResponse: {
                    Version: SOAPXML['SOAP-ENV:Body']['nus:GetSystemTitleHash']['nus:Version'],
                    DeviceId: SOAPXML['SOAP-ENV:Body']['nus:GetSystemTitleHash']['nus:DeviceId'],
                    MessageId: SOAPXML['SOAP-ENV:Body']['nus:GetSystemTitleHash']['nus:MessageId'],
                    TimeStamp: Date.now(),
                    ErrorCode: '0',
                    TitleHash: '0',
                }
            }
        }
    }, {
        attributes_key: 'attributes'
    }));
});

module.exports = routes;