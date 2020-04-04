import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";
import {Product} from "../models/product.model";
import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export class ProductControllerFirebase implements ProductController{

    constructor(private productService: ProductService) { }

    writtenProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.writeProduct(context.params.id, productBefore, productAfter)
    }

    updatedProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.updateProduct(context.params.id, productBefore, productAfter);
    }
}