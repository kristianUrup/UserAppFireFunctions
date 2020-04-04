import {OrderRepository} from "./order.repository";
import {Order} from "../models/order.model";
import * as admin from "firebase-admin";

export class OrderRepositoryFirebase implements OrderRepository {

    orderPath = 'orders';

    async create(order: Order): Promise<Order> {
        await this.db().collection(`${this.orderPath}`).add(order);
        return Promise.resolve(order);
    }


    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

}