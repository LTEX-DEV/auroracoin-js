var buildServer = require('../server/express')
var done = require('./util').done
var https = require('https')

var pkey = fs.readFileSync('key.pem');
var pcert = fs.readFileSync('cert.pem')

var options = {
    key: pkey,
    cert: pcert
};


function serve(callback) {
 
 var serverport = (process.env.NODE_ENV === 'production')? 443:80
 
 https.createServer(options, buildServer()).listen(serverport);
 

  done('server', 'start', callback)()
}

module.exports = serve
