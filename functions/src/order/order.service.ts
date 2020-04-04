import {Order} from "../models/order.model";
import {OrderRepository} from "./order.repository";
import {StockRepository} from "../stock/stock.repository";

export class OrderService {
    constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {
        console.log(this.orderRepository);
        console.log(this.stockRepository);
    }

    async executeOrder(order: Order): Promise<Order> {
        if(!order.orderLines || order.orderLines.length < 1) {
            console.log('order', order);
            throw new TypeError('You need orderlines to execute a order');
            return Promise.reject(order);
        }
        if(order.orderLines.length === 1) {
            await this.stockRepository.lowerStock(order.orderLines[0].product, order.orderLines[0].amount);
            await this.orderRepository.create(order);
        }
        else {
            await this.stockRepository.lowerStocks(order.orderLines);
            await this.orderRepository.create(order);
        }
        /*order.orderLines.forEach(async (ol) => {
          await this.stockRepository.lowerStock(ol.product, ol.amount);
        });*/
        return Promise.resolve(order);
    }
}