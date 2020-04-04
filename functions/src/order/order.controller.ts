import {EventContext} from "firebase-functions";
import {Order} from "../models/order.model";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export interface OrderController {
    execute(snap: DocumentSnapshot, context: EventContext): Promise<Order>;
}