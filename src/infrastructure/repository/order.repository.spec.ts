
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../database/sequelize/model/customer.model.js";
import { OrderItemModel } from "../database/sequelize/model/order-item.model.js";
import { OrderModel } from "../database/sequelize/model/order.model.js";
import { ProductModel } from "../database/sequelize/model/product.model.js";
import { CustomerRepository } from "./customer.repository.js";
import { Customer } from "../../domain/entity/customer.js";
import { Address } from "../../domain/entity/address.js";
import { ProductRepository } from "./product.repository.js";
import { Product } from "../../domain/entity/product.js";
import { OrderRepository } from "./order.repository.js";
import { Order } from "../../domain/entity/order.js";
import { OrderItem } from "../../domain/entity/order_item.js";

describe("Order repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);


        const item = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [item]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    orderId: order.id,
                    productId: product.id,
                    total: item.total()
                }
            ]
        });

    })

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const item = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [item]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    orderId: order.id,
                    productId: product.id,
                    total: item.total()
                }
            ]
        });

        const newItem = new OrderItem("2", product.name, product.price, product.id, 3);
        order.items.push(newItem);
        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        
        expect(updatedOrderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    orderId: order.id,
                    productId: product.id,
                    total: item.total()
                },
                {
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    orderId: order.id,
                    productId: product.id,
                    total: newItem.total()
                }
            ]
        });
    })

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const item = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [item]);
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const item = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("123", "123", [item]);
        await orderRepository.create(order);

        const item2 = new OrderItem("2", product.name, product.price, product.id, 3);
        const order2 = new Order("124", "123", [item2]);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    })
})