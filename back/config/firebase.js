var admin = require("firebase-admin");

var serviceAccount = require("./sellaway-b43ef-firebase-adminsdk-7uv40-21cf728dc2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sellaway-b43ef.appspot.com"
});

module.exports = admin