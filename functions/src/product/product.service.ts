import {ProductRepository} from "./product.repository";
import {Product} from "../models/product.model";
import {StockRepository} from "../stock/stock.repository";

export class ProductService {
    constructor(private productRepository: ProductRepository,
                private stockRepository: StockRepository) {
    }

    writeProduct(prodId: string,
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

    deleteProduct(prodId: string): Promise<void>{
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

    async create(product: Product): Promise<Product> {
        await this.stockRepository.create(product, 5);
        return Promise.resolve(product);
    }
}
