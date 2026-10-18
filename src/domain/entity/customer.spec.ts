/// <reference types="jest" />

import { Customer } from "./customer.js";
import { Address } from "./address.js";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    })

    it("should allow changing the name", () => {
        const customer = new Customer("123", "John");

        expect(() => customer.changeName("Jane")).not.toThrow();
        expect(() => customer.changeName("")).toThrow("Name is required");
    })

    it("should require an address before activation", () => {
        const customer = new Customer("123", "John");

        expect(() => customer.activate()).toThrow("Address is required to activate a customer");

        customer.changeAddress(new Address("Main Street", "10", "London", "SW1A 1AA"));
        expect(() => customer.activate()).not.toThrow();
    })

    it("should allow deactivation", () => {
        const customer = new Customer("123", "John");

        expect(() => customer.deactivate()).not.toThrow();
    })

    it("should add reward points", () => {
        const customer = new Customer("123", "John");

        expect(customer.id).toBe("123");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(20);
        expect(customer.rewardPoints).toBe(30);
    })
})