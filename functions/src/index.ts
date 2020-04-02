import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

exports.uploadProductImage =
    functions.storage.object().onFinalize((object) => {
        return new Promise((resolve, reject) => {
            const fileMeta = {
                lastModified: 2222232,
                name:'File2.png',
                type: 'image/png',
                size: 32093
            }
            if(object && object.metadata){
                resolve(fileMeta);
                //Firestore and save metadata
            } else {
                reject('Error');
            }
        });
    });

exports.products = functions.https.onRequest((request, response) => {
    admin.firestore().collection('products')
        .get()
        .then(products => {
            const listOfProducts: any = [];

            products.forEach(product => {
                let prod = product.data();
                prod.id = product.id;
                listOfProducts.push(prod);
            });
            console.log(products);
            response.json(listOfProducts);
        }).catch(err => {console.log(err)})
});