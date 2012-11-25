turret.js
===================

Are you still there?
--------------------

This is a small library that helps you to determine the current visibility state of your page.

Every time the state changes, turret fires one of three events: `hello` when the page becomes visible, `whereareyou` when the page gets in the background and `goodbye` when the tab changes or the browser was minimized

*Hello*, *Where are you?* and *Goodbye* are derived from the cute [Turrets from Portal](http://www.youtube.com/watch?v=r_imBPDKN_M), a game by Valve.
If you want something more serious, you can change it at the last line of `turret.js`

Dispensing Product
------------------

To detect whether the page is hidden or just in the background, `turret.js` uses the page visibility or request animation frame API where applicable, falling back to a simple blur/focus detection.
You can check if turret.js uses one of those fancy HTML5 mehods by checking `turret.method` which returns either `pagevisibility`, `requestanimationframe` or `none`

Deploying
---------

To listen to the `turret.js` events

```javascript
turret.on('hello', function(previousState) {
  //... page visible
})

turret.on('goodbye', function(previousState) {
  //... page hidden
})

turret.on('whereareyou', function(previousState) {
  //... page is visible but user is looking at something different
})
```

If you had enough of all that `turret.js` nonsense, you can remove handlers

```javascript
turret.remove('goodbye', handlerName)
```

You can fire the events yourself (but I don't know why)

```javascript
turret.fire('hello')
```

(pssst... you could even abuse this to fire your own events ... like ... 'chocoladecheesecake')

`turret.js` fires the first time, when the page becomes visible

Sorry
-----

Due to the lack of Windows, IE(6) support is not yet implemented but will follow
