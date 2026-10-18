import type { Product } from "../entity/product.js";

export class ProductService {
    static increasePrice(products: Product[], percentage: number): Product[] {
        products.forEach(product => {
            product.changePrice((product.price * percentage) / 100 + product.price);
        });
        return products;
    }
}