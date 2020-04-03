import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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