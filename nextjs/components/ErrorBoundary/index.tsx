import React, { useState } from "react";

import { log, isError } from "../../lib/logging";

type BoundaryError = Error | null;

const ErrorMessage = ({ error }: { error: Error }) => (
  <div>
    <h2>Something went wrong.</h2>
    <div>
      {error.message}
      <br />
      {error.stack}
    </div>
  </div>
);

const ErrorBoundary = ({ children }: { children: JSX.Element }) => {
  const [thrownError, setThrownError] = useState<BoundaryError>(null);

  // Normally, just render children
  try {
    if (!thrownError) return children;
  } catch (err) {
    if (!isError(err)) throw err;

    setThrownError(err);
    log.error(err);
  }

  // Error path
  if (thrownError) return <ErrorMessage error={thrownError} />;

  return children;
};

export default ErrorBoundary;
