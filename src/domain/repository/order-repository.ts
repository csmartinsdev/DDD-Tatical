
import type { Order } from "../entity/order.js";
import type { RepositoryInterface } from "./repository-interface.js";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}