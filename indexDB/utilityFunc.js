//

import { openDatabase } from "./configDB";

// ----------------------------------------------

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

    if (window.navigator.onLine) {
      const sync = db.transaction("syncReport", "readwrite");
      const syncObj = sync.objectStore("syncReport");
      await syncObj.put(new Date().toString(), dbKey);
    }

    await tx.done;
  } catch (error) {
    console.error(error);
  }
}

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
