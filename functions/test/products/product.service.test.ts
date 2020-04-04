import * as admin from 'firebase-admin';
import {ProductRepository} from "../../src/product/product.repository";
import {Product} from '../../src/models/product.model';
import {ProductService} from "../../src/product/product.service";
import {IMock, Mock, Times} from "moq.ts";
import {StockRepository} from "../../src/stock/stock.repository";

describe('ProductService', () => {
    let productRepository: IMock<ProductRepository>;
    let stockRepository: IMock<StockRepository>;
    let productService: ProductService;
    const product: Product = {
        id: 'sssds',
        imageUrl: '223232323232',
        timesPurchased: 2,
        description: '2dsfkk',
        type: 'case',
        producer: 'bitfenix',
        price: 20,
        name: 'prodigy'
    };
    beforeEach(() => {
        productRepository = new Mock<ProductRepository>()
            .setup(pr => pr.setProduct(product))
            .returns(new Promise((resolve, reject) => {
                resolve()
            }));
        productService = new ProductService(productRepository.object(), stockRepository.object());
    });
    it('Init Test', async () => {
        await productService.writeProduct(
            'sssds',
            {
                id: 'sssds',
                imageUrl: '223232323232',
                timesPurchased: 2,
                description: '2dsfkk',
                type: 'case', producer: 'bitfenix',
                price: 20, name: 'prodigy'
            },
            {
                id: 'sssds',
                imageUrl: '223232323232',
                timesPurchased: 2,
                description: '2dsfkk',
                type: 'case', producer: 'bitfenix',
                price: 20,
                name: 'prodigy'
            });
        productRepository.verify(pr => pr.setProduct, Times.Exactly(1));
    })
});

