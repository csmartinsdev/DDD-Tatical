/// <reference types="jest" />

import { Order } from "./order.js";
import { OrderItem } from "./order_item.js";

describe("Order unit tests", () => {
    it("should create an order with its items", () => {
        const item = new OrderItem("item-1", "Book", 25, "product-1", 1);
        const order = new Order("order-1", "customer-1", [item]);

        expect(order.id).toBe("order-1");
        expect(order.customerId).toBe("customer-1");
        expect(order.items).toEqual([item]);
    })

    it("should validate an order with all required data", () => {
        const item = new OrderItem("item-1", "Book", 25, "product-1", 1);
        const order = new Order("order-1", "customer-1", [item]);

        expect(order.validate()).toBe(true);
    })

    it("should throw an error when the id is empty", () => {
        const order = new Order("", "customer-1", [
            new OrderItem("item-1", "Book", 25, "product-1", 1)
        ]);

        expect(() => order.validate()).toThrow("Id is required");
    })

    it("should throw an error when the customer id is empty", () => {
        const order = new Order("order-1", "", [
            new OrderItem("item-1", "Book", 25, "product-1", 1)
        ]);

        expect(() => order.validate()).toThrow("CustomerId is required");
    })

    it("should throw an error when there are no items", () => {
        const order = new Order("order-1", "customer-1", []);

        expect(() => order.validate()).toThrow("Items are required");
    })

    it("should throw an error when an item quantity is not greater than zero", () => {
        const item = new OrderItem("item-1", "Book", 25, "product-1", 0);
        const order = new Order("order-1", "customer-1", [item]);

        expect(() => order.validate()).toThrow("Quantity must be greater than 0");
    })

    it("should calculate the total from all items", () => {
        const firstItem = new OrderItem("item-1", "Book", 25, "product-1", 1);
        const secondItem = new OrderItem("item-2", "Pen", 5, "product-2", 1);
        jest.spyOn(firstItem, "total").mockReturnValue(25);
        jest.spyOn(secondItem, "total").mockReturnValue(5);
        const order = new Order("order-1", "customer-1", [firstItem, secondItem]);

        expect(order.total()).toBe(30);
    })
})
