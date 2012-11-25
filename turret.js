/**
 * areyoustillthere.js
 *
 * @author timmermann.dennis@googlemail.com
 * @license MIT
 * @todo make ie(e) ready (document.attachEvent ...)
 */

!function(window, document, visible, hidden, background) {

  var primary, secondary, time, visibility, animation, handle
    , vendors = ['ms', 'moz', 'webkit', 'o']
    , callbacks = { }, turret = {state: 'goodbye', method: 'none'}

  ,testAnimation = function ( ) {
    if (window.requestAnimationFrame) return 'requestAnimationFrame'
    for(var i = 0; i < vendors.length; i++ ) {
      if(window[vendors[i]+'RequestAnimationFrame'])
        return vendors[i]+'RequestAnimationFrame';
    }
  }

  ,testVisibility = function ( ) {
    if(document.visibilityState) return {state: document.visibilityState, change: 'visibilitychange'}
    for(var j = 0; j < vendors.length; j++ ) {
      if(document[vendors[j]+'VisibilityState'])
        return {state: vendors[j]+'VisibilityState', change: vendors[j]+'visibilitychange'}
    }
  }

  ,change = function(state) {
    if(state === turret.state) return
    turret.fire(state)
    turret.state = state
  }

  ,update = function ( ) {
    window.clearTimeout(handle)
    if(primary === 'visible') return change(visible)
    handle = setTimeout(function ( ) {
      check()
      if(primary === 'hidden' && secondary === 'visible') return change(background)
      if(primary === 'hidden' || secondary === 'hidden') return change(hidden)
      return change(visible)
    }, 100);
  }

  ,check = function ( ) {
    if(visibility) secondary = document[visibility.state]
    if(animation) secondary = (Date.now( )-time > 50) ? 'hidden' : 'visible'
  }

  if(visibility = testVisibility( )) {
    document.addEventListener(visibility.change, function ( ) {
      secondary = document[visibility.state]
      update( )
    })
    turret.method = 'pagevisibility'
  }else if(animation = testAnimation( )) {
    var draf = function (e) {
      time = e || Date.now( )
      window[animation](draf, time)
    }
    setInterval(function ( ) {
      var m = (Date.now( )-time > 500) ? 'hidden' : 'visible'
      if(m != secondary) {
        secondary = m
        update( )
      }
    }, 1000)

    draf( )
    turret.method = 'requestanimationframe'
  }

  window.addEventListener('blur', function ( ) {
    primary = 'hidden'
    update( )
  })

  window.addEventListener('focus', function ( ) {
    primary = 'visible'
    update( )
  })

  turret.on = function (key, f) {
    if(!callbacks[key]) callbacks[key] = [ ]
    callbacks[key].push(f)
  }

  turret.remove = function(key, f) {
    var fs = callbacks[key] || [ ]
    for(var i = 0; i < fs.length; i++) {
      if(fs[i] == f) return fs.splice(i,1)
    }
  }

  turret.fire = function (key) {
    var fs = callbacks[key] || [ ]
    for(var i = 0; i < fs.length; i++) {
      fs[i](this.state)
    }
  }

  window.turret = turret

  update( )
}(window, document, 'hello', 'goodbye', 'whereareyou')
