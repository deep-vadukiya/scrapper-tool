//

import { useRoutes } from "react-router-dom";
// pages
import LandingPage from "../pages/landingPage/index";
import CopyCollection from "../pages/copyCollection";

// ----------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "copy-collection",
      element: <CopyCollection />,
    },
  ]);
}
