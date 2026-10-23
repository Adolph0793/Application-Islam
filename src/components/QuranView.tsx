import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Search,
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  BookMarked,
  Languages,
  Headphones,
  CheckCircle2,
  Info
} from 'lucide-react';
import { QURAN_SURAHS, SurahMeta } from '../data/quranSurahs';
import { OFFLINE_SURAHS, OfflineSurahDetails, AyahData } from '../data/quranOfflineData';

interface Reciter {
  id: string;
  name: string;
  nameAr: string;
}

const RECITERS: Reciter[] = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', nameAr: 'مشاري راشد العفاسي' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit Murattal', nameAr: 'عبد الباسط عبد الصمد' },
  { id: 'ar.saadalghamdi', name: 'Saad Al-Ghamdi', nameAr: 'سعد الغامدي' },
  { id: 'ar.shaatree', name: 'Abu Bakr Ash-Shatri', nameAr: 'أبو بكر الشاطري' },
];

export const QuranView: React.FC = () => {
  // Surah selection & navigation
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Mecquoise' | 'Madinoise'>('all');
  
  // Surah Content state
  const [surahDetails, setSurahDetails] = useState<OfflineSurahDetails | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [errorSurah, setErrorSurah] = useState<string | null>(null);

  // Display preferences
  const [showArabic, setShowArabic] = useState(true);
  const [showFrench, setShowFrench] = useState(true);
  const [showMalagasy, setShowMalagasy] = useState(true);
  const [showPhonetic, setShowPhonetic] = useState(false);
  const [arabicFontSize, setArabicFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('kalam_quran_font_size');
    return saved ? parseInt(saved, 10) : 28;
  });

  // Audio player state
  const [selectedReciter, setSelectedReciter] = useState<string>('ar.alafasy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState<'none' | 'verse' | 'all'>('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('kalam_quran_bookmarks');
      return saved ? JSON.parse(saved) : [1, 112];
    } catch {
      return [1, 112];
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Save font size preference
  const updateFontSize = (delta: number) => {
    setArabicFontSize((prev) => {
      const next = Math.min(42, Math.max(20, prev + delta));
      localStorage.setItem('kalam_quran_font_size', next.toString());
      return next;
    });
  };

  // Bookmark toggle
  const toggleBookmark = (surahNum: number) => {
    setBookmarkedSurahs((prev) => {
      const next = prev.includes(surahNum)
        ? prev.filter((id) => id !== surahNum)
        : [...prev, surahNum];
      localStorage.setItem('kalam_quran_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  // Filtered surahs list
  const filteredSurahs = QURAN_SURAHS.filter((s) => {
    const matchFilter =
      filterType === 'all' || s.revelationType === filterType;
    if (!matchFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.number.toString().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.translit.toLowerCase().includes(q) ||
      s.nameFr.toLowerCase().includes(q) ||
      s.nameMg.toLowerCase().includes(q)
    );
  });

  // Load Surah
  const loadSurah = async (number: number) => {
    setSelectedSurahNumber(number);
    setLoadingSurah(true);
    setErrorSurah(null);
    setCurrentAyahIndex(0);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Check offline pre-bundled data first
    if (OFFLINE_SURAHS[number]) {
      setSurahDetails(OFFLINE_SURAHS[number]);
      setLoadingSurah(false);
      return;
    }

    // Try fetching from server API (with in-memory & remote cache)
    try {
      const res = await fetch(`/api/quran/surah/${number}`);
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }
      const data = await res.json();
      setSurahDetails(data);
    } catch (err: any) {
      console.warn('Failed to load surah from server, checking fallback:', err);
      // Fallback
      if (OFFLINE_SURAHS[number]) {
        setSurahDetails(OFFLINE_SURAHS[number]);
      } else {
        setErrorSurah(
          'Impossible de charger la sourate pour le moment. Vérifiez votre connexion internet pour les sourates complètes.'
        );
      }
    } finally {
      setLoadingSurah(false);
    }
  };

  // Close reader and back to list
  const handleBackToList = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setSelectedSurahNumber(null);
    setSurahDetails(null);
  };

  // Get current audio URL for current ayah and reciter
  const getCurrentAudioUrl = (ayah: AyahData | undefined) => {
    if (!ayah) return '';
    // Islamic network uses global ayah number
    return `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.globalNumber}.mp3`;
  };

  // Audio Play / Pause control
  const togglePlayPause = () => {
    if (!surahDetails || !surahDetails.ayahs.length) return;

    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      const currentAyah = surahDetails.ayahs[currentAyahIndex];
      const audioUrl = getCurrentAudioUrl(currentAyah);

      if (audioRef.current.src !== audioUrl) {
        audioRef.current.src = audioUrl;
      }
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  // Play specific ayah
  const playAyahByIndex = (index: number) => {
    if (!surahDetails || !surahDetails.ayahs[index]) return;

    setCurrentAyahIndex(index);
    const ayah = surahDetails.ayahs[index];

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audioUrl = getCurrentAudioUrl(ayah);
    audioRef.current.src = audioUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        // Scroll to verse
        verseRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      })
      .catch((err) => {
        console.warn('Audio play error:', err);
        setIsPlaying(false);
      });
  };

  // Skip verse
  const handleNextAyah = () => {
    if (!surahDetails) return;
    if (currentAyahIndex < surahDetails.ayahs.length - 1) {
      playAyahByIndex(currentAyahIndex + 1);
    }
  };

  const handlePrevAyah = () => {
    if (currentAyahIndex > 0) {
      playAyahByIndex(currentAyahIndex - 1);
    }
  };

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    const onEnded = () => {
      if (!surahDetails) return;

      if (repeatMode === 'verse') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }

      if (currentAyahIndex < surahDetails.ayahs.length - 1) {
        const nextIndex = currentAyahIndex + 1;
        playAyahByIndex(nextIndex);
      } else if (repeatMode === 'all') {
        playAyahByIndex(0);
      } else {
        setIsPlaying(false);
      }
    };

    const onError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [surahDetails, currentAyahIndex, repeatMode, selectedReciter, playbackSpeed]);

  // Reciter change
  const handleReciterChange = (newReciter: string) => {
    setSelectedReciter(newReciter);
    if (isPlaying && surahDetails && surahDetails.ayahs[currentAyahIndex]) {
      const ayah = surahDetails.ayahs[currentAyahIndex];
      const newUrl = `https://cdn.islamic.network/quran/audio/128/${newReciter}/${ayah.globalNumber}.mp3`;
      if (audioRef.current) {
        audioRef.current.src = newUrl;
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Speed change
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Copy verse text to clipboard
  const copyAyah = (ayah: AyahData) => {
    const textToCopy = `${ayah.textArabic}\n\n[Français] : ${ayah.textFr}\n[Malagasy] : ${ayah.textMg}\n(Sourate ${selectedSurahNumber}, verset ${ayah.number})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.number);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const selectedSurahMeta = QURAN_SURAHS.find((s) => s.number === selectedSurahNumber);

  return (
    <div className="space-y-6 pb-24">
      {/* ========================================================
          1. HEADER & SUBHEADER
         ======================================================== */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>الْقُرْآنُ الْكَرِيمُ • Le Saint Coran • Ny Korany Masina</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lecteur & Écoute du Coran
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl leading-relaxed">
              Lisez les 114 sourates en calligraphie arabe avec voyelles complètes, traduites verset par verset en Français et en Malagasy (<span className="italic">teny Malagasy</span>), avec écoute audio continue et sélection de récitateurs.
            </p>
          </div>

          {selectedSurahNumber && (
            <button
              onClick={handleBackToList}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md transition-all border border-white/20 shadow-sm hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Toutes les sourates (Lisitra)</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          2. VIEW 1: SURAHS INDEX & EXPLORER
         ======================================================== */}
      {!selectedSurahNumber ? (
        <div className="space-y-6">
          {/* Search, Filter & Quick actions */}
          <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une sourate (ex: Fatiha, Yasin, Ny Omby, 1, 112)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 self-center sm:self-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Toutes (114)
              </button>
              <button
                onClick={() => setFilterType('Mecquoise')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'Mecquoise'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Mecquoise (Meki)
              </button>
              <button
                onClick={() => setFilterType('Madinoise')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === 'Madinoise'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Madinoise (Madina)
              </button>
            </div>
          </div>

          {/* Offline Core Surahs Quick Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Accès Hors-ligne préchargé :</strong> Les sourates fréquentes (Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar, Al-Asr, Al-Kafirun, An-Nasr) fonctionnent instantanément avec ou sans internet.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadSurah(1)}
                className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                Al-Fatiha (1)
              </button>
              <button
                onClick={() => loadSurah(112)}
                className="px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                Al-Ikhlas (112)
              </button>
            </div>
          </div>

          {/* Surahs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSurahs.map((surah) => {
              const isBookmarked = bookmarkedSurahs.includes(surah.number);
              const isOfflineReady = Boolean(OFFLINE_SURAHS[surah.number]);

              return (
                <div
                  key={surah.number}
                  onClick={() => loadSurah(surah.number)}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 p-4 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Number badge & Arabic Name */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          {surah.number}
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {surah.translit}
                          </h3>
                          <span className="text-xs text-zinc-400 font-normal">
                            {surah.numberOfAyahs} versets • andininy
                          </span>
                        </div>
                      </div>

                      {/* Arabic Name calligraphy */}
                      <span
                        dir="rtl"
                        className="text-lg font-bold text-emerald-900 dark:text-emerald-200 font-serif leading-none tracking-wide"
                      >
                        {surah.name}
                      </span>
                    </div>

                    {/* Translations in French and Malagasy */}
                    <div className="space-y-1 my-2 text-xs">
                      <div className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                        <span className="px-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-500 font-semibold uppercase">
                          FR
                        </span>
                        <span className="truncate">{surah.nameFr}</span>
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                        <span className="px-1 rounded bg-emerald-100/70 dark:bg-emerald-900/40 text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                          MG
                        </span>
                        <span className="truncate">{surah.nameMg}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Badges & Action */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          surah.revelationType === 'Mecquoise'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                        }`}
                      >
                        {surah.revelationType} ({surah.revelationTypeMg})
                      </span>
                      {isOfflineReady && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium">
                          Offline ✓
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(surah.number);
                        }}
                        className={`p-1 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-zinc-300 dark:text-zinc-600 hover:text-zinc-400'
                        }`}
                        title={isBookmarked ? 'Supprimer favori' : 'Ajouter aux favoris'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                        Lire & Écouter →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSurahs.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <BookOpen className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-600 dark:text-zinc-300 font-medium">
                Aucune sourate ne correspond à « {searchQuery} »
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}
                className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================
            3. VIEW 2: SURAH READING & AUDIO PLAYER
           ======================================================== */
        <div className="space-y-6">
          {/* Reader Top Controls Toolbar */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Left: Quick Surah selector */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToList}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                title="Retour à la liste"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <select
                value={selectedSurahNumber}
                onChange={(e) => loadSurah(parseInt(e.target.value, 10))}
                className="px-3 py-1.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {QURAN_SURAHS.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.translit} ({s.nameFr} - {s.nameMg})
                  </option>
                ))}
              </select>
            </div>

            {/* Right: Display toggles (Languages & Font size) */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {/* Language toggles */}
              <div className="flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setShowArabic(!showArabic)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    showArabic
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                  title="Afficher/Masquer le texte arabe"
                >
                  عَرَبِي
                </button>
                <button
                  onClick={() => setShowFrench(!showFrench)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    showFrench
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                  title="Afficher/Masquer la traduction française"
                >
                  FR
                </button>
                <button
                  onClick={() => setShowMalagasy(!showMalagasy)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    showMalagasy
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                  title="Afficher/Masquer la traduction malagasy"
                >
                  MG (Malagasy)
                </button>
              </div>

              {/* Font size +/- */}
              <div className="flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[11px] text-zinc-400 mr-2 font-medium">Taille :</span>
                <button
                  onClick={() => updateFontSize(-2)}
                  className="px-2 py-0.5 rounded text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  title="Diminuer la taille de la police arabe"
                >
                  A-
                </button>
                <span className="text-xs font-mono font-semibold px-1 text-zinc-700 dark:text-zinc-300">
                  {arabicFontSize}px
                </span>
                <button
                  onClick={() => updateFontSize(2)}
                  className="px-2 py-0.5 rounded text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  title="Agrandir la taille de la police arabe"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* Surah Big Header Banner */}
          {selectedSurahMeta && (
            <div className="text-center py-8 px-4 bg-gradient-to-b from-emerald-50 via-teal-50/50 to-transparent dark:from-emerald-950/40 dark:via-zinc-900 dark:to-zinc-900 rounded-3xl border border-emerald-200/60 dark:border-emerald-800/40 relative">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-300/40 dark:border-emerald-700/40">
                Sourate {selectedSurahMeta.number} • {selectedSurahMeta.revelationType} ({selectedSurahMeta.revelationTypeMg}) • {selectedSurahMeta.numberOfAyahs} Versets
              </span>

              <h2
                dir="rtl"
                className="text-4xl sm:text-5xl font-extrabold text-emerald-950 dark:text-emerald-100 font-serif mb-2 tracking-wide"
              >
                {selectedSurahMeta.nameFull}
              </h2>

              <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                {selectedSurahMeta.translit}
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                <span>🇫🇷 {selectedSurahMeta.nameFr}</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  🇲🇬 {selectedSurahMeta.nameMg}
                </span>
              </div>

              {/* Bismillah Header (except for Surah 9 At-Tawbah) */}
              {selectedSurahNumber !== 9 && (
                <div className="mt-6 pt-6 border-t border-emerald-200/60 dark:border-emerald-800/40 max-w-xl mx-auto">
                  <p
                    dir="rtl"
                    className="text-2xl sm:text-3xl font-bold text-emerald-900 dark:text-emerald-200 font-serif mb-2"
                  >
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    « Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux »
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 italic">
                    « Amin'ny anaran'i Allah, Ilay be fiantrana, Ilay be famindrampo »
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Loading or Error State */}
          {loadingSurah && (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                Chargement de la sourate et des traductions...
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Fampidirana ny andininy sy fandikan-teny amin'ny teny Malagasy
              </p>
            </div>
          )}

          {errorSurah && !loadingSurah && (
            <div className="p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-center space-y-3">
              <p className="text-red-700 dark:text-red-400 font-semibold">{errorSurah}</p>
              <button
                onClick={() => loadSurah(selectedSurahNumber)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                Réessayer (Avereno)
              </button>
            </div>
          )}

          {/* Verses List */}
          {surahDetails && !loadingSurah && (
            <div className="space-y-4">
              {surahDetails.ayahs.map((ayah, index) => {
                const isCurrentPlaying = isPlaying && currentAyahIndex === index;
                const isSelectedAyah = currentAyahIndex === index;

                return (
                  <div
                    key={ayah.number}
                    ref={(el) => {
                      verseRefs.current[index] = el;
                    }}
                    className={`rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                      isCurrentPlaying
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                        : isSelectedAyah
                        ? 'bg-zinc-50 dark:bg-zinc-900/90 border-zinc-300 dark:border-zinc-700'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    {/* Verse top bar */}
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        {/* Ayah number badge */}
                        <div
                          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center border ${
                            isCurrentPlaying
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          {ayah.number}
                        </div>
                        <span className="text-xs text-zinc-400 font-mono">
                          Verset {ayah.number} • Andininy {ayah.number}
                        </span>
                      </div>

                      {/* Verse actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => playAyahByIndex(index)}
                          className={`p-2 rounded-xl transition-all ${
                            isCurrentPlaying
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-zinc-600 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400'
                          }`}
                          title="Écouter ce verset (Henoy ity andininy ity)"
                        >
                          {isCurrentPlaying ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          )}
                        </button>

                        <button
                          onClick={() => copyAyah(ayah)}
                          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors"
                          title="Copier le verset"
                        >
                          {copiedAyah === ayah.number ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    {showArabic && (
                      <div className="mb-4">
                        <p
                          dir="rtl"
                          style={{ fontSize: `${arabicFontSize}px`, lineHeight: '2.1' }}
                          className="font-serif font-bold text-zinc-900 dark:text-zinc-50 text-right tracking-wide selection:bg-emerald-200 dark:selection:bg-emerald-900"
                        >
                          {ayah.textArabic}
                          <span className="inline-block mx-2 text-emerald-600 dark:text-emerald-400 font-sans text-lg font-bold">
                            ۝{ayah.number}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Transliteration if available */}
                    {showPhonetic && ayah.translit && (
                      <div className="mb-3 text-xs italic text-zinc-500 dark:text-zinc-400">
                        {ayah.translit}
                      </div>
                    )}

                    {/* French Translation */}
                    {showFrench && ayah.textFr && (
                      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <span className="inline-block mr-2 px-1.5 py-0.5 text-[10px] font-bold rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase">
                          FR
                        </span>
                        {ayah.textFr}
                      </div>
                    )}

                    {/* Malagasy Translation */}
                    {showMalagasy && ayah.textMg && (
                      <div className="mt-2.5 pt-2 border-t border-emerald-50 dark:border-emerald-950/40 text-sm text-emerald-900 dark:text-emerald-300 font-medium leading-relaxed">
                        <span className="inline-block mr-2 px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 uppercase">
                          MG
                        </span>
                        {ayah.textMg}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================
              4. FIXED BOTTOM AUDIO PLAYER BAR
             ======================================================== */}
          {surahDetails && (
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-2xl px-4 py-3">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                {/* Current Track info */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {selectedSurahNumber}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <span>{selectedSurahMeta?.translit}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Verset {currentAyahIndex + 1} / {surahDetails.ayahs.length}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-xs">
                      {selectedSurahMeta?.nameFr} • {selectedSurahMeta?.nameMg}
                    </div>
                  </div>
                </div>

                {/* Main Audio Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handlePrevAyah}
                    disabled={currentAyahIndex === 0}
                    className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                    title="Verset précédent"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                    title={isPlaying ? 'Pause' : 'Lecture continue'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNextAyah}
                    disabled={currentAyahIndex === surahDetails.ayahs.length - 1}
                    className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                    title="Verset suivant"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  {/* Repeat mode */}
                  <button
                    onClick={() => {
                      setRepeatMode((prev) =>
                        prev === 'none' ? 'all' : prev === 'all' ? 'verse' : 'none'
                      );
                    }}
                    className={`p-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 ${
                      repeatMode !== 'none'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title={
                      repeatMode === 'verse'
                        ? 'Répéter le verset actuel'
                        : repeatMode === 'all'
                        ? 'Réciter toute la sourate en boucle'
                        : 'Pas de répétition'
                    }
                  >
                    <Repeat className="w-4 h-4" />
                    <span className="text-[10px]">
                      {repeatMode === 'verse' ? 'Verset' : repeatMode === 'all' ? 'Sourate' : 'Off'}
                    </span>
                  </button>
                </div>

                {/* Reciter & Speed selector */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {/* Reciter select */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <Headphones className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
                    <select
                      value={selectedReciter}
                      onChange={(e) => handleReciterChange(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none"
                    >
                      {RECITERS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Speed toggle */}
                  <button
                    onClick={() => {
                      const speeds = [0.75, 1, 1.25];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      handleSpeedChange(next);
                    }}
                    className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Vitesse de récitation"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
