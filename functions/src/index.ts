import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import {DependencyFactory} from "./dependency-factory";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const serviceAccount = require("../secret.json");
    const defa = new DependencyFactory();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://user-web-app.firebaseio.com'
});
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.productWritten = functions.firestore
    .document('products/{prodId}')
    .onWrite((snap, context)=>{
        return defa.getProductController().writtenProduct(snap,context);
    });

exports.productUpdated = functions.firestore
    .document('products/{prodId}')
    .onUpdate((snap, context) =>{
        return defa.getProductController().updatedProduct(snap,context);
    });



