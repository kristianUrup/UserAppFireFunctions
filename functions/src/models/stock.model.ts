import {Product} from "./product.model";

export interface Stock {
    product: Product;
    count: number;
}