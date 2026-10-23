import React, { useState, useEffect } from 'react';
import {
  PenTool,
  BookOpen,
  Volume2,
  Sparkles,
  Trophy,
  CheckCircle,
  RotateCcw,
  Bot,
  Layers,
  HelpCircle,
  Compass,
  Languages,
  Sun,
  Moon,
  Heart,
} from 'lucide-react';
import { AlphabetView } from './components/AlphabetView';
import { VowelsView } from './components/VowelsView';
import { VocabularyView } from './components/VocabularyView';
import { GrammarView } from './components/GrammarView';
import { QuizView } from './components/QuizView';
import { AITutorView } from './components/AITutorView';
import { TranslatorView } from './components/TranslatorView';
import { QuranView } from './components/QuranView';
import { IslamicStudiesView } from './components/IslamicStudiesView';
import { ReadingTutorView } from './components/ReadingTutorView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ARABIC_LETTERS } from './data/arabicAlphabet';
import { speakArabic } from './utils/sound';

type NavSection =
  | 'alphabet'
  | 'reading'
  | 'vowels'
  | 'vocab'
  | 'grammar'
  | 'translate'
  | 'quran'
  | 'islam'
  | 'quiz'
  | 'tutor';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('alphabet');

  // Theme state persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('kalam_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [masteredLetters, setMasteredLetters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kalam_mastered_letters');
      return saved ? JSON.parse(saved) : ['alif', 'ba'];
    } catch {
      return ['alif', 'ba'];
    }
  });

  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kalam_bookmarked_words');
      return saved ? JSON.parse(saved) : ['g1', 'g2'];
    } catch {
      return ['g1', 'g2'];
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kalam_streak_days');
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  const [quizScoreTotal, setQuizScoreTotal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kalam_quiz_score');
      return saved ? parseInt(saved, 10) : 18;
    } catch {
      return 18;
    }
  });

  // Apply theme to document root and save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kalam_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kalam_mastered_letters', JSON.stringify(masteredLetters));
    } catch (e) {
      console.error(e);
    }
  }, [masteredLetters]);

  useEffect(() => {
    try {
      localStorage.setItem('kalam_bookmarked_words', JSON.stringify(bookmarkedWords));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedWords]);

  const handleToggleMasteredLetter = (letterId: string) => {
    setMasteredLetters((prev) =>
      prev.includes(letterId) ? prev.filter((id) => id !== letterId) : [...prev, letterId]
    );
  };

  const handleToggleBookmarkWord = (wordId: string) => {
    setBookmarkedWords((prev) =>
      prev.includes(wordId) ? prev.filter((id) => id !== wordId) : [...prev, wordId]
    );
  };

  const handleQuizCompleted = (score: number) => {
    setQuizScoreTotal((prev) => {
      const updated = prev + score;
      try {
        localStorage.setItem('kalam_quiz_score', updated.toString());
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handlePlayHero = () => {
    speakArabic('اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ');
  };

  // Global module completion metrics
  const totalLetters = 28;
  const lettersProgress = (masteredLetters.length / totalLetters) * 100;
  const totalVocabTarget = 20;
  const vocabProgress = Math.min((bookmarkedWords.length / totalVocabTarget) * 100, 100);
  const totalQuizTarget = 16;
  const quizProgress = Math.min((quizScoreTotal / totalQuizTarget) * 100, 100);

  // Global weighted completion percentage across all learning modules
  const totalProgress = Math.min(
    100,
    Math.round(lettersProgress * 0.40 + vocabProgress * 0.30 + quizProgress * 0.30)
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200 transition-colors duration-200">
      {/* Top Bar Contract: 3 zones separated by gap-8: [Brand Title] — [Nav Links] — [1 Primary Action] */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8 transition-colors relative">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveSection('alphabet')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="font-arabic text-2xl text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
            قَلَم
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Kalam
          </span>
        </button>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveSection('alphabet')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'alphabet'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Alphabet
          </button>
          <button
            onClick={() => setActiveSection('reading')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              activeSection === 'reading'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Lire l'arabe</span>
          </button>
          <button
            onClick={() => setActiveSection('vocab')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'vocab'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Vocabulaire
          </button>
          <button
            onClick={() => setActiveSection('translate')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'translate'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-amber-500" />
            <span>Traducteur</span>
          </button>
          <button
            onClick={() => setActiveSection('quran')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'quran'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>Le Coran (Ny Korany)</span>
          </button>
          <button
            onClick={() => setActiveSection('islam')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'islam'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-emerald-500" />
            <span>Islam, Azan & Duas</span>
          </button>
          <button
            onClick={() => setActiveSection('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'quiz'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveSection('tutor')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              activeSection === 'tutor'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>Tuteur IA</span>
          </button>
        </nav>

        {/* Zone 3: Progress, Install & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <PWAInstallButton />

          {/* Global Progress Bar Display */}
          <div
            className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-sm"
            title={`Progression globale : ${totalProgress}% (${masteredLetters.length}/28 lettres, ${bookmarkedWords.length} mots, ${quizScoreTotal} pts quiz)`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Progression :</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">{totalProgress}%</span>
            </div>
            <div className="w-16 sm:w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg">
            <span>Série :</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">🔥 {streakDays} j</span>
          </div>

          <button
            onClick={() => setActiveSection('translate')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Ouvrir le Traducteur
          </button>
        </div>

        {/* Global Hairline Progress Bar along the bottom of the Header */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-800/50 overflow-hidden"
          title={`Complétion globale des modules : ${totalProgress}%`}
        >
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Hero Section with High-Fidelity Calligraphy Photography */}
        <section className="bg-gradient-to-r from-amber-50/70 via-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Educational Pitch */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">Méthode Progressive</span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span>Arabe Moderne Standard (الفصحى)</span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span>Traducteur Arabe-Malagasy-Français</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                  Maîtrisez la langue arabe avec rigueur et élégance
                </h1>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                  De l'apprentissage des 28 lettres à la calligraphie au calame, découvrez la logique des racines trilatères, traduisez entre l'arabe, le malgache et le français, et dialoguez avec votre tuteur IA.
                </p>
              </div>

              {/* Call to Actions & Sample Citation */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
                <button
                  onClick={() => setActiveSection('reading')}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apprendre à lire l'arabe</span>
                </button>

                <button
                  onClick={() => setActiveSection('islam')}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  <Heart className="w-4 h-4 text-emerald-300" />
                  <span>Islam : Azan, Ikama & Duas</span>
                </button>

                <button
                  onClick={() => setActiveSection('quran')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Le Coran (Ny Korany)</span>
                </button>

                <button
                  onClick={handlePlayHero}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>Écouter la 1ère révélation</span>
                </button>
              </div>

              {/* Quiet Claim-to-Proof Statistics Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                <div>
                  <span className="block text-slate-600 dark:text-slate-400 text-[11px]">Lettres maîtrisées</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                    {masteredLetters.length} / {ARABIC_LETTERS.length}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-600 dark:text-slate-400 text-[11px]">Mots enregistrés</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                    {bookmarkedWords.length} mots
                  </span>
                </div>
                <div>
                  <span className="block text-slate-600 dark:text-slate-400 text-[11px]">Traducteur actif</span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                    Arabe ⇄ MG ⇄ FR
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Calligraphy Visual */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src="/src/assets/images/hero_arabic_calligraphy_1792762005327.jpg"
                alt="Plume de calligraphie arabe traditionnelle posée sur du parchemin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/85 dark:bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs text-slate-800 dark:text-slate-300 shadow-lg">
                <span className="font-arabic text-sm text-amber-600 dark:text-amber-300 block">ن وَالقَلَمِ وَمَا يَسْطُرُونَ</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">« Nūn. Par la plume et ce qu'ils écrivent. »</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Navigation Tabs (Desktop & Mobile) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
          <button
            onClick={() => setActiveSection('alphabet')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'alphabet'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>1. Alphabet & Calligraphie</span>
          </button>

          <button
            onClick={() => setActiveSection('reading')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'reading'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Apprendre à lire (Fianarana mamaky)</span>
          </button>

          <button
            onClick={() => setActiveSection('vowels')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'vowels'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Voyelles & Tashkeel</span>
          </button>

          <button
            onClick={() => setActiveSection('vocab')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'vocab'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4. Vocabulaire & Flashcards</span>
          </button>

          <button
            onClick={() => setActiveSection('grammar')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'grammar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>5. Grammaire & Racines</span>
          </button>

          <button
            onClick={() => setActiveSection('translate')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'translate'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-amber-500" />
            <span>6. Traducteur Arabe ⇄ Malagasy ⇄ FR</span>
          </button>

          <button
            onClick={() => setActiveSection('quran')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'quran'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>7. Coran Trilingue & Audio (القرآن)</span>
          </button>

          <button
            onClick={() => setActiveSection('islam')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'islam'
                ? 'bg-emerald-600 text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-emerald-500" />
            <span>8. Islam, Azan, Ikama, Ibada & Duas (الإسلام)</span>
          </button>

          <button
            onClick={() => setActiveSection('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>9. Quiz Interactif</span>
          </button>

          <button
            onClick={() => setActiveSection('tutor')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeSection === 'tutor'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>10. Tuteur Ustadh AI</span>
          </button>
        </div>

        {/* Dynamic Section Render */}
        <section className="py-2">
          {activeSection === 'alphabet' && (
            <AlphabetView
              masteredLetters={masteredLetters}
              onToggleMastered={handleToggleMasteredLetter}
            />
          )}

          {activeSection === 'reading' && <ReadingTutorView />}

          {activeSection === 'vowels' && <VowelsView />}

          {activeSection === 'vocab' && (
            <VocabularyView
              bookmarkedWords={bookmarkedWords}
              onToggleBookmark={handleToggleBookmarkWord}
            />
          )}

          {activeSection === 'grammar' && <GrammarView />}

          {activeSection === 'translate' && <TranslatorView />}

          {activeSection === 'quran' && <QuranView />}

          {activeSection === 'islam' && <IslamicStudiesView />}

          {activeSection === 'quiz' && (
            <QuizView onQuizCompleted={handleQuizCompleted} />
          )}

          {activeSection === 'tutor' && <AITutorView />}
        </section>

        {/* Secondary Cultural & Pedagogical Spotlight Section with Generated Imagery */}
        <section className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Patrimoine & Beauté de la Langue Arabe
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Une tradition littéraire millénaire façonnée par la poésie, la science et les échanges maritimes de l'Océan Indien.
              </p>
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-arabic text-lg">
              حِكْمَة وَتُرَاث
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Andalusian Architecture & Geometric Art */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/src/assets/images/arabic_culture_andalus_1792762004921.jpg"
                  alt="Cour mauresque avec mosaïques et calligraphie gravée"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Architecture & Art</span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span>Andalousie & Maghreb</span>
                </div>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  L'harmonie géométrique et l'Arabesque
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  L'écriture arabe s'est développée en symbiose avec l'architecture. Dans les cours de l'Alhambra et de Fès, les inscriptions poétiques sculptées dans le stuc célèbrent la mesure et l'élévation spirituelle.
                </p>
              </div>
            </div>

            {/* Card 2: Scholarly Libraries & Arabic Manuscripts */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="/src/assets/images/arabic_study_library_1792762004992.jpg"
                  alt="Bibliothèque d'étude avec manuscrit arabe sur lutrin rihal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Sciences & Manuscrits Sorabe</span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span>Océan Indien & Madagascar</span>
                </div>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  La Maison de la Sagesse & l'héritage Sorabe
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Les savants arabes ont voyagé jusqu'aux côtes malgaches dès le Xe siècle. Les manuscrits <em>Sorabe</em> de Manakara et Vohipeno témoignent de cette rencontre féconde où le malgache s'écrivait avec l'alphabet arabe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Dark/Light Mode Switcher memorized in localStorage */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 mt-16 py-8 px-6 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & info */}
          <div className="flex items-center gap-2">
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-lg">قَلَم</span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">Kalam</span>
            <span>— Plateforme d'apprentissage de l'arabe avec traducteur Malagasy & Français</span>
          </div>

          {/* Links & Switcher */}
          <div className="flex items-center flex-wrap gap-6">
            <span>© 2026 Kalam</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Cache Service Worker actif (hors-ligne)</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Fusha (الفصحى)</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Malagasy (Malgache)</span>

            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

            {/* Dark / Light Mode Switcher with LocalStorage */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-sm font-medium"
              title={`Basculer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Mode Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Mode Sombre</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Offline Status Toast */}
      <OfflineIndicator />
    </div>
  );
}
