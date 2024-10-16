//

import React, { useState } from "react";

// ----------------------------------------------

export default function ExcelExport() {
  const [fromToData, setFromToData] = useState({ from: 1, to: 100 });

  const handleInputValues = (e) => {
    setFromToData({ ...fromToData, [e.target.name]: Number(e.target.value) });
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

          <button disabled={!fromToData.from || !fromToData.to}>
            Export Excel sheet
          </button>
        </div>
      </div>
    </div>
  );
}
