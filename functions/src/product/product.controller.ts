import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export interface ProductController {
    writtenProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    updatedProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
}