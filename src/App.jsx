import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Account from "./pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "account", element: <Account /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
