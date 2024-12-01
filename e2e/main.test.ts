import { expect, test } from "bun:test";

const legacyApiUrl = "http://localhost:3000";
const newApiUrl = "http://localhost:4001";

test("list warnings with states", async () => {
    const legacyResponse = await fetch(`${legacyApiUrl}/?state=NSW`);
    const newResponse = await fetch(`${newApiUrl}/?state=NSW`);

    expect(legacyResponse.status).toBe(200);
    expect(newResponse.status).toBe(200);
    expect(await legacyResponse.json()).toEqual(await newResponse.json());
})

test("list warnings without state", async () => {
    const legacyResponse = await fetch(`${legacyApiUrl}/`);
    const newResponse = await fetch(`${newApiUrl}/`);

    expect(legacyResponse.status).toBe(200);
    expect(newResponse.status).toBe(200);
    expect(await legacyResponse.json()).toEqual(await newResponse.json());
})

test("detailed warning", async () => {
    const legacyResponse = await fetch(`${legacyApiUrl}/?state=NSW`);    
    const legacyWarnings = await legacyResponse.json();
    const legacyWarning = legacyWarnings[0];

    const legacyWarningResponse = await fetch(`${legacyApiUrl}/warning/${legacyWarning}`);
    const newWarningResponse = await fetch(`${newApiUrl}/warning/${legacyWarning}`);

    expect(legacyWarningResponse.status).toBe(200);
    expect(newWarningResponse.status).toBe(200);

    const legacyWarningResult = await legacyWarningResponse.json();
    const newWarningResult = await newWarningResponse.json();

    expect(legacyWarningResult).toEqual(newWarningResult);
})