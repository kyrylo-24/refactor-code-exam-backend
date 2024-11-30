import { expect, test } from "bun:test";

interface Data {
    warningsByState: {
        states: string[];
        results: Record<string, string[]>;
    };
    detailedWarning: {
        id: string;
        result: any;
    };
}

const data: Data = require("./data.json");


test("list warnings with states", async () => {
    const states = data.warningsByState.states;
    const results = data.warningsByState.results;

    // Check each state has matching results
    for (const state of states) {
        console.log(`Checking state: ${state}`);
        const response = await fetch(`http://localhost:3000/?state=${state}`);
        expect(response.status).toBe(200);

        // Wait for server to update file
        await new Promise(resolve => setTimeout(resolve, 1000));

        const warnings = await response.json();
        results[state].forEach(expectedWarning => {
            expect(warnings).toContain(expectedWarning);
        });
    }
});

test("list warnings without state", async () => {
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
});

test("get detailed warning", async () => {
    const response = await fetch(`http://localhost:3000/warning/${data.detailedWarning.id}`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(data.detailedWarning.result);
});
