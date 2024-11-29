import { RouterProvider, createHashRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Account from "./pages/Account";
import Bedget from "./pages/Bedget";
import Reports from "./pages/Reports";
import ErrorBoundary from "./ui/ErrorBoundary";

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, element: <Bedget /> },
      { path: "account", element: <Account /> },
      { path: "budget", element: <Bedget /> },
      { path: "reports", element: <Reports /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
