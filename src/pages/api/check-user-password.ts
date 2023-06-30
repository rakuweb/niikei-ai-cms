import admin from 'firebase-admin';

const checkUserPassword = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Invalid request method');
  }

  const { uid, currentPassword } = req.body;

  try {
    const userRecord = await admin.auth().getUser(uid);
    const email = userRecord.email;

    // Sign in with email and password
    const firebase = admin.initializeApp();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, currentPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        res.status(200).send('Password correct');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(401).send('Password incorrect');
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default checkUserPassword;
