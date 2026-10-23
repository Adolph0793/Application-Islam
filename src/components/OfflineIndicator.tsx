import React from 'react';
import { WifiOff, CheckCircle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-semibold shadow-2xl border border-amber-400 animate-bounce">
      <WifiOff className="w-4 h-4 shrink-0" />
      <div>
        <span>Mode Hors-ligne actif — </span>
        <span className="font-normal opacity-90">
          Les leçons de base, l'alphabet, les règles et le dictionnaire sont disponibles sans connexion.
        </span>
      </div>
    </div>
  );
};
