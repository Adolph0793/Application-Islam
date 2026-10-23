import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker with automatic cache updates
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Kalam : Mise à jour du cache disponible.');
  },
  onOfflineReady() {
    console.log('Kalam : Toutes les leçons de base sont maintenant prêtes pour un accès hors-ligne.');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
