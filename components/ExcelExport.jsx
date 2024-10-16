//

import React, { useState } from "react";
// libs
import * as XLSX from "xlsx";
// indexDB
import { getAllIndexDBRecords } from "../indexDB/utilityFunc";
import { INDEX_DB_CONFIG } from "../indexDB/configDB";

// ----------------------------------------------

export default function ExcelExport() {
  const [fromToData, setFromToData] = useState({ from: 1, to: 100 });

  const handleInputValues = (e) => {
    setFromToData({ ...fromToData, [e.target.name]: Number(e.target.value) });
  };

  const exportToExcel = async () => {
    const recordsPerSheet = 2000;

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "_" + mm + "_" + yyyy;

    const fileName = `lead_enquiry_${formattedToday}_from_${fromToData.from}_to_${fromToData.to}.xlsx`;

    const indexDBData = await getAllIndexDBRecords(
      INDEX_DB_CONFIG.leadEnquiries.storeObject
    );

    const filteredIndexDB = indexDBData.slice(
      fromToData.from - 1,
      fromToData.to
    );

    const excelData = [];
    for (let index = 0; index < filteredIndexDB?.length; index++) {
      const element = filteredIndexDB[index];

      const data = {
        ID: element.id,
        ContactLastProduct: element.contact_last_product,
        ContactName: element.contacts_name,
        ContactMobile: element.contacts_mobile1,
        City: element.contact_city,
        State: element.contact_state,
        Country: element.country_name,
        ContactAddedDate: element.contacts_add_date,
        LastProductQTY: element.last_product_qty,
        Remark: element.contact_type_remarks,
        LastMessage: element.last_message,
      };

      excelData.push(data);
    }

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();

    const numSheets = Math.ceil(excelData.length / recordsPerSheet) ?? 1;

    for (let i = 0; i < numSheets; i++) {
      // Slice data for the current sheet
      const startIdx = i * recordsPerSheet;
      const endIdx = startIdx + recordsPerSheet;
      const sheetData = excelData?.slice(startIdx, endIdx);

      // Convert the sliced data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(sheetData);

      // Add the worksheet to the workbook with a name like "Sheet1", "Sheet2", etc.
      const sheetName = `LeadEnquiry_${i + 1}`;
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div style={{ margin: 16, border: "1px solid #F6F6F6" }}>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            name="from"
            aria-label="From"
            placeholder="From value"
            defaultValue={1}
            onChange={handleInputValues}
          />

          <input
            name="to"
            aria-label="To"
            placeholder="To value"
            defaultValue={100}
            onChange={handleInputValues}
          />

          <button
            disabled={!fromToData.from || !fromToData.to}
            onClick={exportToExcel}
          >
            Export Excel sheet
          </button>
        </div>
      </div>
    </div>
  );
}
