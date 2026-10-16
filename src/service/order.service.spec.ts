import { Customer } from "../entity/customer.js";
import { Order } from "../entity/order.js";
import { OrderItem } from "../entity/order_item.js";
import { OrderService } from "./order.service.js";

jest.mock("uuid", () => ({
    v4: () => "generated-order-id"
}));

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("customer 1", "Customer 1");
        const item = new OrderItem("item 1", "item1", 10, "product 1", 1);

        const order =  OrderService.placeOrder(customer, [item]);

        expect(order.id).toBe("generated-order-id");
        expect(order.customerId).toBe(customer.id);
        expect(order.items).toEqual([item]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    })

    it("should reject an order without items", () => {
        const customer = new Customer("customer 1", "Customer 1");

        expect(() => OrderService.placeOrder(customer, []))
            .toThrow("Order must have at least one item");
        expect(customer.rewardPoints).toBe(0);
    })

    it("should get total of all orders", () => {
        const item1 = new OrderItem("item 1", "item1", 100, "product 1", 2);
        const item2 = new OrderItem("item 2", "item2", 200, "product 2", 2);

        const order = new Order("order 1", "customer 1", [item1]);
        const order2 = new Order("order 2", "customer 1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(600);

    });

    it("should return zero when there are no orders", () => {
        expect(OrderService.total([])).toBe(0);
    });
});