import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from "firebase-functions";


export interface ProductController {
    writtenProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    updatedProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
}