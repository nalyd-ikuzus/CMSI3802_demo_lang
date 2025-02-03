import * as fs from "fs";
import * as ohm from "ohm-js";

export default function parse(sourceCodeFileName) {
    const sourceCode = fs.readFileSync(sourceCodeFileName, "utf8");
    const grammar = ohm.grammar(fs.readFileSync("src/cassowary.ohm", "utf8"));
    const match = grammar.match(sourceCode);
    if (match.failed()) {
        throw match.message;
    } else if (match.succeeded()) {
        console.log("Grammar matched successfully");
    }
    return match;
}