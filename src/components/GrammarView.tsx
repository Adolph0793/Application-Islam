import React, { useState } from 'react';
import { Volume2, BookOpen, CheckCircle2, Lightbulb, Compass, GitBranch } from 'lucide-react';
import { GRAMMAR_LESSONS, GrammarLesson } from '../data/grammarLessons';
import { speakArabic } from '../utils/sound';

export const GrammarView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);

  const handlePlay = (text: string) => {
    speakArabic(text);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Règles de Grammaire Fondamentales</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">قَوَاعِدُ اللُّغَة</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Comprenez la structure élégante et logique de la langue arabe à travers des leçons claires, concises et illustrées d'exemples audios.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Arabe Moderne Standard (الفصحى)</span>
        </div>
      </div>

      {/* 2-Zone Sandbox: Left Lesson Menu, Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lesson Menu */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            Sommaire des notions
          </span>
          {GRAMMAR_LESSONS.map((lesson, idx) => {
            const isSelected = selectedLesson.id === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1.5 shadow-sm ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/30'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{lesson.badge}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  {lesson.titleFr}
                </h4>
                <span className="font-arabic text-xs text-slate-500 dark:text-slate-400">
                  {lesson.titleAr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Lesson Deep Dive */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          {/* Lesson Header */}
          <div className="flex flex-col gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-6">
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <span>{selectedLesson.badge}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="font-arabic text-base">{selectedLesson.titleAr}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {selectedLesson.titleFr}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
              {selectedLesson.summary}
            </p>
          </div>

          {/* Lesson Sections */}
          <div className="flex flex-col gap-8">
            {selectedLesson.sections.map((sec, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-3">
                <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{sec.heading}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sec.explanation}
                </p>

                {/* Examples Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {sec.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 flex flex-col justify-between gap-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-arabic text-2xl text-amber-600 dark:text-amber-300 leading-none">
                          {ex.arabic}
                        </div>
                        <button
                          onClick={() => handlePlay(ex.arabic)}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
                          title="Écouter l'exemple"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">{ex.translit}</span>
                        <span className="text-slate-900 dark:text-slate-200 font-medium">{ex.french}</span>
                        {ex.note && (
                          <span className="text-[11px] text-amber-700 dark:text-amber-400/90 italic mt-1">
                            ℹ️ {ex.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Takeaway Callout */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 mt-4">
            <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-300">À retenir absolument</span>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedLesson.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
