import ora from "ora";
import admin from "firebase-admin";

// TODO: Replace with your firebase admin credentials
const serviceJson = {
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
};

admin.initializeApp({
    credential: admin.credential.cert(serviceJson),
});

const db = admin.firestore();

const getOraColors = () => {
    const oraColors = [
        "black" , "red" , "green" , "yellow" , "blue" , "magenta" , "cyan" , "white" , "gray"
    ];

    return oraColors[Math.floor(Math.random() * oraColors.length)];
}

const getAllFirestoreData = async () => {

    try {

        const spinner = ora();
        spinner.start("Getting all collections");

        const allCollections = await db.listCollections();

        spinner.succeed(`Found ${allCollections.length} collections\n`);

        for (let colIndex = 0; colIndex < allCollections.length; colIndex++) {

            const collection = allCollections[colIndex];

            spinner.color = getOraColors();

            spinner.start(`GETTING FROM => ${collection.id}\n`);

            const collectionReference = await collection.get();
            const docs = [];

            console.log(`TOTAL DOCS => ${collectionReference.size}`);

            for (let i = 0; i < collectionReference.size; i++) {
                
                const doc = collectionReference.docs[i];

                const subCollections = await db.collection(collection.id)
                    .doc(doc.id)
                    .listCollections();

                if (subCollections.length > 0) {

                    console.log("DETECT SUB-COLLECTION");

                    const subDocs = [];

                    for (let j = 0; j < subCollections.length; j++) {

                        const subCollectionReference = subCollections[j];

                        console.log(`GETTING SUB-COLLECTION => ${subCollectionReference.id}`);

                        const subRef = await subCollectionReference.get();

                        for (let k = 0; k < subRef.size; k++) {

                            const subDocItem = subRef.docs[k];

                            subDocs.push(subDocItem.data());
                        }

                        item.data()[subCollectionReference.id] = subDocs;
                    }

                }

                docs.push(doc.data());
            }

            spinner.succeed(`DONE => ${collection.id} => ${docs.length}\n\n`);
        }

    } catch (err) {
        spinner.fail("CATCH ERROR");
        console.error(err);
    }
}

getAllFirestoreData();