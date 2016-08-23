var baseTokens = ["MOVE", "TURN LEFT", "PUT", "PICK", "REPEAT",
                  "WHILE", "IF", "IS", "NOT", "WALL", "MARKER",
                  "NORTH", "SOUTH", "EAST", "WEST", "END", "LEARN", "ERROR"];

var tokenStream = [];

var token = function (str) {
    str = str.trim().split(' ');

    this.values = [];

    baseTokens.forEach((baseToken) => {
        str.forEach((single, index) => {
            if (baseToken === single && index === 0) {
                this.tokenType = baseToken;
            } else if (baseToken === single) {
                this.values.push(baseToken);
            }
        });
    });

    if (typeof this.tokenType == 'undefined' ) {
        throw "Unknown Token "+str;
    } else {
        return this;
    }
}

var program = "MOVE\nMOVE\nIF WALL\nMOVE";

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

