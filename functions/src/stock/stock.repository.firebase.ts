import {Product} from "../models/product.model";
import {Stock} from "../models/stock.model";
import {StockRepository} from "./stock.repository";
import * as admin from "firebase-admin";
import {Orderline} from "../models/orderline.model";
import DocumentReference = admin.firestore.DocumentReference;
import DocumentData = admin.firestore.DocumentData;

export class StockRepositoryFirebase implements StockRepository {
    stockPath = 'stocks';

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async create(product: Product, number: number): Promise<Stock> {
        const stock: Stock = {product: product, count: number};
        await this.db().collection(`${this.stockPath}`).add(stock);
        return Promise.resolve(stock);
    }

    async lowerStock(product: Product, amount: number): Promise<void> {
        const doc =  await this.db().collection(`${this.stockPath}`)
            .doc(`${product.id}`)
            .get();
        const stock = doc.data() as Stock;
        stock.count = stock.count - amount;
        await this.db().doc(`${this.stockPath}/${product.id}`).set(stock);
        return Promise.resolve();
    }

    async lowerStocks(orderLines: Orderline[]): Promise<void> {
        const batch = this.db().batch();
        const documentsArray: DocumentReference<DocumentData>[] = [];
        orderLines.forEach(ol => {
            documentsArray.push(this.db().collection(`${this.stockPath}`)
                .doc(`${ol.product.id}`));
        });
        const stocks = await this.db().getAll(...documentsArray);
        stocks.forEach(snap => {
            const stock = snap.data() as Stock;
            orderLines.forEach(ol => {
                if(ol.product.id === snap.id) {
                    stock.count = stock.count - ol.amount;
                }
            });
            batch.set(this.db().collection(`${this.stockPath}`)
                .doc(`${snap.id}`), stock);
        });
        await batch.commit();
        return Promise.resolve();
    }
}