import {Product} from "../models/product.model";

export interface ProductRepository {
    deleteProduct(id: string): Promise<any>;

    setProduct(product: Product):Promise<any>;
}