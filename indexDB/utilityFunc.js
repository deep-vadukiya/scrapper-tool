//

import { openDatabase } from "./configDB";

// ----------------------------------------------

// 1. add records to indexDB
export async function addIndexDBRecord(dbKey, record) {
  try {
    const db = await openDatabase();
    const tx = db.transaction(dbKey, "readwrite");
    const store = tx.objectStore(dbKey);
    await store.add(record);

    await tx.done;
  } catch (error) {
    console.error(error);
  }
}

// 2. update records to indexDB
export async function updateIndexDBRecord(dbKey, records) {
  try {
    const db = await openDatabase();
    const tx = db.transaction(dbKey, "readwrite");
    const store = tx.objectStore(dbKey);

    // NOTE: looping threw the each entries is not an efficient way ...
    // will need to find another way in future, for now its fine though ...
    records?.forEach((record) => {
      store.put(record);
    });

    await tx.done;
  } catch (error) {
    console.error(error);
  }
}

// 3. get all records from indexDB
export async function getAllIndexDBRecords(dbKey) {
  let allRec = null;

  try {
    const db = await openDatabase();
    const tx = db.transaction(dbKey, "readonly");
    const store = tx.objectStore(dbKey);
    allRec = await store.getAll();

    await tx.done;
  } catch (error) {
    console.error(error);
  }

  return allRec;
}
