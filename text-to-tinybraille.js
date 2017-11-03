'use strict';
var myfunc = (function () { function myfunc() {
return "Hello World";
} return myfunc; })();

if (typeof module !== 'undefined') { module.exports = myfunc; }
