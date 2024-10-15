//

import React from "react";
// libs
import { Link } from "react-router-dom";
// routes
import { APP_PAGES } from "../../routes/paths";
// indexDB
import { updateIndexDBRecord } from "../../indexDB/utilityFunc";

// ----------------------------------------------

export default function CopyCollection() {
  const handlePasteRecords = async () => {
    try {
      const copiedText = await navigator.clipboard.readText();

      // API specific condition ...
      if (copiedText?.code === 200) {
        if (copiedText?.result?.length) {
          const tempData = [];

          for (let index = 0; index < copiedText.result.length; index++) {
            const element = array[index];
            tempData.push({ element, id: index });
          }
          updateIndexDBRecord(tempData);
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
