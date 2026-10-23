import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles, PenTool, Eraser } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalligraphyCanvasProps {
  letter: string;
  letterName: string;
  onComplete?: () => void;
}

export const CalligraphyCanvas: React.FC<CalligraphyCanvasProps> = ({
  letter,
  letterName,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState<'amber' | 'emerald' | 'slate'>('amber');
  const [nibSize, setNibSize] = useState<number>(10);
  const historyRef = useRef<ImageData[]>([]);

  // Nib angle in radians (typical Arabic calligraphy angle ~ 60 degrees)
  const nibAngle = (60 * Math.PI) / 180;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset on letter change
    clearCanvas();
  }, [letter]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
    setHasDrawn(false);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const drawQalamNib = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const halfWidth = nibSize / 2;
    const dx = Math.cos(nibAngle) * halfWidth;
    const dy = Math.sin(nibAngle) * halfWidth;

    ctx.save();
    if (penColor === 'amber') {
      ctx.fillStyle = '#f59e0b';
    } else if (penColor === 'emerald') {
      ctx.fillStyle = '#10b981';
    } else {
      ctx.fillStyle = '#475569';
    }

    ctx.beginPath();
    ctx.moveTo(x - dx, y - dy);
    ctx.lineTo(x + dx, y + dy);
    ctx.lineTo(x + dx + 1, y + dy + 1);
    ctx.lineTo(x - dx + 1, y - dy + 1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save history
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > 10) historyRef.current.shift();

    setIsDrawing(true);
    setHasDrawn(true);

    const { x, y } = getCanvasCoords(e);
    drawQalamNib(ctx, x, y);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    drawQalamNib(ctx, x, y);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || historyRef.current.length === 0) return;

    const lastState = historyRef.current.pop();
    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    }
  };

  const handleVerify = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24'],
    });
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Atelier de Calligraphie (رَسْمُ الحَرْف)
          </h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Tracez de droite à gauche avec le biseau du Qalam
        </span>
      </div>

      {/* Canvas Area with Ghost Guide */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-amber-50/40 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden flex items-center justify-center select-none touch-none shadow-inner">
        {/* Background Calligraphy Guide Lines */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-8 px-6 opacity-25">
          <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full" />
          <div className="border-b border-amber-500/40 w-full" />
          <div className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full" />
        </div>

        {/* Ghost Letter Template */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none font-arabic select-none text-slate-300 dark:text-slate-700/40"
          style={{ fontSize: '13rem', lineHeight: 1 }}
        >
          {letter}
        </div>

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full cursor-crosshair z-10"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Pen settings */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-lg">
            <button
              onClick={() => setPenColor('amber')}
              title="Encre Or"
              className={`w-6 h-6 rounded-md bg-amber-500 transition-all ${
                penColor === 'amber' ? 'ring-2 ring-slate-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setPenColor('emerald')}
              title="Encre Émeraude"
              className={`w-6 h-6 rounded-md bg-emerald-500 transition-all ${
                penColor === 'emerald' ? 'ring-2 ring-slate-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setPenColor('slate')}
              title="Encre Sombre"
              className={`w-6 h-6 rounded-md bg-slate-600 dark:bg-slate-300 transition-all ${
                penColor === 'slate' ? 'ring-2 ring-slate-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Épaisseur:</span>
            <input
              type="range"
              min={6}
              max={18}
              value={nibSize}
              onChange={(e) => setNibSize(Number(e.target.value))}
              className="w-20 accent-amber-500 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!hasDrawn}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Annuler
          </button>

          <button
            onClick={clearCanvas}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Eraser className="w-3.5 h-3.5" />
            Effacer
          </button>

          <button
            onClick={handleVerify}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            Valider le tracé
          </button>
        </div>
      </div>
    </div>
  );
};
