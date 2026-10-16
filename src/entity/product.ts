export class Product {
    private _id: string;
    private _name: string;
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }
    
    get id(): string {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

}