import * as ohm from "ohm-js"

export default function interpret(match) {
    const grammar = match.matcher.grammar;
    const memory = new Map();
    const interpreter = grammar.createSemantics();

    interpreter.addOperation("eval", {
        Program(statements) {
            for (const statement of statements.children) {
                statement.eval()
            }
        },
        Stmt_increment(_plusPlus, id, _semicolon) {},
        VarDec(_let, id, _equals, exp, _semicolon) {
            memory.set(id.sourceString, exp.eval());
        },
        PrintStmt(_print, exp, _semicolon) {
            console.log(exp.eval())
        },
        WhileStmt(_while, exp, block) {},
        IfStmt(_if, exp, block, _else, elseBlock) {},
        numeral(digits) {
            return Number(digits.sourceString);
        },
        id(first, rest) {
            const name = String(first.sourceString + rest.sourceString)
            if (!memory.has(name)) {
                throw new Error("Undefined variable " + name);
            }
            return memory.get(name);
        },
        Exp_parens(_parenStart, exp, _parenEnd) {
            exp.eval()
        }
    });
    throw interpreter(match).eval();
}