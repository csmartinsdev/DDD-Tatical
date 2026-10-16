/// <reference types="jest" />

import { Order } from "./order.js";
import { OrderItem } from "./order_item.js";

describe("Order unit tests", () => {
    it("should create an order item", () => {
        const item = new OrderItem("item-1", "Book", 25);

        expect(item).toEqual({ _id: "item-1", _name: "Book", _price: 25 });
    })

    it("should create an order with its items", () => {
        const item = new OrderItem("item-1", "Book", 25);
        const order = new Order("order-1", "customer-1", [item]);

        expect(order).toEqual({ _id: "order-1", _customerId: "customer-1", _items: [item] });
    })
})