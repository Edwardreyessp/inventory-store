import { Item } from "@/interfaces";
import {
  getDatabase,
  ref,
  child,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEX7zLfqAHWP0Xvldg9V9j8NZWokcPTzA",
  authDomain: "inventario-2ff9e.firebaseapp.com",
  databaseURL: "https://inventario-2ff9e-default-rtdb.firebaseio.com",
  projectId: "inventario-2ff9e",
  storageBucket: "inventario-2ff9e.appspot.com",
  messagingSenderId: "292608729250",
  appId: "1:292608729250:web:968f5a735888dcec8eb7fb",
  measurementId: "G-6GP0K2E06E",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const registerEmail = (
  email: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid: string = user?.uid!.toString()!;
        resolve(uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
};

export const loginEmail = (
  email: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid: string = user?.uid!.toString()!;
        resolve(uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Mi error");
        reject(error);
      });
  });
};

export const loginGoogle = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken!;
        const user = result.user;
        const uid: string = user?.uid!.toString()!;
        resolve(uid); // Resuelve la promesa con el valor asignado al local storage
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject(error); // Rechaza la promesa con el error
      });
  });
};

export const createItem = (item: Item, file: File) => {
  const reference = storageRef(storage, "images/" + file.name);
  uploadBytes(reference, file);
  // const url = getItemImage(reference.fullPath);

  set(ref(db, "items/" + item.id), { ...item, image: reference.fullPath });

  return reference.fullPath;
};

export const getItems = (): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    get(child(dbRef, "items"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const items: Item[] = snapshot.val();
          resolve(items);
        } else {
          console.log("No data available");
          resolve([]); // Resuelve la promesa con un array vacío si no hay datos disponibles
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Rechaza la promesa con el error si ocurre alguna excepción
      });
  });
};

export const updateItem = (item: Item, file: File | undefined) => {
  const itemRef = ref(db, `items/${item.id}`);
  if (!file) {
    update(itemRef, item)
      .then(() => {
        console.log("Item updated successfully");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        throw error;
      });
    return;
  }
  const reference = storageRef(storage, "images/" + file.name);
  uploadBytes(reference, file);

  const editedItem = { ...item, image: reference.fullPath };

  update(itemRef, editedItem)
    .then(() => {
      console.log("Item updated successfully");
    })
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

export const deleteItem = (itemId: string) => {
  const itemRef = ref(db, `items/${itemId}`);

  return remove(itemRef)
    .then(() => {
      console.log("Item deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};

export const uploadImage = (file: File) => {
  const reference = storageRef(storage, "images/" + file.name);
  uploadBytes(reference, file);
  return reference;
};

export const getItemImage = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDownloadURL(storageRef(storage, path))
      .then((url) => {
        if (url) {
          resolve(url);
        } else {
          resolve("");
        }
      })
      .catch((error) => {
        reject(error);
        // Handle any errors
      });
  });
};
