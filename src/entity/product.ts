export class Product {
    private _id: string;
    private _name: string;
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;


        this.validate();
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

}