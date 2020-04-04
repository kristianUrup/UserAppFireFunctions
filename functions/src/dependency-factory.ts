import {ProductRepository} from "./product/product.repository";
import {ProductRepositoryFirebase} from "./product/product.repository.firebase";
import {ProductService} from "./product/product.service";
import {ProductController} from "./product/product.controller";
import {ProductControllerFirebase} from "./product/product.controller.firebase";

export class DependencyFactory{
    getProductController(): ProductController {
        const repo: ProductRepository = new ProductRepositoryFirebase();
        const service: ProductService = new ProductService(repo);
        return new ProductControllerFirebase(service)
    }
}