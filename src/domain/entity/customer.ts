import { Address } from "./address.js";

export class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    get Address(): Address {
        return this._address;
    }

    set Address(address: Address) {
        this._address = address;
    }

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
    
     isActive(): boolean {
        return this._active;
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

    }
    
    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address): void {
        this._address = address;
    }

    activate(): void {
        if (this._address === undefined) {
            throw new Error("Address is required to activate a customer");
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }


}