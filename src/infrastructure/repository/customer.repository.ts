import { Customer } from "../../domain/entity/customer.js";
import { Address } from "../../domain/entity/address.js";
import type { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.js";
import { CustomerModel } from "../database/sequelize/model/customer.model.js";

export class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zipCode,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.Address.street,
                number: entity.Address.number,
                zip: entity.Address.zipCode,
                city: entity.Address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where: { id: entity.id }
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel: CustomerModel 
        try {
            customerModel = await CustomerModel.findOne({ 
                where: { 
                    id 
                },
                rejectOnEmpty: true 
            });
        } catch (error) {
            throw new Error(`Customer not found`);
        }
                
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.changeAddress(
            new Address(
                customerModel.street,
                customerModel.number,
                customerModel.city,
                customerModel.zip
            )
        );

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(
            (customerModel) => {
                const customer = new Customer(customerModel.id, customerModel.name);
                customer.changeAddress(
                    new Address(
                        customerModel.street,
                        customerModel.number,
                        customerModel.city,
                        customerModel.zip
                    )
                );
                return customer;
            }
        );
    }
}