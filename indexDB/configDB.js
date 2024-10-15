//

import { openDB } from "idb";

// ----------------------------------------------

const DB_NAME = "scrapper-data";
const DB_VERSION = 1;

export const INDEX_DB_CONFIG = {
  leadEnquiries: {
    storeObject: "leadEnquiries",
    keyPath: "id",
    hasIndex: false,
  },
};

// ----------------------------------------------

// initiate the database for new devices ...
export async function openDatabase() {
  const indexDB = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // create store named: leadEnquiries
      if (!db.objectStoreNames.contains("leadEnquiries")) {
        db.createObjectStore("leadEnquiries", { keyPath: "id" });
      }
    },
  });

  return indexDB;
}

// delete the database. like, when user logs out from the app ...
export function clearDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
