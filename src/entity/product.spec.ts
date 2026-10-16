/// <reference types="jest" />

import { Product } from "./product.js";

describe("Product unit tests", () => {

    it("should throw error when id is not provided", () => {
        expect(() => {
            let product = new Product("", "");
        }).toThrow("Id is required");
    })

    it("should throw error when name is not provided", () => {
        expect(() => {
            let product = new Product("abc1" , "")
        }).toThrow("Name is required");
    })
})