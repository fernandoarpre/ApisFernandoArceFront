import { Customer } from './Customer';

export class Sale {
    idSale?: number;
    period: number;
    quantity: number;
    value: number;
    idCustomer: number;
    customer: Customer
}
