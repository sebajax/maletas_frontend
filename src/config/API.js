import { URL_API } from './ConfigApi';

const axios = require('axios');
const http = require('http');
const https = require('https');

 export default axios.create({

    baseUrl: URL_API,

    //60 sec timeout
    timeout: 60000,

    //keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    
    //follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,
    
    //cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000
});