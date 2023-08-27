import { getDocs, collection } from "firebase/firestore";

import { db } from "@firebase/config";

export async function fetchCars() {
  const result: any[] = [];
  const querySnapshot = await getDocs(collection(db, "cars"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
    console.log(`doc id is ${doc.id} => ${doc.data().name}`);
  });
  return result;
}
