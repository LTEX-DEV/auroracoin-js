'use strict';

var xhr = require('xhr')

//var apiLTCRoot = "https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC"
var apiAURRoot = "https://bittrex.com/api/v1.1/public/getticker?market=BTC-AUR"

/*function ltcToBtc(callback){
 
  var corsUri = process.env.PROXY_URL  + encodeURIComponent(apiLTCRoot)
  
  xhr({
    uri: corsUri ,
    timeout: 10000,
    method: 'GET'
  }, function(err, resp, body){
    if(resp.statusCode !== 200) {
      console.error(body)
      return callback(err)
    }

    callback(null, toRate(JSON.parse(body)))
  })
}*/

function aurToBtc(callback){
   var corsUri = process.env.PROXY_URL  + encodeURIComponent(apiAURRoot)
  
  xhr({
    uri:corsUri,
    timeout: 10000,
    method: 'GET'
  }, function(err, resp, body){
    if(resp.statusCode !== 200) {
      console.error(body)
      return callback(err)
    }

    callback(null, toRate(JSON.parse(body)))
  })
}




function toRate(res){
  var price=res.result.Last
  return price
}



/*function toRate(res){
  var validQuotes = res.data.prices
  .map(function(quote){
    return parseFloat(quote.price)
  })
  .filter(function(price){
    return price === price && price !== 0 // not NaN nor 0
  })

  return validQuotes.reduce(function(memo, price, i, array){
    var total = memo + price
    if(i === array.length - 1){
      return total / array.length
    }

    return total
  }, 0)
}
*/

module.exports = {
 // ltcToBtc: ltcToBtc,
  aurToBtc: aurToBtc
}
