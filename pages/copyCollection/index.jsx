//

import React from "react";
// libs
import { Link } from "react-router-dom";
// routes
import { APP_PAGES } from "../../routes/paths";
// indexDB
import {
  getAllIndexDBRecords,
  updateIndexDBRecord,
} from "../../indexDB/utilityFunc";
import { INDEX_DB_CONFIG } from "../../indexDB/configDB";

// ----------------------------------------------

export default function CopyCollection() {
  const handlePasteRecords = async () => {
    try {
      const copiedText = await navigator.clipboard.readText();
      const parsedCopiedData = JSON?.parse(copiedText);

      if (parsedCopiedData) {
        // API specific condition ...
        if (parsedCopiedData?.code === 200) {
          if (parsedCopiedData?.result?.length) {
            const tempData = [];

            const storedIndexDBData = await getAllIndexDBRecords(
              INDEX_DB_CONFIG.leadEnquiries.storeObject
            );
            const storedIndexDBDataLength = storedIndexDBData.length ?? 0;

            for (
              let index = 0;
              index < parsedCopiedData.result.length;
              index++
            ) {
              const element = parsedCopiedData.result[index];
              tempData.push({
                ...element,
                id: storedIndexDBDataLength + index + 1,
              });
            }

            updateIndexDBRecord(
              INDEX_DB_CONFIG.leadEnquiries.storeObject,
              tempData
            );
          }
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          borderBottom: "1px solid #F6F6F6",
          padding: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Welcome to Copy Collection</p>

        <Link to={APP_PAGES.root}>Back to Home</Link>
      </div>

      <div style={{ height: 24 }} />

      <div style={{ padding: 16 }}>
        {/* payload section */}
        <div style={{ border: "1px solid #F6F6F6", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ cursor: "pointer" }} onClick={handlePasteRecords}>
              Paste records
            </button>
          </div>

          <div></div>
        </div>

        {/* database analytics section */}
        <div></div>
      </div>
    </React.Fragment>
  );
}
