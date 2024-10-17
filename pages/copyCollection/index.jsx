//

import React, { useEffect, useState } from "react";
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
// component
import ExcelExport from "../../components/ExcelExport";

// ----------------------------------------------

export default function CopyCollection() {
  const retrivableRecordOnEachAPI = 100;
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastRecordContactDate, setLastRecordContactDate] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, end: 100 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const setInitials = async () => {
      const storedIndexDBData = await getAllIndexDBRecords(
        INDEX_DB_CONFIG.leadEnquiries.storeObject
      );

      if (storedIndexDBData?.length) {
        setTotalRecords(storedIndexDBData.length);
        setLastRecordContactDate(
          storedIndexDBData[storedIndexDBData.length - 1]?.last_contact_date ??
            null
        );
        setPagination({
          start: storedIndexDBData.length + 1,
          end: storedIndexDBData.length + 100,
        });
      }
    };

    // set initials
    setInitials();
  }, []);

  const handlePasteRecords = async () => {
    try {
      setError(null);

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

            const isAlreadyExitRecord = storedIndexDBData.findIndex(
              (el) =>
                el.bs_encrypt_key === parsedCopiedData?.result[0].bs_encrypt_key
            );

            // check whether same payload is not pasting another time ...
            if (isAlreadyExitRecord === -1) {
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

              await updateIndexDBRecord(
                INDEX_DB_CONFIG.leadEnquiries.storeObject,
                tempData
              );

              const totalStoredRecords =
                storedIndexDBDataLength + parsedCopiedData.result.length;
              setTotalRecords(totalStoredRecords ?? 0);
              setPagination({
                start: totalStoredRecords + 1,
                end: totalStoredRecords + retrivableRecordOnEachAPI,
              });
            } else {
              setError(
                "Payload is already stored to database, try storing new payload ...!"
              );
            }
          }
        } else {
          setError("Please checl, Payload is not in the correct shape ...!");
        }
      }
    } catch (err) {
      setError("Somethings wrong with reading clipboard ...!!!");
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleCopyNextAPIPayload = async () => {
    const storedIndexDBData = await getAllIndexDBRecords(
      INDEX_DB_CONFIG.leadEnquiries.storeObject
    );

    const copiablePayload = JSON.stringify({
      start: pagination.start,
      end: pagination.end,
      type: 0,
      last_contact_date:
        storedIndexDBData[storedIndexDBData.length - 1]?.last_contact_date,
    });

    try {
      await navigator.clipboard.writeText(copiablePayload);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError("Something is wrong while copying text ...!!!");
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

          {!!error ? (
            <div style={{ margin: "16px 0" }}>
              <div style={{ padding: 16, backgroundColor: "#FF8A8A" }}>
                <p>{error}</p>
              </div>
            </div>
          ) : null}

          <div>
            <p>Total stored records: {totalRecords}</p>

            <hr />

            <div
              style={{
                padding: 16,
                marginTop: 12,
                border: "1px solid #F6F6F6",
              }}
            >
              <p>Upcoming API payload</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleCopyNextAPIPayload}>
                  Copy next payload
                </button>
              </div>
              <p>Last record contact date: {lastRecordContactDate}</p>
              <p>Record start: {pagination.start}</p>
              <p>Record end: {pagination.end}</p>
            </div>
          </div>
        </div>

        {/* database analytics section */}
        <div></div>
      </div>

      <ExcelExport />
    </React.Fragment>
  );
}

// Fiber + DTH
// 599: 40 Mbps
// OTT services
// 707 Rs

// Fiber
// 3000: 6 months
// 588: 40 Mbps + limited data

// Black
//
