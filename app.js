var baseTokens = ["MOVE", "TURN LEFT", "PUT", "PICK", "REPEAT",
                  "WHILE", "IF", "IS", "NOT", "WALL", "MARKER",
                  "NORTH", "SOUTH", "EAST", "WEST", "END", "LEARN", "ERROR"];
var customTokens = [];

var tokenStream = [];

var token = function (str) {
    str = str.trim().split(' ');

    this.values = [];
    str.forEach((single, index) => {
        baseTokens.some((baseToken) => {
            if (baseToken === single && index === 0) {
                this.tokenType = baseToken;
                return true;
            } else if (baseToken === single) {
                this.values.push(baseToken);
                return true;
            } else if (index !== 0 && this.tokenType == "LEARN") {
                this.values.push(single);
                customTokens.push(single);
                return true;
            } else if (index === 0) {
                customTokens.some((customToken) => {
                    if (customToken === single) {
                        this.tokenType = customToken;
                        return true;
                    }
                });
            }
        });
        if (index === 0 && typeof this.tokenType === 'undefined') {
            throw "Unknown Token "+single;
        }
    });

    if (typeof this.tokenType == 'undefined' ) {
        throw "Unknown Token "+str;
    } else {
        return this;
    }
}

var program = "MOVE\nMOVE\nIF WALL\nMOVE\nLEARN DVOJKROK\nDVOJKROK";

program = program.split('\n');

program.some(function (line, index) {
    try {
        tokenStream.push(new token(line));
    } catch (e) {
        console.log(e+" on line "+(index+1));
        process.exit();
    }
});

console.log(tokenStream);

