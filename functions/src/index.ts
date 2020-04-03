import * as admin from 'firebase-admin';
import * as deleteProduct from './delete-product';
import * as allProducts from './all-products';
import * as uploadProductImage from './upload-product-image'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

module.exports = {
    ...deleteProduct,
    ...allProducts,
    ...uploadProductImage
};



