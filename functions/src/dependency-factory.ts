import {ProductRepository} from "./product/product.repository";
import {ProductRepositoryFirebase} from "./product/product.repository.firebase";
import {ProductService} from "./product/product.service";
import {ProductController} from "./product/product.controller";
import {ProductControllerFirebase} from "./product/product.controller.firebase";
import {StockRepository} from "./stock/stock.repository";
import {StockRepositoryFirebase} from "./stock/stock.repository.firebase";
import {OrderController} from "./order/order.controller";
import {OrderRepository} from "./order/order.repository";
import {OrderRepositoryFirebase} from "./order/order.repository.firebase";
import {OrderService} from "./order/order.service";
import {OrderControllerFirebase} from "./order/order.controller.firebase";

export class DependencyFactory{
    getProductController(): ProductController {
        const pRepo: ProductRepository = new ProductRepositoryFirebase();
        const sRepo: StockRepository = new StockRepositoryFirebase();
        const service: ProductService = new ProductService(pRepo, sRepo);
        return new ProductControllerFirebase(service)
    }

    getOrderController(): OrderController{
        const oRepo: OrderRepository = new OrderRepositoryFirebase();
        const sRepo: StockRepository = new StockRepositoryFirebase();
        const service: OrderService = new OrderService(oRepo, sRepo);
        return new OrderControllerFirebase(service)
    }
}