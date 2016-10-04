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
    amount:"",
    msg:"",
    scanned:false
    }    
  })
  
  var qrDecoder=new QCodeDecoder()
  
 if(!qrDecoder.isCanvasSupported()||!qrDecoder.hasGetUserMedia()) {
  
 ractive.set('msg','Your browser does not match the required specs. Canvas and getUserMedia are require.')
  }

  function videoHandler(er,res){
     
     if(er)
     {
     ractive.set('msg',er)
     }
    else
     {
    
     
     var splt=res.split("?")
     
     var address=splt[0].split(":")[1]
     var amount=splt[1].split("=")[1]
     
     ractive.set('address',address)
     ractive.set('amount',amount)
     ractive.set('scanned',true)
     }      
      
  }  
  
  
  function startCapturing(){
   var canvas = ractive.nodes["camera"]
   
   qrDecoder.decodeFromCamera(canvas,videoHandler,!0)
 }
   
  startCapturing()
 
  ractive.on('close', function(){
    ractive.fire('cancel')
  })

  ractive.on('refresh',function(){
     startCapturing()
  })
  
ractive.on('done',function()
{
emitter.emit('prefill-wallet', ractive.get('address'))
emitter.emit('prefill-price', ractive.get('amount'))
ractive.fire('cancel')
})

  return ractive
}




