import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../database/sequelize/model/product.model.js";
import { ProductRepository } from "./product.repository.js";
import { Product } from "../../domain/entity/product.js";


describe("Product repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productDb = await ProductModel.findOne({ where: { id: "1" } });

        expect(productDb).not.toBeNull();
        expect(productDb?.id).toBe("1");
        expect(productDb?.name).toBe("Product 1");
        expect(productDb?.price).toBe(100);

    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const updatedProduct = new Product("1", "Updated Product 1", 150);

        await productRepository.update(updatedProduct);

        const productDb = await ProductModel.findOne({ where: { id: "1" } });

        expect(productDb).not.toBeNull();
        expect(productDb?.name).toBe("Updated Product 1");
        expect(productDb?.price).toBe(150);
    })

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const foundProduct = await productRepository.find("1");

        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.id).toBe("1");
        expect(foundProduct?.name).toBe("Product 1");
        expect(foundProduct?.price).toBe(100);
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].price).toBe(100);
        expect(products[1].id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].price).toBe(200);
    })


})