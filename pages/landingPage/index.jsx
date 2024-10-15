//

import React from "react";
// libs
import { Link } from "react-router-dom";
// paths
import { APP_PAGES } from "../../routes/paths";

// ----------------------------------------------

export default function LandingPage() {
  return (
    <React.Fragment>
      <div style={{ padding: 12, borderBottom: "1px solid #E6E6E6" }}>
        <div>
          <p>LandingPage</p>
        </div>
      </div>

      <div style={{ padding: 8 }}>
        <Link to={APP_PAGES.copyCollection}>Copy Collection</Link>
      </div>
    </React.Fragment>
  );
}
