'use strict';

var xhr = require('xhr')
var currencies = require('./currencies')
//var ltcToBtc = require('./sochain').ltcToBtc
var aurToBtc = require('./sochain').aurToBtc

var ExchangeRateFunctions = {
 // bitcoin: getExchangeRates,
//  testnet: getExchangeRates,
//  litecoin: getLitecoinExchangeRates,
  auroracoin:getAuroracoinExchangeRates
}

function BitcoinAverage(network){
  BitcoinAverage.prototype.getExchangeRates = ExchangeRateFunctions[network]
  if(!BitcoinAverage.prototype.getExchangeRates) {
    throw new Error(network + " price ticker is not supported")
  }
}
BitcoinAverage.apiRoot = "https://apiv2.bitcoinaverage.com/indices/global/ticker/short"

/*function getLitecoinExchangeRates(callback){
  ltcToBtc(function(err, ltcRate){
    if(err) return callback(err);

    getExchangeRates(function(err, rates){
      if(err) return callback(err);

      for(var currency in rates){
        rates[currency] = rates[currency] * ltcRate
      }

      callback(null, rates)
    })
  })
} */

function getAuroracoinExchangeRates(callback){
  aurToBtc(function(err, aurRate){
    if(err) return callback(err);

    getExchangeRates(function(err, rates){
      if(err) return callback(err);

      for(var currency in rates){
        rates[currency] = rates[currency] * aurRate
      }

      callback(null, rates)
    })
  })
}


function getExchangeRates(callback){
  var uri = BitcoinAverage.apiRoot + "?crypto=BTC&fiat=AUD,BRL,CAD,CHF,CNY,DKK,EUR,GBP,IDR,ILS,ISK,JPY,MXN,NOK,NZD,PLN,RUB,SEK,SGD,TRY,UAH,USD,ZAR"
  xhr({
    uri: uri,
    timeout: 10000,
    method: 'GET'
  }, function(err, resp, body){
    if(resp.statusCode !== 200) {
      console.error(body)
      return callback(err)
    }

    callback(null, toRates(JSON.parse(body)))
  })
}

function toRates(apiRates){
  var rates = {}
  currencies.forEach(function(currency){
    rates[currency] = apiRates[currency].last
  })

  return rates
}

BitcoinAverage.prototype.getExchangeRates = getExchangeRates
module.exports = BitcoinAverage
