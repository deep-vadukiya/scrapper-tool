//

import { useRoutes } from "react-router-dom";
// pages
import LandingPage from "../pages/landingPage/index";
import RESTAPICollector from "../pages/RESTAPICollector";

// ----------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "rest-api-collector",
      element: <RESTAPICollector />,
    },
  ]);
}
