import * as fs from "fs";
import * as ohm from "ohm-js";

console.log("Hello from the cassowary interpreter!");

const interpreter = grammar.createSemantics();
interpreter.addOperation("eval", {
    //Go through each thing in your grammar
    Program(statements) {
        for (const statement of statements.children) {
            statement.eval()
        }
    }
});

function interpret(match) {
    
}

//Read the contents of our ohm file into a grammar in ohm
const grammar = ohm.grammar(fs.readFileSync("src/cassowary.ohm", "utf8"));
console.log(grammar);

const sourceCode = process.argv[2];
console.log("Code to parse: ", sourceCode);

const match = grammar.match(sourceCode);
if (match.succeeded()) {
    console.log("This program is syntactically correct, let's interpret it");
    interpreter(match).eval()
} else {
    console.error("This program is syntactically incorrect");
    console.error(match.message);
}

export function parse(input) {
    return "I do not work";
}