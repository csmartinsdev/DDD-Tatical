import { Order } from "../../domain/entity/order.js";
import { OrderItem } from "../../domain/entity/order_item.js";
import type { OrderRepositoryInterface } from "../../domain/repository/order-repository.js";
import { OrderItemModel } from "../database/sequelize/model/order-item.model.js";
import { OrderModel } from "../database/sequelize/model/order.model.js";

export class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        entity.validate();

        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.total(),
            })),
        }, {
            include: [{ model: OrderItemModel }],
        });
    }

    async update(entity: Order): Promise<void> {
        entity.validate();

        await OrderModel.update(
            { customerId: entity.customerId, total: entity.total() },
            { where: { id: entity.id } }
        );

        await OrderItemModel.destroy({ where: { orderId: entity.id } });

        await OrderItemModel.bulkCreate(
            entity.items.map((item) => ({
                id: item.id,
                orderId: entity.id,
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.total(),
            }))
        );
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
            rejectOnEmpty: true,
        });

        const items = orderModel.items.map(
            (item) => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
        );

        return new Order(orderModel.id, orderModel.customerId, items);
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

        return ordersModel.map((orderModel) => {
            const items = orderModel.items.map(
                (item) => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
            );

            return new Order(orderModel.id, orderModel.customerId, items);
        });
    }
}