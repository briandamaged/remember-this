

exports.bound = function(obj, funcName) {
  return obj[funcName].bind(obj);
}


exports.rt = function(obj, cb) {
  var retval = exports.bound.bind(null, obj)

  if(cb) {
    cb(retval);
  }

  return retval;
}
