import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import { speakArabic } from '../utils/sound';

interface QuizViewProps {
  onQuizCompleted?: (score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onQuizCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'alphabet' | 'vocab' | 'grammar'>('all');

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (categoryFilter === 'all') return true;
    return q.category === categoryFilter;
  });

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted || !currentQ) return;
    setIsSubmitted(true);

    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b'],
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
      if (onQuizCompleted) {
        onQuizCompleted(score + (currentQ?.options.find((o) => o.id === selectedOptionId)?.isCorrect ? 1 : 0));
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handlePlayPrompt = (text: string) => {
    speakArabic(text);
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Quiz & Entraînement</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">اِخْتِبَار</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Testez vos connaissances en alphabet, vocabulaire et grammaire avec corrections immédiates.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-sm">
          <button
            onClick={() => {
              setCategoryFilter('all');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              categoryFilter === 'all' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => {
              setCategoryFilter('alphabet');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              categoryFilter === 'alphabet' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Alphabet
          </button>
          <button
            onClick={() => {
              setCategoryFilter('vocab');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              categoryFilter === 'vocab' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Vocabulaire
          </button>
          <button
            onClick={() => {
              setCategoryFilter('grammar');
              handleRestart();
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              categoryFilter === 'grammar' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Grammaire
          </button>
        </div>
      </div>

      {isCompleted ? (
        /* Result Screen */
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col items-center gap-6 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-arabic text-3xl text-amber-500">مُمْتَاز! (Excellent !)</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Quiz Terminé</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Vous avez obtenu un score de <strong className="text-amber-600 dark:text-amber-400 tabular-nums text-base">{score}</strong> sur{' '}
              <strong className="text-slate-900 dark:text-white tabular-nums text-base">{filteredQuestions.length}</strong> questions.
            </p>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-800">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
            />
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer la série</span>
          </button>
        </div>
      ) : currentQ ? (
        /* Question Card */
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          {/* Progress bar and counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Question <strong className="text-slate-900 dark:text-white tabular-nums">{currentIndex + 1}</strong> sur{' '}
              <strong className="text-slate-900 dark:text-white tabular-nums">{filteredQuestions.length}</strong>
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold tabular-nums">
              Score : {score} pts
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
              {currentQ.questionFr}
            </h3>

            {currentQ.arabicPrompt && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80 self-start shadow-sm">
                <span className="font-arabic text-3xl text-amber-500 dark:text-amber-400">
                  {currentQ.arabicPrompt}
                </span>
                <button
                  onClick={() => handlePlayPrompt(currentQ.arabicPrompt!)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-500 transition-colors shadow-sm"
                  title="Écouter l'énoncé"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="flex flex-col gap-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let stateStyles = 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  stateStyles = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200 font-medium';
                } else if (isSelected && !opt.isCorrect) {
                  stateStyles = 'bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-600 text-rose-800 dark:text-rose-200';
                } else {
                  stateStyles = 'bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                stateStyles = 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/40 text-slate-900 dark:text-white font-medium';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-4 shadow-sm ${stateStyles}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{opt.text}</span>
                    {opt.subtext && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">{opt.subtext}</span>
                    )}
                  </div>

                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout after submission */}
          {isSubmitted && (
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1.5 text-xs shadow-sm">
              <span className="font-semibold text-amber-700 dark:text-amber-300">Explication pédagogique :</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <span>{currentIndex + 1 === filteredQuestions.length ? 'Voir mon bilan' : 'Question suivante'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
