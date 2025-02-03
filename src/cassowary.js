import * as fs from "fs";
import * as ohm from "ohm-js";
import parse from "./parser.js";
import interpret from "./interpreter.js";

console.log("Hello from the cassowary interpreter!");

if (process.argv.length !== 3){
    console.error("Usage: node src/cassowary.js *FILENAME*");
    process.exit(1);
}
const inputFile = process.argv[2];
console.log("File to parse: ", inputFile);

try {
    //Syntax
    const match = parse(inputFile);
    //Semantics
    interpret(match);
} catch (e) {
    console.error(e);
    process.exit(1);
}

