const FIREBASE_VERSION = "10.12.5";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasRequiredFirebaseConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
].every(Boolean);

let firebaseContextPromise;
let contactIntegration;

const loadFirebaseContext = async () => {
  if (!hasRequiredFirebaseConfig) {
    return null;
  }

  if (!firebaseContextPromise) {
    firebaseContextPromise = Promise.all([
      import(
        /* @vite-ignore */
        `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`
      ),
      import(
        /* @vite-ignore */
        `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`
      ),
    ])
      .then(([firebaseAppModule, firestoreModule]) => {
        const app = firebaseAppModule.getApps().length
          ? firebaseAppModule.getApp()
          : firebaseAppModule.initializeApp(firebaseConfig);

        return {
          addDoc: firestoreModule.addDoc,
          collection: firestoreModule.collection,
          db: firestoreModule.getFirestore(app),
          serverTimestamp: firestoreModule.serverTimestamp,
        };
      })
      .catch((error) => {
        console.error("Firebase load error:", error);
        return null;
      });
  }

  return firebaseContextPromise;
};

export function initContactIntegration() {
  if (contactIntegration) {
    return contactIntegration;
  }

  contactIntegration = {
    preload() {
      void loadFirebaseContext();
    },
    async saveMessage(message) {
      const firebaseContext = await loadFirebaseContext();

      if (!firebaseContext) {
        return false;
      }

      try {
        await firebaseContext.addDoc(
          firebaseContext.collection(firebaseContext.db, "messages"),
          {
            ...message,
            createdAt: firebaseContext.serverTimestamp(),
          },
        );

        return true;
      } catch (error) {
        console.error("Firestore write error:", error);
        return false;
      }
    },
  };

  return contactIntegration;
}
