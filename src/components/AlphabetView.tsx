import React, { useState } from 'react';
import { Volume2, CheckCircle2, Bookmark, Info, Sparkles, PenLine } from 'lucide-react';
import { ARABIC_LETTERS, ArabicLetter } from '../data/arabicAlphabet';
import { CalligraphyCanvas } from './CalligraphyCanvas';
import { speakArabic } from '../utils/sound';

interface AlphabetViewProps {
  masteredLetters: string[];
  onToggleMastered: (id: string) => void;
}

export const AlphabetView: React.FC<AlphabetViewProps> = ({
  masteredLetters,
  onToggleMastered,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_LETTERS[0]);
  const [vowelSuffix, setVowelSuffix] = useState<string>(''); // '', 'َ', 'ِ', 'ُ', 'ْ'
  const [activeFilter, setActiveFilter] = useState<'all' | 'solar' | 'lunar' | 'emphatic' | 'nonconnecting'>('all');
  const [activeTab, setActiveTab] = useState<'details' | 'calligraphy'>('details');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const filteredLetters = ARABIC_LETTERS.filter((l) => {
    if (activeFilter === 'solar') return l.isSolar;
    if (activeFilter === 'lunar') return !l.isSolar;
    if (activeFilter === 'emphatic') return l.isEmphatic;
    if (activeFilter === 'nonconnecting') return l.nonConnectingLeft;
    return true;
  });

  const handlePlaySound = (text: string) => {
    setIsSpeaking(true);
    speakArabic(text, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const currentDisplayLetter = vowelSuffix
    ? selectedLetter.isolated + vowelSuffix
    : selectedLetter.isolated;

  const isCurrentMastered = masteredLetters.includes(selectedLetter.id);

  return (
    <div className="flex flex-col gap-8">
      {/* Editorial Header / Intro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>L'Alphabet Arabe</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">الأَبْجَدِيَّة</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            L'arabe s'écrit de droite à gauche. Les 28 lettres sont toutes des consonnes ou semi-consonnes, dont la forme varie harmonieusement selon leur position dans le mot.
          </p>
        </div>

        {/* Progress summary */}
        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shrink-0 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Progression :</span>
          <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
            {masteredLetters.length} / {ARABIC_LETTERS.length} lettres
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeFilter === 'all'
              ? 'bg-amber-500 text-slate-950 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Toutes (28)
        </button>
        <button
          onClick={() => setActiveFilter('solar')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeFilter === 'solar'
              ? 'bg-amber-500 text-slate-950 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Lettres Solaires (14)
        </button>
        <button
          onClick={() => setActiveFilter('lunar')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeFilter === 'lunar'
              ? 'bg-amber-500 text-slate-950 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Lettres Lunaires (14)
        </button>
        <button
          onClick={() => setActiveFilter('emphatic')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeFilter === 'emphatic'
              ? 'bg-amber-500 text-slate-950 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Emphatiques (Grave)
        </button>
        <button
          onClick={() => setActiveFilter('nonconnecting')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeFilter === 'nonconnecting'
              ? 'bg-amber-500 text-slate-950 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Non-liantes à gauche (6)
        </button>
      </div>

      {/* Main 2-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Interactive Letters Grid */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5" dir="rtl">
            {filteredLetters.map((l) => {
              const isSelected = selectedLetter.id === l.id;
              const isMastered = masteredLetters.includes(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLetter(l);
                    setVowelSuffix('');
                  }}
                  className={`relative p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 group shadow-sm ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {isMastered && (
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                  <span className="font-arabic text-3xl font-medium text-slate-900 dark:text-white group-hover:scale-105 transition-transform">
                    {l.isolated}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {l.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2">
            <span>Cliquez sur une lettre pour l'analyser ou vous entraîner à la tracer.</span>
            <span>Ordre traditionnel (الأبجدية)</span>
          </div>
        </div>

        {/* Right Zone: Letter Deep Dive Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl sticky top-24">
          {/* Header of card */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-medium">{selectedLetter.name}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{selectedLetter.translit}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">
                {selectedLetter.isSolar ? 'Solaire' : 'Lunaire'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleMastered(selectedLetter.id)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                  isCurrentMastered
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={isCurrentMastered ? 'Maîtrisée' : 'Marquer comme apprise'}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCurrentMastered ? 'Apprise' : 'À apprendre'}</span>
              </button>
            </div>
          </div>

          {/* Letter Main Showcase & Sound Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <div className="flex flex-col items-center sm:items-start">
              <div className="font-arabic text-6xl text-amber-500 dark:text-amber-400 leading-none py-2">
                {currentDisplayLetter}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
                {selectedLetter.nameAr}
              </span>
            </div>

            {/* Vocalization toggler buttons */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tester avec voyelle :</div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                <button
                  onClick={() => setVowelSuffix('')}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    vowelSuffix === '' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Neutre"
                >
                  ø
                </button>
                <button
                  onClick={() => setVowelSuffix('َ')}
                  className={`px-2 py-1 text-xs font-arabic rounded transition-colors ${
                    vowelSuffix === 'َ' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Fatha (a)"
                >
                  ـَ
                </button>
                <button
                  onClick={() => setVowelSuffix('ِ')}
                  className={`px-2 py-1 text-xs font-arabic rounded transition-colors ${
                    vowelSuffix === 'ِ' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Kasra (i)"
                >
                  ـِ
                </button>
                <button
                  onClick={() => setVowelSuffix('ُ')}
                  className={`px-2 py-1 text-xs font-arabic rounded transition-colors ${
                    vowelSuffix === 'ُ' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Damma (ou)"
                >
                  ـُ
                </button>
                <button
                  onClick={() => setVowelSuffix('ْ')}
                  className={`px-2 py-1 text-xs font-arabic rounded transition-colors ${
                    vowelSuffix === 'ْ' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Sukun (stop)"
                >
                  ـْ
                </button>
              </div>

              {/* Speaker button */}
              <button
                onClick={() => handlePlaySound(currentDisplayLetter)}
                disabled={isSpeaking}
                className="mt-1 flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-white rounded-lg text-xs font-medium transition-all shadow-sm"
              >
                <Volume2 className={`w-4 h-4 text-amber-500 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span>Écouter la prononciation</span>
              </button>
            </div>
          </div>

          {/* Sub tabs: Details vs Calligraphy */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2.5 border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-amber-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Formes & Phonétique
            </button>
            <button
              onClick={() => setActiveTab('calligraphy')}
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'calligraphy'
                  ? 'border-amber-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <PenLine className="w-3.5 h-3.5 text-amber-500" />
              <span>S'entraîner à tracer</span>
            </button>
          </div>

          {activeTab === 'details' ? (
            <div className="flex flex-col gap-5 text-sm">
              {/* 4 Contextual Forms */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Les 4 Formes de la lettre
                </span>
                <div className="grid grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 text-center" dir="rtl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Isolée</span>
                    <span className="font-arabic text-2xl text-amber-600 dark:text-amber-300">{selectedLetter.isolated}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Initiale</span>
                    <span className="font-arabic text-2xl text-amber-600 dark:text-amber-300">{selectedLetter.initial}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Médiane</span>
                    <span className="font-arabic text-2xl text-amber-600 dark:text-amber-300">{selectedLetter.medial}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Finale</span>
                    <span className="font-arabic text-2xl text-amber-600 dark:text-amber-300">{selectedLetter.final}</span>
                  </div>
                </div>
              </div>

              {/* Phonetics & Tips */}
              <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/60">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Guide d'articulation</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedLetter.phoneticFr}
                </p>
                <div className="text-[11px] text-amber-700 dark:text-amber-300/90 pt-1">
                  💡 {selectedLetter.soundTip}
                </div>
              </div>

              {/* Example Word */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Exemple en contexte :</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedLetter.exampleWord.fr}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({selectedLetter.exampleWord.translit})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-arabic text-2xl text-amber-600 dark:text-amber-300">
                    {selectedLetter.exampleWord.ar}
                  </span>
                  <button
                    onClick={() => handlePlaySound(selectedLetter.exampleWord.ar)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    title="Écouter le mot"
                  >
                    <Volume2 className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <CalligraphyCanvas
              letter={selectedLetter.isolated}
              letterName={selectedLetter.name}
              onComplete={() => onToggleMastered(selectedLetter.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
