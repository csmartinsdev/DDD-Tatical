/// <reference types="jest" />

import { Product } from "./product.js";

describe("Product unit tests", () => {
    it("should create a product with its id, name and price", () => {
        const product = new Product("product-1", "Book", 25);

        expect(product.id).toBe("product-1");
        expect(product.name).toBe("Book");
        expect(product.price).toBe(25);
    })

    it("should throw an error when the id is empty", () => {
        expect(() => new Product("", "Book", 25)).toThrow("Id is required");
    })

    it("should throw an error when the name is empty", () => {
        expect(() => new Product("product-1", "", 25)).toThrow("Name is required");
    })

    it("should change the product price", () => {
        const product = new Product("product-1", "Book", 25);

        product.changePrice(30);

        expect(product.price).toBe(30);
    })
})
