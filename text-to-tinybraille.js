'use strict';
var textToTinyBraille=(function (input) {
//http://www.alanwood.net/unicode/braille_patterns.html
//dots:
   //,___,
   //|1 4|
   //|2 5|
   //|3 6|
   //|7 8|
   //`````
var pixel_map = [[0x01, 0x08],
                 [0x02, 0x10],
                 [0x04, 0x20],
                 [0x40, 0x80]]
var braille_char_start = 0x2800
var x=1
var y=3
var test=pixel_map[y % 4][x % 2]
x=0
y=0
var test2=pixel_map[y % 4][x % 2]
console.log(test);
console.log(test2);
var charid=test|test2
console.log(charid)

return String.fromCharCode(braille_char_start + charid);
//return test
});
if (typeof module !== 'undefined') { module.exports = textToTinyBraille; }
