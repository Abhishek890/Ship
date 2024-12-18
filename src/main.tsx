import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/pdf.css';
import './styles/debug.css';

// Error boundary for the entire app
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Failed to find the root element');
    }

    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error during app initialization:', error);
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui;">
        <h1 style="color: #dc2626;">Application Error</h1>
        <p style="margin: 1rem 0;">We're sorry, but something went wrong. Please try refreshing the page.</p>
        <p style="color: #666; font-size: 0.875rem;">${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
};

renderApp();