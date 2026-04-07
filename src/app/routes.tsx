import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Leads } from "./pages/Leads";
import { LeadDetail } from "./pages/LeadDetail";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Bookings } from "./pages/Bookings";
import { Communication } from "./pages/Communication";
import { Automation } from "./pages/Automation";
import { Reports } from "./pages/Reports";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "leads", Component: Leads },
      { path: "leads/:id", Component: LeadDetail },
      { path: "properties", Component: Properties },
      { path: "properties/:id", Component: PropertyDetail },
      { path: "bookings", Component: Bookings },
      { path: "communication", Component: Communication },
      { path: "automation", Component: Automation },
      { path: "reports", Component: Reports },
    ],
  },
]);
