import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker in supported browsers
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.debug('PlantCare Lab PWA Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.debug('Service Worker registration skipped or failed:', error);
      });
  });
} else if ('serviceWorker' in navigator) {
  // Also register in dev mode for AI Studio preview testing
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.debug('Service Worker registered in preview:', reg.scope))
      .catch((err) => console.debug('SW dev registration note:', err));
  });
}

createRoot(document.getElementById('root')!).render(<App />);
