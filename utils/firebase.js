// const admin = require("firebase-admin");

// const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const storage = admin.storage();
export default admin;