import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports.products = functions.https.onRequest(async (request, response) => {
    if(request.method === 'GET'){
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
    }
});
