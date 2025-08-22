import { Suspense, lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";

const EnquiryViewDetails = lazy(
  () => import("./components/pages/EnquiryViewDetails.tsx")
);

const EnquiryDialog = lazy(() => import("./components/EnquiryDialog.tsx"));

const EnquiryFollowUp = lazy(
  () => import("./components/pages/EnquiryFollowUp.tsx")
);

const Enquiry = lazy(() => import("./components/pages/Enquiry.tsx"));

const BusinessTypeTable = lazy(
  () => import("./components/features/masters/bussiness/BusinessType.tsx")
);

const StatusTypeTable = lazy(
  () => import("./components/features/masters/status/StatusType.tsx")
);

const MainRequirements = lazy(
  () =>
    import(
      "./components/features/masters/mainRequirements/MainRequirements.tsx"
    )
);

const CompletedEnquiries = lazy(
  () => import("./components/pages/CompletedEnquiries.tsx")
);

const SubRequirement = lazy(
  () =>
    import("./components/features/masters/subRequirements/SubRequirement.tsx")
);

const TodoList = lazy(() => import("./components/pages/TodoList.tsx"));

const DashBoard = lazy(
  () => import("./components/features/dashboard/DashBoard.tsx")
);

const Payments = lazy(
  () => import("./components/features/payments/Payments.tsx")
);

const PaymentFollowUpDashboard = lazy(
  () =>
    import(
      "./components/features/paymentDashboard/PaymentFollowUpDashboard.tsx"
    )
);

const Source = lazy(
  () => import("./components/features/masters/source/Source.tsx")
);

const Location = lazy(
  () => import("./components/features/masters/location/Location.tsx")
);

const TrashBin = lazy(() => import("./components/pages/TrashBin.tsx"));

const PaymentFollowUp = lazy(
  () => import("./components/pages/PaymentFollowUp.tsx")
);

const PendingEnquiries = lazy(
  () => import("./components/pages/PendingEnquiries.tsx")
);

const LogIn = lazy(() => import("./components/pages/LogIn.tsx"));

const ReportEnquiry = lazy(
  () => import("./components/pages/ReportEnquiry.tsx")
);

const DownloadEnquiry = lazy(
  () => import("./components/pages/DownloadEnquiry.tsx")
);

const Loading = lazy(() => import("./components/Loading.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <DashBoard />
          </Suspense>
        ),
      },
      {
        path: "home/bussines",
        element: (
          <Suspense fallback={<Loading />}>
            <BusinessTypeTable />
          </Suspense>
        ),
      },
      {
        path: "home/status",
        element: (
          <Suspense fallback={<Loading />}>
            <StatusTypeTable />
          </Suspense>
        ),
      },
      {
        path: "enquiry",
        element: (
          <Suspense fallback={<Loading />}>
            <Enquiry />
          </Suspense>
        ),
      },
      {
        path: "source",
        element: (
          <Suspense fallback={<Loading />}>
            <Source />
          </Suspense>
        ),
      },
      {
        path: "location",
        element: (
          <Suspense fallback={<Loading />}>
            <Location />
          </Suspense>
        ),
      },
      {
        path: "main-category",
        element: (
          <Suspense fallback={<Loading />}>
            <MainRequirements />
          </Suspense>
        ),
      },
      {
        path: "sub-category",
        element: (
          <Suspense fallback={<Loading />}>
            <SubRequirement />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: <p>Setting</p>,
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<Loading />}>
            <Payments />
          </Suspense>
        ),
      },
      {
        path: "todo-list",
        element: (
          <Suspense fallback={<Loading />}>
            <TodoList />
          </Suspense>
        ),
      },
      {
        path: "payment-follow-up-dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <PaymentFollowUpDashboard />
          </Suspense>
        ),
      },
      {
        path: "trash-bin",
        element: (
          <Suspense fallback={<Loading />}>
            <TrashBin />
          </Suspense>
        ),
      },
      {
        path: "completed-enquiry",
        element: (
          <Suspense fallback={<Loading />}>
            <CompletedEnquiries />
          </Suspense>
        ),
      },
      {
        path: "follow-up",
        element: (
          <Suspense fallback={<Loading />}>
            <EnquiryFollowUp />
          </Suspense>
        ),
      },
      {
        path: "/enquiry-view-details",
        element: (
          <Suspense fallback={<Loading />}>
            <EnquiryViewDetails />
          </Suspense>
        ),
      },
      {
        path: "/pending-enquiry",
        element: (
          <Suspense fallback={<Loading />}>
            <PendingEnquiries />
          </Suspense>
        ),
      },
      {
        path: "/payment-follow-up",
        element: (
          <Suspense fallback={<Loading />}>
            <PaymentFollowUp />
          </Suspense>
        ),
      },
      {
        path: "/add-enquiry",
        element: (
          <Suspense fallback={<Loading />}>
            <EnquiryDialog />
          </Suspense>
        ),
      },
      {
        path: "/report-enquiry",
        element: (
          <Suspense fallback={<Loading />}>
            <ReportEnquiry />
          </Suspense>
        ),
      },
      {
        path: "/download",
        element: (
          <Suspense fallback={<Loading />}>
            <DownloadEnquiry />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
