import { Order } from "../entity/order.js";
import { OrderItem } from "../entity/order_item.js";
import { OrderService } from "./order.service.js";

describe("Order service unit tests", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("item 1", "item1", 100, "product 1", 2);
        const item2 = new OrderItem("item 2", "item2", 200, "product 2", 2);

        const order = new Order("order 1", "customer 1", [item1]);
        const order2 = new Order("order 2", "customer 1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(600);

    });
});