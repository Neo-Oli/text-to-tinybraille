'use strict';
var textToTinyBraille=(function (lines) {
    // http://www.alanwood.net/unicode/braille_patterns.html
    //dots:
    //,___,
    //|1 4|
    //|2 5|
    //|3 6|
    //|7 8|
    //`````
    var braille_char_start = 0x2800
    var pixel_map = [[0x01, 0x08],
        [0x02, 0x10],
        [0x04, 0x20],
        [0x40, 0x80]]
    var charactermap={
        "A":["123","02","123"],
        "B":["0123","013","12"],
        "C":["12","03","03"],
        "D":["0123","03","12"],
        "E":["0123","013","03"],
        "F":["0123","02","0"],
        "G":["12","03","023"],
        "H":["0123","2","0123"],
        "I":["03","0123","03"],
        "J":["2","3","012"],
        "K":["0123","2","12","03"],
        "L":["0123","3","3"],
        "M":["0123","1","2","1","0123"],
        "N":["0123","1","2","0123"],
        "O":["12","03","03","12"],
        "P":["0123","02","1"],
        "Q":["12","03","023","123"],
        "R":["0123","02","13"],
        "S":["13","03","02"],
        "T":["0","0123","0"],
        "U":["012","3","3","012"],
        "V":["01","2","3","2","01"],
        "W":["012","3","12","3","012"],
        "X":["023","1","023"],
        "Y":["0","1","23","1","0"],
        "Z":["03","023","013","03"],
        ".":["3"],
        ",":["3","2"],
        ";":["3","02"],
        ":":["13"],
        "!":["013"],
        "?":["0","03","1"],
        "(":["12","03"],
        ")":["03","12"],
        " ":["",""],
        "+":["2","123","2"],
        "-":["2","2","2"],
        "\"":["01","","01"],
        "'":["01"],
        ">":["13","2"],
        "<":["2","13"],
        "%":["03","2","1","03"],
        "[":["0123","03"],
        "]":["03","0123"],
        "{":["2","123","13"],
        "}":["13","123","2"],
        "_":["3","3","3"],
        "0":["12","03","12"],
        "1":["13","0123","3"],
        "2":["023","03","13"],
        "3":["03","013","12"],
        "4":["12","2","0123"],
        "5":["013","03","02"],
        "6":["123","023","023"],
        "7":["03","02","01"],
        "8":["12","013","12"],
        "9":["12","02","0123"],
        "/":["3","2","1","0"],
        "\\":["0","1","2","3"],
        "^":["1","0","1"],
        "~":["1","0","1","0"],
        "|":["0123"],
    };
    if(!input){
        input="";
    }
    lines=lines.replace("\r\n","\n");
    lines=lines.split("\n");
    var outputlines=[];
    for(var line in lines){
        var input=lines[line];
        input=input.toUpperCase()
        var ids=[];
        var si=0; //slicecount
        var charid=0; //id of the current braille character
        for (var i = 0, len = input.length; i < len; i++) {
            var c=input[i];
            if(charactermap[c]){
                var cm=charactermap[c].slice()
                //emtpy slice at the end of each characters
                cm.push("");
                for (var l in cm){
                    var slice=cm[l];
                    for(var k in slice){
                        var pixel=slice[k];
                        var add=pixel_map[pixel][si%2];
                        charid|=add;
                    }
                    si+=1;

                    ids.push(charid)
                    charid=0;
                }
            }
        }
        if(si % 2){
            ids.push(charid)
        }
        var braillecharacters=[];
        for (var i = 0, len = ids.length; i < len; i+=2) {
            var id=ids[i]|ids[i+1]
            var nextid=ids[i+2]|ids[i+3]
            if(!id && nextid){
                //For better line breaks replace empty Braille Pattern Blank with a space
                braillecharacters[i]=" ";
            }else{
                braillecharacters[i]=String.fromCharCode(braille_char_start+id);
            }
        }
        //if last character is a space, remove it
        if([" ","⠀"].includes(braillecharacters[braillecharacters.length -1 ])){
            braillecharacters.splice(-1);
        }
        outputlines.push(braillecharacters.join(""));
    }
    var output=outputlines.join("\n");
    return output;
});
if (typeof module !== 'undefined') { module.exports = textToTinyBraille; }
