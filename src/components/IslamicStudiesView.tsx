import React, { useState, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Search,
  BookOpen,
  Sparkles,
  Heart,
  Copy,
  Check,
  Compass,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import {
  AZAN_DATA,
  IQAMA_DATA,
  DUA_AFTER_ADHAN,
  FIVE_PILLARS,
  SIX_PILLARS_IMAN,
  WUDU_STEPS,
  DUA_AFTER_WUDU,
  SALAT_STEPS,
  DUAS_COLLECTION,
  DuaItem,
  IslamicPhrase
} from '../data/islamicData';
import { speakArabic, stopArabicSpeech } from '../utils/sound';

type IslamicSubTab = 'azan_iqama' | 'duas' | 'pillars' | 'wudu' | 'salat';

export function IslamicStudiesView() {
  const [activeTab, setActiveTab] = useState<IslamicSubTab>('azan_iqama');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Duas filtering & search
  const [duaCategory, setDuaCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Salat step for detail view
  const [selectedSalatStep, setSelectedSalatStep] = useState<number>(1);

  const handlePlay = (id: string, text: string) => {
    if (playingId === id) {
      stopArabicSpeech();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    speakArabic(text, {
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDuas = useMemo(() => {
    return DUAS_COLLECTION.filter((d) => {
      const matchCat = duaCategory === 'all' || d.category === duaCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch =
        d.title.toLowerCase().includes(q) ||
        d.malagasyTitle.toLowerCase().includes(q) ||
        d.french.toLowerCase().includes(q) ||
        d.malagasy.toLowerCase().includes(q) ||
        d.arabic.includes(q) ||
        d.phonetic.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [duaCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fampianarana Silamo sy Fivavahana · Enseignements Islamiques</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Ny Fivavahana Silamo & Ireo Duas Masina
          </h2>
          <p className="text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Ianaro ny Azan, Ikama, ireo Andry 5 sy Finoana (Ibada), ny fanadiovan-tena (Wudu), ny fomba fivavaka
            ara-dalàna (Salat) ary ny fitambaran'ireo Duas rehetra miaraka amin'ny dikanteny Malagasy sy Frantsay ary feo.
          </p>
        </div>

        {/* Decorative Calligraphy watermark */}
        <div className="absolute right-4 -bottom-6 select-none pointer-events-none opacity-10 hidden sm:block">
          <span className="font-arabic text-8xl text-emerald-300">الصَّلَاةُ وَالدُّعَاء</span>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto shadow-sm">
        <button
          onClick={() => setActiveTab('azan_iqama')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'azan_iqama'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>1. Azan & Ikama (Antso amin'ny vavaka)</span>
        </button>

        <button
          onClick={() => setActiveTab('duas')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'duas'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>2. Tous les Duas (Fitambaran'ny Douas)</span>
        </button>

        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'pillars'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>3. Ibada & 5 Piliers (Andry 5 & Finoana)</span>
        </button>

        <button
          onClick={() => setActiveTab('wudu')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'wudu'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4. Ablutions (Wudu / Fanadiovan-tena)</span>
        </button>

        <button
          onClick={() => setActiveTab('salat')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'salat'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>5. Guide Salat pas-à-pas (Fomba fivavaka)</span>
        </button>
      </div>

      {/* ---------------- TAB 1: AZAN & IKAMA ---------------- */}
      {activeTab === 'azan_iqama' && (
        <div className="space-y-8">
          {/* Section: Azan (Adhan) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">الأَذَان</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Ny Azan (Adhan) · L'Appel à la Prière
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Antso manetriketrika ataon'ny Muezzin hanairana ny mpino hanatrika ny vavaka. Henoy sy avereno tsirairay.
                </p>
              </div>

              <button
                onClick={() => handlePlay('full-azan', AZAN_DATA.map((p) => p.arabic).join(' '))}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Henoy ny Azan manontolo</span>
              </button>
            </div>

            {/* Azan phrases list */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-4">
              {AZAN_DATA.map((phrase, idx) => (
                <div
                  key={phrase.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-start gap-3 w-full sm:w-auto">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-arabic text-xl sm:text-2xl text-slate-900 dark:text-white font-medium">
                          {phrase.arabic}
                        </span>
                        {phrase.repeat && phrase.repeat > 1 && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-md">
                            x{phrase.repeat}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {phrase.phonetic}
                      </p>
                      <div className="text-xs space-y-0.5">
                        <p className="text-slate-800 dark:text-slate-200">
                          <strong className="text-slate-500 dark:text-slate-400 font-normal">MG : </strong>
                          {phrase.malagasy}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          <strong className="text-slate-400 font-normal">FR : </strong>
                          {phrase.french}
                        </p>
                      </div>
                      {phrase.note && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          ℹ️ {phrase.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handlePlay(phrase.id, phrase.arabic)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        playingId === phrase.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md animate-pulse'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title="Mihainoa feo"
                    >
                      {playingId === phrase.id ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(phrase.id, `${phrase.arabic}\n${phrase.phonetic}\n${phrase.malagasy}`)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Adikao"
                    >
                      {copiedId === phrase.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Dua After Adhan */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-amber-800/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ny Doua aorian'ny Azan · L'Invocation après l'Adhan
                </h4>
              </div>
              <button
                onClick={() => handlePlay(DUA_AFTER_ADHAN.id, DUA_AFTER_ADHAN.arabic)}
                className={`p-2 rounded-xl border transition-all ${
                  playingId === DUA_AFTER_ADHAN.id
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white dark:bg-slate-800 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <p className="font-arabic text-xl sm:text-2xl text-right text-slate-900 dark:text-white leading-loose font-medium">
                {DUA_AFTER_ADHAN.arabic}
              </p>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {DUA_AFTER_ADHAN.phonetic}
              </p>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                <strong className="text-amber-700 dark:text-amber-400">Malagasy : </strong>
                {DUA_AFTER_ADHAN.malagasy}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-500">Français : </strong>
                {DUA_AFTER_ADHAN.french}
              </p>
              {DUA_AFTER_ADHAN.note && (
                <div className="p-3 bg-amber-100/60 dark:bg-amber-950/40 rounded-xl text-[11px] text-amber-900 dark:text-amber-300">
                  ✨ {DUA_AFTER_ADHAN.note}
                </div>
              )}
            </div>
          </div>

          {/* Section: Ikama (Iqama) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">الإِقَامَة</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Ny Ikama (Iqama) · Le Deuxième Appel
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Antso fohy atao ao anatin'ny moske alohan'ny hanombohana ny vavaka terena.
                </p>
              </div>

              <button
                onClick={() => handlePlay('full-iqama', IQAMA_DATA.map((p) => p.arabic).join(' '))}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Henoy ny Ikama manontolo</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-4">
              {IQAMA_DATA.map((phrase, idx) => (
                <div
                  key={phrase.id}
                  className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 px-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-arabic text-lg sm:text-xl text-slate-900 dark:text-white font-medium block">
                        {phrase.arabic}
                      </span>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {phrase.phonetic}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-400 font-normal">MG : </strong> {phrase.malagasy}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong className="text-slate-400 font-normal">FR : </strong> {phrase.french}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlay(phrase.id, phrase.arabic)}
                    className={`p-2 rounded-xl border transition-all self-end sm:self-center shrink-0 ${
                      playingId === phrase.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: TOUS LES DUA (DUAS COLLECTION) ---------------- */}
      {activeTab === 'duas' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mitadiava Dua (oh: maraina, torimaso, ray aman-dreny, fanasitranana, trosa)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setDuaCategory('all')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Rehetra ({DUAS_COLLECTION.length})
                </button>
                <button
                  onClick={() => setDuaCategory('morning_evening')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'morning_evening'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Maraina & Hariva
                </button>
                <button
                  onClick={() => setDuaCategory('sleep')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'sleep'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Torimaso & Fifohana
                </button>
                <button
                  onClick={() => setDuaCategory('food')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'food'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Sakafo
                </button>
                <button
                  onClick={() => setDuaCategory('home_mosque')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'home_mosque'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Trano & Moske
                </button>
                <button
                  onClick={() => setDuaCategory('parents')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'parents'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Ray aman-Dreny
                </button>
                <button
                  onClick={() => setDuaCategory('health_protection')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'health_protection'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Fahasitranana
                </button>
                <button
                  onClick={() => setDuaCategory('distress_forgiveness')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'distress_forgiveness'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Famelan-keloka & Fahoriana
                </button>
                <button
                  onClick={() => setDuaCategory('travel_istikhara')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    duaCategory === 'travel_istikhara'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Dia & Istikhara
                </button>
              </div>
            </div>
          </div>

          {/* Duas Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredDuas.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Tsy misy Dua mifanaraka amin'ny fikarohanao
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Andramo ampiasaina ny teny fototra na sokajy hafa.
                </p>
              </div>
            ) : (
              filteredDuas.map((dua) => (
                <div
                  key={dua.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-emerald-500/40 transition-all space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {dua.malagasyTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {dua.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {dua.repeatCount && dua.repeatCount > 1 && (
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-lg">
                          Averina in-{dua.repeatCount}
                        </span>
                      )}
                      <button
                        onClick={() => handlePlay(dua.id, dua.arabic)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          playingId === dua.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md animate-pulse'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                        title="Mihainoa feo"
                      >
                        {playingId === dua.id ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(
                            dua.id,
                            `${dua.malagasyTitle}\n${dua.arabic}\n${dua.phonetic}\n${dua.malagasy}\n${dua.french}`
                          )
                        }
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 transition-colors"
                        title="Adikao"
                      >
                        {copiedId === dua.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text Display */}
                  <div className="p-4 sm:p-5 bg-emerald-50/50 dark:bg-slate-800/60 rounded-2xl border border-emerald-100 dark:border-slate-700/60">
                    <p
                      dir="rtl"
                      className="font-arabic text-xl sm:text-2xl text-right text-slate-900 dark:text-white leading-loose font-medium"
                    >
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Transliteration */}
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {dua.phonetic}
                  </div>

                  {/* Malagasy & French Translations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">
                        🇲🇬 Dikanteny Malagasy
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {dua.malagasy}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                        🇫🇷 Traduction Française
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {dua.french}
                      </p>
                    </div>
                  </div>

                  {/* Context and Merits */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>
                      <strong>Tombontsoa (Fadila) : </strong> {dua.malagasyContext}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: IBADA & 5 PILIERS & 6 ARTICLES OF FAITH ---------------- */}
      {activeTab === 'pillars' && (
        <div className="space-y-8">
          {/* Part A: The 5 Pillars of Islam */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">أَرْكَانُ الإِسْلَام</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ireo Andry 5 amin'ny Finoana Silamo · Les 5 Piliers de l'Islam
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ireo adidy fototra tsy maintsy tanterahin'ny mpino silamo rehetra.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FIVE_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-sm">
                        {pillar.number}
                      </span>
                      <span className="font-arabic text-xl text-emerald-600 dark:text-emerald-400 font-medium">
                        {pillar.arabicName}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {pillar.malagasyName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {pillar.frenchName} ({pillar.phoneticName})
                      </p>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                      {pillar.summaryMalagasy}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Fampianarana fototra :
                      </span>
                      {pillar.detailsMalagasy.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {pillar.keyVersesOrPhrases && pillar.keyVersesOrPhrases.length > 0 && (
                      <div className="mt-3 p-3 bg-emerald-50/60 dark:bg-slate-800/70 rounded-xl space-y-2 border border-emerald-100 dark:border-emerald-900/40">
                        {pillar.keyVersesOrPhrases.map((kv) => (
                          <div key={kv.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-arabic text-base text-slate-900 dark:text-white">
                                {kv.arabic}
                              </span>
                              <button
                                onClick={() => handlePlay(kv.id, kv.arabic)}
                                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                              {kv.phonetic}
                            </p>
                            <p className="text-[11px] text-slate-700 dark:text-slate-300">
                              {kv.malagasy}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part B: The 6 Articles of Faith (Al-Iman) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">أَرْكَانُ الإِيمَان</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ireo Andry 6 amin'ny Finoana (Al-Iman) · Les 6 Articles de la Foi
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ireo zavatra tsy maintsy inoan'ny fon'ny mpino silamo rehetra.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SIX_PILLARS_IMAN.map((faith) => (
                <div
                  key={faith.number}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      {faith.number}
                    </span>
                    <span className="font-arabic text-lg text-emerald-600 dark:text-emerald-400">
                      {faith.arabicName}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {faith.malagasyName}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {faith.frenchName} ({faith.phoneticName})
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {faith.explanationMalagasy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 4: LES ABLUTIONS (WUDU) ---------------- */}
      {activeTab === 'wudu' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">الوُضُوء</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Torolàlana amin'ny Fanalana Fahalotoana Kely (Wudu / Ablutions)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Fomba fanadiovan-tena tsy maintsy atao alohan'ny hanombohana ny vavaka rehetra araka ny Sunnah an'ny Mpaminany ﷺ.
              </p>
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {WUDU_STEPS.map((wStep) => (
                <div
                  key={wStep.step}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                        {wStep.step}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {wStep.malagasyTitle}
                      </h4>
                    </div>
                    <span className="font-arabic text-base text-emerald-600 dark:text-emerald-400">
                      {wStep.arabicName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {wStep.malagasyInstruction}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    {wStep.frenchInstruction}
                  </p>

                  {wStep.dua && (
                    <div className="p-3 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-xl space-y-1 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-arabic text-lg text-slate-900 dark:text-white">
                          {wStep.dua.arabic}
                        </span>
                        <button
                          onClick={() => handlePlay(wStep.dua!.id, wStep.dua!.arabic)}
                          className="p-1 rounded bg-emerald-600 text-white"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                        {wStep.dua.phonetic}
                      </p>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">
                        {wStep.dua.malagasy}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dua after Wudu */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ny Doua aorian'ny Wudu · L'Invocation après les ablutions
                  </h4>
                </div>
                <button
                  onClick={() => handlePlay(DUA_AFTER_WUDU.id, DUA_AFTER_WUDU.arabic)}
                  className={`p-2 rounded-xl border transition-all ${
                    playingId === DUA_AFTER_WUDU.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p
                dir="rtl"
                className="font-arabic text-xl sm:text-2xl text-right text-slate-900 dark:text-white leading-loose font-medium"
              >
                {DUA_AFTER_WUDU.arabic}
              </p>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {DUA_AFTER_WUDU.phonetic}
              </p>
              <p className="text-xs text-slate-800 dark:text-slate-200">
                <strong>Malagasy : </strong> {DUA_AFTER_WUDU.malagasy}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Français : </strong> {DUA_AFTER_WUDU.french}
              </p>
              {DUA_AFTER_WUDU.note && (
                <p className="text-[11px] text-amber-700 dark:text-amber-400 italic">
                  ✨ {DUA_AFTER_WUDU.note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 5: GUIDE SALAT PAS-À-PAS ---------------- */}
      {activeTab === 'salat' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">كَيْفِيَّةُ الصَّلَاة</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Ahoana no Fomba Fivavaka Pas-à-pas (Kaifiyat as-Salat)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Dingana 11 manomboka amin'ny Takbirat al-Ihram ka hatramin'ny Taslim famaranana, miaraka amin'ny teny hotononina sy ny dikany.
              </p>
            </div>

            {/* Quick Step Selector */}
            <div className="flex items-center gap-2 overflow-x-auto py-4">
              {SALAT_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setSelectedSalatStep(s.step)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedSalatStep === s.step
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px]">
                    {s.step}
                  </span>
                  <span>{s.malagasyTitle.split('.')[1]?.trim() || s.malagasyTitle}</span>
                </button>
              ))}
            </div>

            {/* Detailed Active Step Card */}
            {(() => {
              const cur = SALAT_STEPS.find((s) => s.step === selectedSalatStep) || SALAT_STEPS[0];
              return (
                <div className="bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/40 border border-emerald-200/80 dark:border-emerald-800/40 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                          {cur.step}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {cur.malagasyTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {cur.frenchTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-arabic text-2xl text-emerald-600 dark:text-emerald-400">
                        {cur.arabicName}
                      </span>
                      <button
                        onClick={() => handlePlay(`salat-${cur.step}`, cur.arabicFormula)}
                        className={`p-3 rounded-2xl border transition-all ${
                          playingId === `salat-${cur.step}`
                            ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                            : 'bg-white dark:bg-slate-800 text-emerald-600 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                        title="Mihainoa fanononana"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Posture Description */}
                  <div className="bg-white dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      📍 Fomba fijoro na fipetraka (Fihetsika) :
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {cur.postureDescriptionMalagasy}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      {cur.postureDescriptionFrench}
                    </p>
                  </div>

                  {/* Arabic Formula Box */}
                  <div className="p-6 bg-emerald-900 text-white rounded-2xl shadow-inner space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                        Teny tononina ao anaty vavaka :
                      </span>
                      {cur.repetitions && (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-700 text-emerald-200 rounded-md">
                          {cur.repetitions}
                        </span>
                      )}
                    </div>
                    <p
                      dir="rtl"
                      className="font-arabic text-2xl sm:text-3xl text-right leading-loose font-medium text-emerald-50"
                    >
                      {cur.arabicFormula}
                    </p>
                    <p className="text-xs text-emerald-300 font-medium">
                      {cur.phoneticFormula}
                    </p>
                  </div>

                  {/* Meaning Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        🇲🇬 Dikan-teny Malagasy
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {cur.malagasyFormula}
                      </p>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        🇫🇷 Traduction Française
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {cur.frenchFormula}
                      </p>
                    </div>
                  </div>

                  {/* Step Navigator Next / Previous */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      disabled={cur.step === 1}
                      onClick={() => setSelectedSalatStep((prev) => Math.max(1, prev - 1))}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
                    >
                      ← Dingana teo aloha
                    </button>
                    <span className="text-xs text-slate-500 font-semibold">
                      {cur.step} amin'ny 11
                    </span>
                    <button
                      disabled={cur.step === SALAT_STEPS.length}
                      onClick={() => setSelectedSalatStep((prev) => Math.min(SALAT_STEPS.length, prev + 1))}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors flex items-center gap-1.5"
                    >
                      <span>Dingana manaraka</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
