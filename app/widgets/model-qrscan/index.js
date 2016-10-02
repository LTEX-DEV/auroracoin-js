'use strict';

var Ractive = require('hive-modal')
var emitter = require('hive-emitter')
var qrcode = require('hive-qrcode')
var getNetwork = require('hive-network')

module.exports = function showTooltip(){

  var ractive = new Ractive({
    el: document.getElementById('tooltip'),
    partials: {
      content: require('./content.ract').template,
    },
    data:
    {
    address:"",
    amount:""
    }    
  })

  var canvas = ractive.nodes['qrscan-canvas']
  var qr = qrcode(getNetwork() + ':' + ractive.get('address'))
  canvas.appendChild(qr)

  ractive.on('close', function(){
    ractive.fire('cancel')
  })

ractive.on('ok',function()
{
emitter.emit('prefill-wallet', ractive.get('address'))
emitter.emit('prefill-price', ractive.get('amount'))
})

  return ractive
}




