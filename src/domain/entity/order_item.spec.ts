/// <reference types="jest" />

import { OrderItem } from "./order_item.js";

describe("OrderItem unit tests", () => {
    it("should expose its id, product id, name, price and quantity", () => {
        const item = new OrderItem("item-1", "Book", 25, "product-1", 3);

        expect(item.id).toBe("item-1");
        expect(item.productId).toBe("product-1");
        expect(item.name).toBe("Book");
        expect(item.price).toBe(25);
        expect(item.quantity).toBe(3);
    })

    it("should calculate the total using its price and quantity", () => {
        const item = new OrderItem("item-1", "Book", 25, "product-1", 3);

        expect(item.total()).toBe(75);
    })
})
