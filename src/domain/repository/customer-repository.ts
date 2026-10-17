import type { Customer } from "../entity/customer.js";
import type { RepositoryInterface } from "./repository-interface.js";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}