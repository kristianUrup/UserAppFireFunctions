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

            if(object && object.name && object.metadata){
                const fileMeta = {
                    lastModified: object.updated,
                    name: object.metadata.name,
                    type: 'image/png',
                    size: object.size
                };
                const nameForDoc = object.name. split('/')[1];
                admin.firestore().collection('files')
                    .doc(nameForDoc)
                    .set(fileMeta)
                    .then(value => resolve(value))
                    .catch(err => reject(err));
            } else {
                reject('Error happened, not enough data ');
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

exports.deleteProduct = functions.firestore
.document('products/{productId}')
.onDelete((snap, context) =>{
    return new Promise(async (resolve, reject) => {
        const deletedProduct = snap.data();
        if(deletedProduct){
            try{
                await admin.firestore().collection('files')
                    .doc(deletedProduct.productId)
                    .delete()
                    .then();

                const resultFromStorage = await
                    admin.storage()
                        .bucket()
                        .file('product-pictures/' + deletedProduct.pictureId)
                        .delete()
                        .then()
                resolve(resultFromStorage);
            }catch(e){
            reject(e)
            }
        } else{
            reject('No product deleted');
        }

    })
});