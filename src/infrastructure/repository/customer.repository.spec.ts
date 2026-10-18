import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../database/sequelize/model/customer.model.js";
import { Customer } from "../../domain/entity/customer.js";
import { CustomerRepository } from "./customer.repository.js";
import { Address } from "../../domain/entity/address.js";


describe("Customer repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();

        const address = new Address("Street 1", "445", "Sao Paulo", "Campinas");
        const customer = new Customer("1", "John Doe");
        customer.Address = address;

        await customerRepository.create(customer);
        const customerDb = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerDb).not.toBeNull();
        expect(customerDb?.id).toBe("1");
        expect(customerDb?.name).toBe("John Doe");
        expect(customerDb?.street).toBe("Street 1");
        expect(customerDb?.number).toBe("445");
        expect(customerDb?.zip).toBe("Campinas");
        expect(customerDb?.city).toBe("Sao Paulo");
        expect(customerDb?.active).toBe(true);
        expect(customerDb?.rewardPoints).toBe(0);

    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const address = new Address("Street 1", "445", "Sao Paulo", "Campinas");
        const customer = new Customer("1", "John Doe");
        customer.Address = address;

        await customerRepository.create(customer);
        
        customer.changeName("Jane Doe");
        await customerRepository.update(customer);
        const customerDb = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerDb).not.toBeNull();
        expect(customerDb?.id).toBe("1");
        expect(customerDb?.name).toBe("Jane Doe");
        expect(customerDb?.street).toBe("Street 1");
        expect(customerDb?.number).toBe("445");
        expect(customerDb?.zip).toBe("Campinas");
        expect(customerDb?.city).toBe("Sao Paulo");
        expect(customerDb?.active).toBe(true);
        expect(customerDb?.rewardPoints).toBe(0);
    })
})