import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { SHORT_VOWELS, LONG_VOWELS, SPECIAL_SIGNS, DiacriticRule } from '../data/vowelsAndDiacritics';
import { speakArabic } from '../utils/sound';

const TEST_LETTERS = [
  { ar: 'ب', name: 'Ba' },
  { ar: 'ت', name: 'Ta' },
  { ar: 'س', name: 'Sin' },
  { ar: 'د', name: 'Dal' },
  { ar: 'م', name: 'Mim' },
  { ar: 'ل', name: 'Lam' },
  { ar: 'ك', name: 'Kaf' },
  { ar: 'ر', name: 'Ra' },
];

export const VowelsView: React.FC = () => {
  const [selectedBaseLetter, setSelectedBaseLetter] = useState(TEST_LETTERS[0]);
  const [selectedRule, setSelectedRule] = useState<DiacriticRule>(SHORT_VOWELS[0]);
  const [activeCategory, setActiveCategory] = useState<'short' | 'long' | 'special'>('short');

  const rules =
    activeCategory === 'short'
      ? SHORT_VOWELS
      : activeCategory === 'long'
      ? LONG_VOWELS
      : SPECIAL_SIGNS;

  const handlePlay = (text: string) => {
    speakArabic(text);
  };

  // Compute live combined vocalized glyph
  const getCombinedGlyph = (letter: string, rule: DiacriticRule) => {
    if (rule.id === 'madd_alif') return `${letter}َا`;
    if (rule.id === 'madd_ya') return `${letter}ِي`;
    if (rule.id === 'madd_waw') return `${letter}ُو`;
    if (rule.id === 'tanwin_fath') return `${letter}ًا`;
    return `${letter}${rule.symbol}`;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Les Voyelles & Le Tashkeel</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">الحَرَكَات</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            En arabe, les lettres sont des consonnes. La vocalisation s'effectue grâce à de petits signes diacritiques placés au-dessus ou en-dessous des lettres (Tashkeel).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Essentiel pour lire avec précision</span>
        </div>
      </div>

      {/* Interactive Letter Lab: Try Tashkeel on letters */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Laboratoire de vocalisation interactive
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Choisissez une consonne support :
          </span>
        </div>

        {/* Letter selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1" dir="rtl">
          {TEST_LETTERS.map((item) => (
            <button
              key={item.ar}
              onClick={() => setSelectedBaseLetter(item)}
              className={`px-4 py-2 rounded-xl font-arabic text-2xl border transition-all shrink-0 ${
                selectedBaseLetter.ar === item.ar
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {item.ar}
            </button>
          ))}
        </div>

        {/* Live vocalized result display */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-6">
            <div className="font-arabic text-7xl text-amber-500 dark:text-amber-400 leading-none">
              {getCombinedGlyph(selectedBaseLetter.ar, selectedRule)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-slate-900 dark:text-white">
                {selectedRule.name} ({selectedRule.nameAr})
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Son phonétique : <strong className="text-amber-600 dark:text-amber-300 font-mono">{selectedRule.sound}</strong>
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {selectedRule.frenchSound}
              </span>
            </div>
          </div>

          <button
            onClick={() => handlePlay(getCombinedGlyph(selectedBaseLetter.ar, selectedRule))}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Écouter la vocalisation</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl self-start shadow-sm">
        <button
          onClick={() => {
            setActiveCategory('short');
            setSelectedRule(SHORT_VOWELS[0]);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'short'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Voyelles Courtes (الحركات)
        </button>
        <button
          onClick={() => {
            setActiveCategory('long');
            setSelectedRule(LONG_VOWELS[0]);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'long'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Voyelles Longues (حروف المد)
        </button>
        <button
          onClick={() => {
            setActiveCategory('special');
            setSelectedRule(SPECIAL_SIGNS[0]);
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === 'special'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Signes Spéciaux & Tanwin (التنوين والشدة)
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rules.map((rule) => {
          const isSelected = selectedRule.id === rule.id;
          return (
            <div
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white">{rule.name}</h4>
                  <span className="font-arabic text-sm text-amber-600 dark:text-amber-400">{rule.nameAr}</span>
                </div>
                <div className="font-arabic text-3xl text-amber-600 dark:text-amber-300 bg-slate-50 dark:bg-slate-950 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                  {rule.exampleVocalized}
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Son : <strong className="text-slate-900 dark:text-white">{rule.sound}</strong></span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(rule.exampleVocalized);
                  }}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Écouter l'exemple"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
