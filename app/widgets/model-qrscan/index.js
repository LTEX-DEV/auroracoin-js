'use strict';

var Ractive = require('hive-modal')
var emitter = require('hive-emitter')
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
  
  var qrDecoder=new QCodeDecoder()
  
 if(!qrDecoder.isCanvasSupported()||!qrDecoder.hasGetUserMedia())
 {
 var msgNode=ractive.nodes['msg']
 
 msgNode.appendChild('<span>Your browser does not match the required specs. Canvas and getUserMedia are require. </span>')
 
 }
ractive.on('capture',function(){
   var canvas = document.querySelector("#qrscan-canvas video")
   
   qrDecoder.decodeFromCamera(canvas, function(er,res){
     
    var msgNode=ractive.nodes['msg']
     
     if(er)
     {
     msgNode.appendChild('<span>' + er + '</span>')
     }else
     {
     msgNode.appendChild('<span>' + res + '</span>')
     
     var splt=res.split("?")
     
     var address=splt[0].split(":")[1]
     var amount=splt[1].split("=")[1]
     
     ractive.set('address',address)
     ractive.set('amount',amount)
     
     }
      
      
  },!0)
 
})
 

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




