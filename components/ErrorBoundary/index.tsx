import React, { ErrorInfo, useState } from "react";

import { log } from "../../lib/logging";

interface Props {
  children: JSX.Element;
}

class ErrorBoundary extends React.Component<
  Props,
  { error: Error | null; errorInfo: ErrorInfo | null }
> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    log.error(error);
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <div>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </div>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
