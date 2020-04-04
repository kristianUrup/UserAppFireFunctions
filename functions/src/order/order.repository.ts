import {Order} from "../models/order.model";

export interface OrderRepository {
    create(order: Order): Promise<Order>;
}