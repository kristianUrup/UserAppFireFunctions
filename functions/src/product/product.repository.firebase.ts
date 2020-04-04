import {ProductRepository} from "./product.repository";
import * as admin from "firebase-admin";
import {Product} from "../models/product.model";

export class ProductRepositoryFirebase implements ProductRepository{

        productsPath = 'products';
    db(): FirebaseFirestore.Firestore{
        return admin.firestore();
    }
    deleteProduct(id: string): Promise<any> {
        return this.db().doc(`${this.productsPath}/${id}`).delete();
    }

    setProduct(product: Product): Promise<any> {
        return this.db().doc(`${this.productsPath}/${product.id}`).set(product);
    }

}