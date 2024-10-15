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
