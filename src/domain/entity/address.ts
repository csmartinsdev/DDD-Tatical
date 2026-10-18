export class Address {
    _street: string;
    _number: string;
    _city: string;
    _zipCode: string;

    constructor(street: string, number: string, city: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._zipCode = zipCode;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }
    
    get city(): string {
        return this._city;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    validate(): void {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }

        if (this._city.length === 0) {
            throw new Error("City is required");
        }

        if (this._zipCode.length === 0) {
            throw new Error("Zip code is required");
        }
    }

    toString(): string {
        return `${this._street}, #${this._number}, ${this._city}, ${this._zipCode}`;
    }
}
