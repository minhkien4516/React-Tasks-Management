import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}
    >
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
