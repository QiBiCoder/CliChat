// Ensure window.fetch has both a getter and setter to prevent "Cannot set property fetch of #<Window> which has only a getter"
if (typeof window !== 'undefined') {
  try {
    const origFetch = window.fetch;
    let activeFetch = origFetch;
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch') ||
                 (typeof Window !== 'undefined' && Object.getOwnPropertyDescriptor(Window.prototype, 'fetch'));
    if (!desc || !desc.set || desc.writable === false) {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: true,
        get: () => activeFetch,
        set: (fn) => {
          activeFetch = fn;
        },
      });
    }
  } catch {
    // Ignore if not reconfigurable
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
