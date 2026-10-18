import type { Product } from "../entity/product.js";
import type { RepositoryInterface } from "./repository-interface.js";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {

}