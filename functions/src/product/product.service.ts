import {ProductRepository} from "./product.repository";
import {Product} from "../models/product.model";

export class ProductService {
    constructor(private productRepository: ProductRepository) {
    }

    write(prodId: string,
          productBefore: Product,
          productAfter: Product
    ): Promise<void> {
        const times = productBefore.timesPurchased++;
        if (productAfter) {
            return this.productRepository.setProduct({
                id: prodId,
                name: productAfter.name,
                price: productAfter.price,
                imageUrl: productAfter.imageUrl,
                timesPurchased: times,
                producer: productAfter.producer,
                type: productAfter.type,
                description: productAfter.description
            });
        } else {
            return this.productRepository.deleteProduct(prodId)
        }
    }

    delete(prodId: string): Promise<void>{
        return this.productRepository.deleteProduct(prodId);
    }

    updateProduct(id: string, productBefore: Product, productAfter: Product): Promise<void> {
        return this.productRepository.setProduct({
            id: id,
            name: productAfter.name,
            price: productAfter.price,
            imageUrl: productAfter.imageUrl,
            timesPurchased: productAfter.timesPurchased,
            producer: productAfter.producer,
            type: productAfter.type,
            description: productAfter.description
        })
    }
}
