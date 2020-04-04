import {Product} from "./product.model";

export interface Orderline {
    id: string;
    product: Product;
    amount: number;
}