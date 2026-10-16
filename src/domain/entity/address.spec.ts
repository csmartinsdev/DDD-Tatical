/// <reference types="jest" />

import { Address } from "./address.js";

describe("Address unit tests", () => {
    it("should throw an error when the street is empty", () => {
        expect(() => new Address("", "10", "London", "SW1A 1AA")).toThrow("Street is required");
    })

    it("should throw an error when the city is empty", () => {
        expect(() => new Address("Main Street", "10", "", "SW1A 1AA")).toThrow("City is required");
    })

    it("should throw an error when the zip code is empty", () => {
        expect(() => new Address("Main Street", "10", "London", "")).toThrow("Zip code is required");
    })

    it("should format the address", () => {
        const address = new Address("Main Street", "10", "London", "SW1A 1AA");

        expect(address.toString()).toBe("Main Street, #10, London, SW1A 1AA");
    })
})