'use strict';


exports.bound = function(obj, funcName, cb) {
  'use strict';
  var f = obj[funcName];

  if((typeof f) === 'function') {
    var bound_f = f.bind(obj);
    if(cb) {
      cb(bound_f);
    }

    return bound_f;
  }
}


exports.rt = function(obj, cb) {
  'use strict';
  function binder(funcName, cb2) {
    return exports.bound(binder.this, funcName, cb2);
  }

  // Expose obj just in case people need to
  // debug their code.
  binder.this = obj;

  if(cb) {
    cb(binder);
  }

  return binder;
}
