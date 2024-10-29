//

import React, { useEffect } from "react";
// libs
import { Link } from "react-router-dom";
// paths
import { APP_PAGES } from "../../routes/paths";
// util
import { LinkedInProfileScraper } from "../../utils/LinkedInScroller";

// ----------------------------------------------

const LI_COOKIE =
  "AQEDATBsFd8BFh71AAABjYPJzRMAAAGS3F4Vdk0AEK3f6UBgpflVZGF05NWeuYOr7FEtY_fc9oexXUQFY0-8lWWZt-CoZZBjugdTUOSaUOrPGNhGHrfkUtN1AQbDnI5FN_TUQrtFp16Yec6s8ZcpHrw-";

export default function LandingPage() {
  useEffect(() => {
    const getData = async () => {
      const scraper = new LinkedInProfileScraper({
        sessionCookieValue: LI_COOKIE,
        keepAlive: false,
      });

      // Prepare the scraper
      // Loading it in memory
      await scraper.setup();

      const result = await scraper.run(
        "https://www.linkedin.com/in/naranglakshay13"
      );

      console.log(result);
    };

    getData();
  }, []);

  return (
    <React.Fragment>
      <div style={{ padding: 12, borderBottom: "1px solid #E6E6E6" }}>
        <div>
          <p>LandingPage</p>
        </div>
      </div>

      <div style={{ padding: 8 }}>
        <Link to={APP_PAGES.RESTAPICollector}>Copy Collection</Link>
      </div>
    </React.Fragment>
  );
}
