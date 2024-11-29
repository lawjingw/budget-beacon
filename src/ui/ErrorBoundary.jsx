import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{isRouteErrorResponse(error) ? error.data : error.message}</p>
      <Link to={-1}>&larr; Go back</Link>
    </div>
  );
}

export default ErrorBoundary;
