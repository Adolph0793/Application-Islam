import React, { useState, useMemo } from 'react';
import { Volume2, Search, RotateCw, CheckCircle, Bookmark, Layers, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { VOCAB_CATEGORIES, VocabCategory, VocabWord } from '../data/vocabulary';
import { speakArabic } from '../utils/sound';

interface VocabularyViewProps {
  bookmarkedWords: string[];
  onToggleBookmark: (wordId: string) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  bookmarkedWords,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory>(VOCAB_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'flashcards' | 'grid'>('flashcards');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter words
  const activeWords = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const allWords = VOCAB_CATEGORIES.flatMap((c) => c.words);
      return allWords.filter(
        (w) =>
          w.french.toLowerCase().includes(q) ||
          w.translit.toLowerCase().includes(q) ||
          w.arabic.includes(q)
      );
    }
    return selectedCategory.words;
  }, [searchQuery, selectedCategory]);

  const currentWord: VocabWord | undefined = activeWords[currentCardIndex] || activeWords[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % activeWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + activeWords.length) % activeWords.length);
  };

  const handlePlay = (text: string) => {
    speakArabic(text);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Vocabulaire Thématique</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">المُفْرَدَات</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Mémorisez le vocabulaire essentiel de la vie quotidienne avec prononciation audio, transcription phonétique et flashcards interactives.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <button
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              viewMode === 'flashcards'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Mode Flashcards</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vue Dictionnaire</span>
          </button>
        </div>
      </div>

      {/* Categories & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {VOCAB_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.id === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchQuery('');
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold shadow-sm'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm'
                }`}
              >
                <span>{cat.nameFr}</span>
                <span className="ml-1 text-[11px] opacity-60">({cat.words.length})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentCardIndex(0);
            }}
            placeholder="Rechercher un mot (arabe, français)..."
            className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {activeWords.length === 0 ? (
        <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          Aucun mot trouvé pour « {searchQuery} ».
        </div>
      ) : viewMode === 'flashcards' && currentWord ? (
        /* 3D Flashcard Sandbox */
        <div className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
          {/* Card index counter & bookmark button */}
          <div className="flex items-center justify-between w-full text-xs text-slate-500 dark:text-slate-400 px-2">
            <span>
              Carte <strong className="text-slate-900 dark:text-white">{currentCardIndex + 1}</strong> sur{' '}
              <strong className="text-slate-900 dark:text-white">{activeWords.length}</strong>
            </span>
            <button
              onClick={() => onToggleBookmark(currentWord.id)}
              className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  bookmarkedWords.includes(currentWord.id)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-400'
                }`}
              />
              <span>
                {bookmarkedWords.includes(currentWord.id) ? 'Enregistré' : 'Sauvegarder'}
              </span>
            </button>
          </div>

          {/* Flip Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full aspect-[4/3] sm:aspect-[16/10] bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-2xl transition-all relative overflow-hidden group"
          >
            {/* Ambient background ornament */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 relative z-10">
              <span className="text-amber-600 dark:text-amber-400 font-medium tracking-wide uppercase text-[11px]">
                {selectedCategory.nameFr}
              </span>
              <span className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Cliquez pour retourner</span>
              </span>
            </div>

            {/* Card Content based on flip state */}
            {!isFlipped ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center my-auto relative z-10">
                <div className="font-arabic text-6xl sm:text-7xl text-amber-500 dark:text-amber-400 leading-tight">
                  {currentWord.arabic}
                </div>
                <div className="text-base font-medium text-slate-600 dark:text-slate-300 font-mono tracking-wide">
                  {currentWord.translit}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-center my-auto relative z-10 animate-fade-in">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {currentWord.french}
                </div>
                <div className="font-arabic text-3xl text-amber-600 dark:text-amber-400/80">
                  {currentWord.arabic}
                </div>
                {currentWord.examplePhrase && (
                  <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 max-w-sm">
                    <p className="font-arabic text-base text-amber-600 dark:text-amber-200">{currentWord.examplePhrase.ar}</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">{currentWord.examplePhrase.fr}</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Audio Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 relative z-10">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {!isFlipped ? 'Face Recto : Arabe' : 'Face Verso : Traduction'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(currentWord.arabic);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-medium transition-colors"
                title="Écouter la prononciation"
              >
                <Volume2 className="w-4 h-4" />
                <span>Écouter</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Dictionary Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeWords.map((word) => {
            const isBookmarked = bookmarkedWords.includes(word.id);
            return (
              <div
                key={word.id}
                className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">{word.french}</h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{word.translit}</span>
                  </div>
                  <button
                    onClick={() => onToggleBookmark(word.id)}
                    className="text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <span className="font-arabic text-3xl text-amber-500 dark:text-amber-400 leading-none">
                    {word.arabic}
                  </span>
                  <button
                    onClick={() => handlePlay(word.arabic)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                    title="Écouter le mot"
                  >
                    <Volume2 className="w-4 h-4 text-amber-500" />
                  </button>
                </div>

                {word.examplePhrase && (
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/50">
                    <p className="font-arabic text-sm text-amber-600 dark:text-amber-200/90">{word.examplePhrase.ar}</p>
                    <p className="mt-0.5">{word.examplePhrase.fr}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
