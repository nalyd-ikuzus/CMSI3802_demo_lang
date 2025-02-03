import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'
import { deepEqual } from 'node:assert';
import { parse } from '../src/cassowary.js';


describe("Interpreter", () => {
    it("parses correctly", () => {
        deepEqual(parse(), "I do not work");
    });
});