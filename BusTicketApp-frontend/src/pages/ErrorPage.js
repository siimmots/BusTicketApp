import React from 'react';

export default function ErrorPage({ status }) {
  const messages = {
    '404': 'Page not found',
  };

  return (
    <div className="error-container">
      <div className="error-wrapper">
        <h1>{messages[status] || 'Error 404: Page not found'}</h1>
      </div>
    </div>
  );
}
