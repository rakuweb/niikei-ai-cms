import { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc, doc, DocumentReference } from 'firebase/firestore';
import { db } from 'src/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    const auth = getAuth();
    const { name, email, password, role, is_company, currentUserUid } =
      req.body;
    // const currentUser = auth.currentUser;
    // let userToken = '';
    // if (currentUser) {
    //   const tokenResult = await currentUser.getIdTokenResult();
    //   userToken = tokenResult.token;
    // }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    const dataWithoutPassword = { name, email, role };
    let companyDocRef: DocumentReference;
    if (is_company) {
      companyDocRef = doc(db, 'companies', user.uid, 'employees', user.uid);
    } else {
      companyDocRef = doc(
        db,
        'companies',
        currentUserUid,
        'employees',
        user.uid
      );
    }
    const employeeDocRef = doc(db, 'users', user.uid);

    await setDoc(companyDocRef, dataWithoutPassword);
    const companyRef = doc(db, 'companies', currentUserUid);
    await setDoc(employeeDocRef, {
      is_company: is_company,
      company_ref: companyRef,
    });

    if (!is_company) {
      await setDoc(employeeDocRef, {
        is_company: is_company,
        company_ref: companyRef,
      });
    }

    res.status(200).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}
