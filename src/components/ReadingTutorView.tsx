import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Play,
  ArrowRight,
  Shuffle
} from 'lucide-react';
import {
  SHORT_SYLLABLES_DATA,
  MADD_DATA,
  SUKUN_DATA,
  TANWIN_DATA,
  SHADDAH_DATA,
  WORD_ASSEMBLY_LESSONS,
  WordAssemblyLesson
} from '../data/readingLessons';
import { speakArabic, stopArabicSpeech } from '../utils/sound';

type ReadingLevel = 'short_vowels' | 'madd' | 'sukun' | 'tanwin' | 'shaddah' | 'assembly' | 'quiz';

export function ReadingTutorView() {
  const [activeLevel, setActiveLevel] = useState<ReadingLevel>('short_vowels');
  const [playingSyllable, setPlayingSyllable] = useState<string | null>(null);

  // Selected word in Assembly level
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);

  // Reading Practice Quiz State
  const [quizWordIndex, setQuizWordIndex] = useState<number>(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  const handlePlay = (id: string, text: string) => {
    if (playingSyllable === id) {
      stopArabicSpeech();
      setPlayingSyllable(null);
      return;
    }
    setPlayingSyllable(id);
    speakArabic(text, {
      rate: 0.75, // Slow and clear for beginners
      onEnd: () => setPlayingSyllable(null),
      onError: () => setPlayingSyllable(null)
    });
  };

  const currentAssemblyWord = WORD_ASSEMBLY_LESSONS[selectedWordIndex];

  // Quiz helper: generates 3 options for the current quiz word
  const currentQuizWord = WORD_ASSEMBLY_LESSONS[quizWordIndex];
  const quizOptions = React.useMemo(() => {
    const wrong = WORD_ASSEMBLY_LESSONS.filter((w) => w.id !== currentQuizWord.id)
      .slice(0, 2)
      .map((w) => w.fullWord);
    return [currentQuizWord.fullWord, ...wrong].sort();
  }, [quizWordIndex, currentQuizWord]);

  const handleCheckQuizAnswer = (word: string) => {
    if (quizAnswered) return;
    setQuizSelectedAnswer(word);
    setQuizAnswered(true);
    if (word === currentQuizWord.fullWord) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setQuizSelectedAnswer(null);
    setQuizAnswered(false);
    setQuizWordIndex((prev) => (prev + 1) % WORD_ASSEMBLY_LESSONS.length);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-600/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 backdrop-blur-md border border-amber-300/30 rounded-full text-amber-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fianarana Mamaky Teny Arabo · Apprendre à lire l'arabe (Al-Qaida)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Ianaro Mamaky Teny Arabo Dingana Isan-Dingana
          </h2>
          <p className="text-sm text-amber-100/90 leading-relaxed max-w-2xl">
            Tari-dalana mifototra amin'ny fomba fanabeazana Al-Qaida An-Nouraniyya : manomboka amin'ny vaninteny
            fohy (Fatha, Kasra, Damma), mankany amin'ny zanatsoratra lava (Madd), Soukoun, Tanwin, Shaddah, ary
            fampitambarana teny feno miaraka amin'ny feo.
          </p>
        </div>

        <div className="absolute right-4 -bottom-6 select-none pointer-events-none opacity-10 hidden sm:block">
          <span className="font-arabic text-8xl text-amber-300">اِقْرَأْ بِاسْمِ رَبِّكَ</span>
        </div>
      </div>

      {/* Levels Selector Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
        <button
          onClick={() => setActiveLevel('short_vowels')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'short_vowels'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>1. Syllabes courtes (a, i, u)</span>
        </button>

        <button
          onClick={() => setActiveLevel('madd')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'madd'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>2. Voyelles longues (Madd)</span>
        </button>

        <button
          onClick={() => setActiveLevel('sukun')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'sukun'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>3. Le Soukoun (ـْ)</span>
        </button>

        <button
          onClick={() => setActiveLevel('tanwin')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'tanwin'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>4. Le Tanwīn (ـٌ ـً ـٍ)</span>
        </button>

        <button
          onClick={() => setActiveLevel('shaddah')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'shaddah'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>5. La Shaddah (ـّ)</span>
        </button>

        <button
          onClick={() => setActiveLevel('assembly')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'assembly'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>6. Assemblage de mots</span>
        </button>

        <button
          onClick={() => setActiveLevel('quiz')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeLevel === 'quiz'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <span>7. Défi Écoute & Lecture</span>
        </button>
      </div>

      {/* ---------------- LEVEL 1: SHORT VOWELS MATRIX ---------------- */}
      {activeLevel === 'short_vowels' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Ny Vaninteny Fohy (Fatha, Kasra, Damma)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Kitiho ny vaninteny tsirairay mba hihainoana ny fanononana mazava tsara amin'ny feo arabo.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-slate-700 dark:text-slate-300">Fatha (a)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                <span className="text-slate-700 dark:text-slate-300">Kasra (i)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-700 dark:text-slate-300">Damma (u)</span>
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SHORT_SYLLABLES_DATA.map((item) => (
              <div
                key={item.letter}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-arabic text-2xl text-slate-900 dark:text-white font-bold">
                    {item.letter}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                      {item.letterNameMalagasy}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.letterName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {/* Fatha */}
                  <button
                    onClick={() => handlePlay(`fatha-${item.letter}`, item.fatha.audio)}
                    className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200/80 dark:border-amber-800/60 flex flex-col items-center justify-center transition-all group"
                  >
                    <span className="font-arabic text-xl font-bold text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform">
                      {item.fatha.ar}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-900 dark:text-amber-200 mt-0.5">
                      {item.fatha.ph}
                    </span>
                  </button>

                  {/* Kasra */}
                  <button
                    onClick={() => handlePlay(`kasra-${item.letter}`, item.kasra.audio)}
                    className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/40 border border-sky-200/80 dark:border-sky-800/60 flex flex-col items-center justify-center transition-all group"
                  >
                    <span className="font-arabic text-xl font-bold text-sky-700 dark:text-sky-300 group-hover:scale-110 transition-transform">
                      {item.kasra.ar}
                    </span>
                    <span className="text-[10px] font-semibold text-sky-900 dark:text-sky-200 mt-0.5">
                      {item.kasra.ph}
                    </span>
                  </button>

                  {/* Damma */}
                  <button
                    onClick={() => handlePlay(`damma-${item.letter}`, item.damma.audio)}
                    className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col items-center justify-center transition-all group"
                  >
                    <span className="font-arabic text-xl font-bold text-emerald-700 dark:text-emerald-300 group-hover:scale-110 transition-transform">
                      {item.damma.ar}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-900 dark:text-emerald-200 mt-0.5">
                      {item.damma.ph}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 2: VOYELLES LONGUES (MADD) ---------------- */}
      {activeLevel === 'madd' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Ireo Zanatsoratra Lava (Al-Madd / Prolongation)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Raha arahin'ny Alif (ا), Waw (و), na Ya (ي) ny vaninteny, dia halavaina avo roa heny ny feo (2 harakat).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MADD_DATA.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-arabic text-2xl text-amber-500 font-bold">{m.letter}</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Fampitahana : Fohy vs Lava
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlay(`madd-short-${m.id}`, m.shortForm.ar)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                  >
                    Fohy: {m.shortForm.ar} ({m.shortForm.ph})
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Madd Alif */}
                  <button
                    onClick={() => handlePlay(`madd-alif-${m.id}`, m.longFormAlif.ar)}
                    className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 flex flex-col items-center justify-center gap-1 transition-all"
                  >
                    <span className="font-arabic text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {m.longFormAlif.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {m.longFormAlif.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Madd Alif (ā)</span>
                  </button>

                  {/* Madd Waw */}
                  <button
                    onClick={() => handlePlay(`madd-waw-${m.id}`, m.longFormWaw.ar)}
                    className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center gap-1 transition-all"
                  >
                    <span className="font-arabic text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {m.longFormWaw.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {m.longFormWaw.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Madd Waw (ū)</span>
                  </button>

                  {/* Madd Ya */}
                  <button
                    onClick={() => handlePlay(`madd-ya-${m.id}`, m.longFormYa.ar)}
                    className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 flex flex-col items-center justify-center gap-1 transition-all"
                  >
                    <span className="font-arabic text-2xl font-bold text-sky-600 dark:text-sky-400">
                      {m.longFormYa.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {m.longFormYa.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Madd Ya (ī)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 3: SOUKOUN ---------------- */}
      {activeLevel === 'sukun' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Ny Soukoun (ـْ) · Les Syllabes Fermées
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Boribory kely eo ambonin'ny litera manapaka ny feo tsy misy zanatsoratra. Tsy azo tononina irery izy fa miaraka amin'ny litera eo alohany.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUKUN_DATA.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-arabic text-3xl font-bold text-slate-900 dark:text-white">
                    {item.arabic}
                  </span>
                  <button
                    onClick={() => handlePlay(item.id, item.arabic)}
                    className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {item.phonetic}
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    🇲🇬 {item.malagasy} · 🇫🇷 {item.french}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  💡 {item.malagasyRule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 4: TANWÎN ---------------- */}
      {activeLevel === 'tanwin' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Ny Tanwīn (ـٌ ـً ـٍ) · La Nunation
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Zanatsoratra roa miaraka amin'ny faran'ny teny manampy ny feo 'N' (un, an, in).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TANWIN_DATA.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {t.malagasy} ({t.french})
                    </h4>
                    <span className="text-xs text-slate-400">Fototra : {t.baseWord}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Tanwin Damm */}
                  <button
                    onClick={() => handlePlay(`tanwin-damm-${t.id}`, t.tanwinDamm.ar)}
                    className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-arabic text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {t.tanwinDamm.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {t.tanwinDamm.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Damm (-un)</span>
                  </button>

                  {/* Tanwin Fath */}
                  <button
                    onClick={() => handlePlay(`tanwin-fath-${t.id}`, t.tanwinFath.ar)}
                    className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-arabic text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {t.tanwinFath.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {t.tanwinFath.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Fath (-an)</span>
                  </button>

                  {/* Tanwin Kasr */}
                  <button
                    onClick={() => handlePlay(`tanwin-kasr-${t.id}`, t.tanwinKasr.ar)}
                    className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 flex flex-col items-center justify-center gap-1"
                  >
                    <span className="font-arabic text-2xl font-bold text-sky-600 dark:text-sky-400">
                      {t.tanwinKasr.ar}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {t.tanwinKasr.ph}
                    </span>
                    <span className="text-[10px] text-slate-500">Kasr (-in)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 5: LA SHADDAH ---------------- */}
      {activeLevel === 'shaddah' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Ny Shaddah (ـّ) · Les Consonnes Redoublées
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Famantarana kely miendrika 'w' maneho fa averina indroa ny litera (voalohany misy soukoun, faharoa misy zanatsoratra).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SHADDAH_DATA.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-arabic text-3xl font-bold text-slate-900 dark:text-white">
                    {s.arabic}
                  </span>
                  <button
                    onClick={() => handlePlay(s.id, s.arabic)}
                    className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {s.phonetic}
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                    🇲🇬 {s.malagasy} · 🇫🇷 {s.french}
                  </p>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    Fizarazarana : {s.breakdown}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 6: WORD ASSEMBLY & READING STUDIO ---------------- */}
      {activeLevel === 'assembly' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Fampitambarana Teny & Famakiana (Assemblage de mots complets)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Jereo ny fomba ifampitohizan'ireo litera sy ny vaninteny mba hahavita teny arabo feno.
            </p>
          </div>

          {/* Quick Word List selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {WORD_ASSEMBLY_LESSONS.map((word, idx) => (
              <button
                key={word.id}
                onClick={() => setSelectedWordIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedWordIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span className="font-arabic text-base">{word.fullWord}</span>
                <span>({word.phonetic})</span>
              </button>
            ))}
          </div>

          {/* Word Assembly Interactive Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/40 border border-amber-200/80 dark:border-amber-800/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  Teny voafidy :
                </span>
                <div className="flex items-center gap-3">
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentAssemblyWord.malagasy}
                  </h4>
                  <span className="text-sm text-slate-500">({currentAssemblyWord.french})</span>
                </div>
              </div>

              <button
                onClick={() => handlePlay(currentAssemblyWord.id, currentAssemblyWord.fullWord)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-colors self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Henoy ny teny manontolo</span>
              </button>
            </div>

            {/* Big Full Word Display */}
            <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-lg flex flex-col items-center justify-center gap-2">
              <span
                dir="rtl"
                className="font-arabic text-5xl sm:text-6xl text-amber-400 tracking-wider font-medium"
              >
                {currentAssemblyWord.fullWord}
              </span>
              <span className="text-lg font-bold text-slate-200 mt-2">
                {currentAssemblyWord.phonetic}
              </span>
            </div>

            {/* Syllables Breakdown Chain */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Fizarazarana vaninteny (Kitiho ny tsirairay mba hihainoana azy) :
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentAssemblyWord.syllables.map((syl, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handlePlay(`syl-${sIdx}-${currentAssemblyWord.id}`, syl.joined)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 flex flex-col items-center justify-center gap-1 group transition-all"
                  >
                    <span className="font-arabic text-3xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {syl.joined}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {syl.phonetic}
                    </span>
                    <span className="text-[10px] text-slate-400">{syl.vowelName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips & Pedagogy */}
            {(currentAssemblyWord.tipMalagasy || currentAssemblyWord.tipFrench) && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/40 text-xs space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  💡 Torohevitra amin'ny famakiana :
                </span>
                <p className="text-slate-800 dark:text-slate-200">
                  {currentAssemblyWord.tipMalagasy}
                </p>
                <p className="text-slate-600 dark:text-slate-400 italic">
                  {currentAssemblyWord.tipFrench}
                </p>
              </div>
            )}

            {/* Prev / Next */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={selectedWordIndex === 0}
                onClick={() => setSelectedWordIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                ← Teny teo aloha
              </button>
              <span className="text-xs text-slate-500 font-semibold">
                {selectedWordIndex + 1} amin'ny {WORD_ASSEMBLY_LESSONS.length}
              </span>
              <button
                disabled={selectedWordIndex === WORD_ASSEMBLY_LESSONS.length - 1}
                onClick={() =>
                  setSelectedWordIndex((prev) =>
                    Math.min(WORD_ASSEMBLY_LESSONS.length - 1, prev + 1)
                  )
                }
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 disabled:opacity-40"
              >
                Teny manaraka →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- LEVEL 7: READING PRACTICE QUIZ ---------------- */}
      {activeLevel === 'quiz' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                7. Fanadinana Famakiana & Fihainoana
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Henoy ny teny tononina ary fidio ny fanoratana arabo marina mifanaraka aminy.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Isa azo :</span>
              <span className="text-lg font-extrabold text-amber-500">{quizScore} pts</span>
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            {/* Audio Play Button */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Dingana {quizWordIndex + 1} / {WORD_ASSEMBLY_LESSONS.length}
              </span>

              <button
                onClick={() => handlePlay('quiz-word', currentQuizWord.fullWord)}
                className="w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 inline-flex items-center justify-center shadow-lg hover:scale-105 transition-all"
              >
                <Volume2 className="w-8 h-8" />
              </button>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Kitiho ny bokotra mba hihainoana ny teny (Dikany : {currentQuizWord.malagasy})
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quizOptions.map((opt) => {
                const isSelected = quizSelectedAnswer === opt;
                const isCorrect = opt === currentQuizWord.fullWord;
                let btnStyle =
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-500';

                if (quizAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-500';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-500';
                  } else {
                    btnStyle = 'opacity-50 border-slate-200';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={quizAnswered}
                    onClick={() => handleCheckQuizAnswer(opt)}
                    className={`p-6 rounded-2xl border text-center transition-all ${btnStyle}`}
                  >
                    <span className="font-arabic text-3xl font-bold block">{opt}</span>
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-sm font-bold">
                  {quizSelectedAnswer === currentQuizWord.fullWord ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      🎉 Tena marina ! Tsara be ! (Excellente réponse)
                    </span>
                  ) : (
                    <span className="text-rose-500">
                      ❌ Diso kely. Ny valiny marina dia {currentQuizWord.fullWord} ({currentQuizWord.phonetic})
                    </span>
                  )}
                </p>

                <button
                  onClick={handleNextQuiz}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Fanontaniana manaraka →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
