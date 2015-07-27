# remember-this #

Easily create functions bound to a specific object.

## Purpose ##

JavaScript changes the value of the ```this``` variable depending upon how a function is invoked.  For example:

```javascript
var person = {
  name: "Brian",
  getName: function() {
    return this.name;
  }
}

// Prints "Brian"
console.log(person.getName());


var getNameDetached = person.getName;

// Prints "undefined"
console.log(getNameDetached());
```

Why did it print "undefined"?  Because ```getNameDetached``` was not invoked through the ```person``` object.  Instead, it was invoked as a stand-alone function, so its ```this``` variable was bound to JavaScript's global object.  To fix this, you would instead need to do:

```javascript
// Manually bind the function back to person
var getNameAttached = person.getName.bind(person);

// Prints "Brian"
console.log(getNameAttached());
```

In other words: you need to get the function from ```person```, then remember to bind it back to ```person```.  This is easy to forget, and it can introduce some very bizarre bugs into your code.

But, good news!  ```remember-this``` provides a couple of functions that encapsulate this pattern so that your life can be awesome!


## Installation ##

```
npm install remember-this
```

## Usage ##

Let's pretend that I'm wiring together my routes for an Express.js application.  I want the routes to call the methods (erm... functions) on my ```usersController``` object.  I can achieve this as follows:


```javascript
var router           = express.Router();
var usersControllers = new UsersController(...);


// rt stands for "Remember This"
var rt = require('remember-this').rt;

// Creates the function c(funcName).  It grabs
// usersController[funcName] and binds it back to
// usersController.
var c = rt(usersController);


// Equivalent to:
//   router.get('/', usersController.index.bind(usersController));
//
router.get('/', c('index'));


// Equivalent to:
//   router.get('/:id', usersController.show.bind(usersController));
//
router.get('/:id', c('show'));
```

In other words: I used the ```rt(...)``` function to create the ```c(...)``` function.  The ```c(...)``` function grabs methods (erm... functions) from ```usersController``` and binds them back to ```usersController```.

If you want to keep the number of local variables down to a minimum, then you can pass a callback to the ```rt(...)``` function instead.  For example:



```javascript
var router           = express.Router();
var usersControllers = new UsersController(...);


// rt stands for "Remember This"
var rt = require('remember-this').rt;


rt(usersController, function(c) {
  router.get('/', c('index'));
  router.get('/:id', c('show'));
});
```

Or, maybe your ```usersController``` only contains 1 method that you want to pass to your router.  In that case, you can use the ```bound``` function instead:

```javascript
var router           = express.Router();
var usersControllers = new UsersController(...);

var bound = require('remember-this').bound;

router.get('/:id', bound(usersController, "show"));
```