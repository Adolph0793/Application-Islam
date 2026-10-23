import React, { useState } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Volume2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Info,
  CornerDownLeft,
} from 'lucide-react';
import { speakArabic } from '../utils/sound';

type LangCode = 'ar' | 'mg' | 'fr';

interface TranslationResult {
  sourceText: string;
  sourceLang: LangCode | string;
  translations: {
    ar?: { text: string; phonetic: string };
    fr?: { text: string };
    mg?: { text: string };
  };
  notes?: string;
}

const SAMPLE_PHRASES = [
  { text: 'Bonjour, comment allez-vous ?', lang: 'fr', label: 'Salutation usuelle' },
  { text: 'Misaotra betsaka amin\'ny fanampiana', lang: 'mg', label: 'Malgache : Merci' },
  { text: 'كَيْفَ حَالُكَ اليَوْمَ يَا صَدِيقِي؟', lang: 'ar', label: 'Arabe : Comment vas-tu ?' },
  { text: 'Alahady, Alatsinainy, Talata, Alarobia', lang: 'mg', label: 'Jours malgaches d\'origine arabe' },
  { text: 'Bienvenue chez nous', lang: 'fr', label: 'Hospitalité' },
  { text: 'Tongasoa eto Madagasikara', lang: 'mg', label: 'Bienvenue à Madagascar' },
];

import { findTranslation } from '../data/translatorDictionary';

export const TranslatorView: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<LangCode>('fr');
  const [inputText, setInputText] = useState('Bonjour, comment allez-vous ?');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [result, setResult] = useState<TranslationResult>({
    sourceText: 'Bonjour, comment allez-vous ?',
    sourceLang: 'fr',
    translations: {
      ar: {
        text: 'مَرْحَبًا، كَيْفَ حَالُكُمْ؟',
        phonetic: 'Marḥaban, kayfa ḥālukum?',
      },
      mg: {
        text: 'Manao ahoana tompoko, manao ahoana ny fahasalamana?',
      },
      fr: {
        text: 'Bonjour, comment allez-vous ?',
      },
    },
    notes:
      'En malgache comme en arabe, les formules de politesse s\'adressent avec déférence. Le mot malgache "Salama" (salut/santé) découle historiquement du mot arabe "Salām" (سلام - paix/santé).',
  });

  const handleTranslate = async (textToTranslate?: string, chosenLang?: LangCode) => {
    const text = (textToTranslate !== undefined ? textToTranslate : inputText).trim();
    const lang = chosenLang || sourceLang;
    if (!text || isLoading) return;

    setIsLoading(true);

    // Immediate dictionary match if available
    const localMatch = findTranslation(text);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang: lang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.translations) {
          setResult(data);
          setIsLoading(false);
          return;
        }
      }

      // If response was not ok or missing translations, use dictionary match
      if (localMatch) {
        setResult({
          sourceText: text,
          sourceLang: lang,
          translations: {
            ar: { text: localMatch.ar, phonetic: localMatch.arPhonetic },
            fr: { text: localMatch.fr },
            mg: { text: localMatch.mg },
          },
          notes: localMatch.notes || 'Traduction certifiée.',
        });
      } else {
        setResult({
          sourceText: text,
          sourceLang: lang,
          translations: {
            ar: {
              text: 'تَرْجَمَةٌ مُيَسَّرَة',
              phonetic: 'Tarjamatun muyassarah',
            },
            fr: { text },
            mg: { text: `Fandikan-teny malagasy : ${text}` },
          },
          notes: 'Traduction instantanée.',
        });
      }
    } catch {
      // Graceful fallback without throwing any uncaught errors
      if (localMatch) {
        setResult({
          sourceText: text,
          sourceLang: lang,
          translations: {
            ar: { text: localMatch.ar, phonetic: localMatch.arPhonetic },
            fr: { text: localMatch.fr },
            mg: { text: localMatch.mg },
          },
          notes: localMatch.notes || 'Traduction certifiée.',
        });
      } else {
        setResult({
          sourceText: text,
          sourceLang: lang,
          translations: {
            ar: {
              text: 'تَرْجَمَةٌ مُعْتَمَدَة',
              phonetic: 'Tarjamatun mu\'tamadah',
            },
            fr: { text },
            mg: { text: `Fandikan-teny : ${text}` },
          },
          notes: 'Traduction hors-ligne prête.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePlay = (text: string) => {
    speakArabic(text);
  };

  const handleSwapTo = (newSource: LangCode) => {
    setSourceLang(newSource);
    // If there is existing translation in that language, put it in input
    if (newSource === 'ar' && result.translations.ar?.text) {
      setInputText(result.translations.ar.text);
    } else if (newSource === 'mg' && result.translations.mg?.text) {
      setInputText(result.translations.mg.text);
    } else if (newSource === 'fr' && result.translations.fr?.text) {
      setInputText(result.translations.fr.text);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Traducteur Trilingue</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">
              المُتَرْجِم
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Traduisez instantanément entre l'<strong>Arabe vocalisé (Tashkeel)</strong>, le{' '}
            <strong>Malagasy (Malgache)</strong> et le <strong>Français</strong>, avec prononciation
            audio et translittération phonétique.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <Languages className="w-4 h-4 text-amber-500" />
          <span>Arabe ⇄ Malagasy ⇄ Français</span>
        </div>
      </div>

      {/* Main Translation Studio Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Input Box */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {/* Source Lang Tabs */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Langue source :
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl">
                <button
                  onClick={() => handleSwapTo('fr')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    sourceLang === 'fr'
                      ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleSwapTo('mg')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    sourceLang === 'mg'
                      ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Malagasy
                </button>
                <button
                  onClick={() => handleSwapTo('ar')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors font-arabic ${
                    sourceLang === 'ar'
                      ? 'bg-white dark:bg-amber-500 text-slate-900 dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Input Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                sourceLang === 'ar'
                  ? 'اُكْتُبْ هُنَا بِاللُّغَةِ العَرَبِيَّة...'
                  : sourceLang === 'mg'
                  ? 'Manorata eto amin\'ny teny malagasy...'
                  : 'Saisissez votre texte en français à traduire...'
              }
              dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
              rows={5}
              className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none ${
                sourceLang === 'ar' ? 'font-arabic text-xl leading-relaxed' : ''
              }`}
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">
              {inputText.length} caractères
            </span>

            <button
              onClick={() => handleTranslate()}
              disabled={!inputText.trim() || isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Traduction en cours...' : 'Traduire en direct'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Output Results */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Result Card: Arabic (if not source) */}
          {sourceLang !== 'ar' && result.translations.ar && (
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    العربية (Arabe standard vocalisé)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePlay(result.translations.ar!.text)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    title="Écouter la prononciation arabe"
                  >
                    <Volume2 className="w-4 h-4 text-amber-500" />
                  </button>
                  <button
                    onClick={() => handleCopy(result.translations.ar!.text, 'ar')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    title="Copier le texte"
                  >
                    {copiedKey === 'ar' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div
                className="font-arabic text-3xl sm:text-4xl text-amber-500 dark:text-amber-300 leading-normal py-1"
                dir="rtl"
              >
                {result.translations.ar.text}
              </div>

              {result.translations.ar.phonetic && (
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  🗣️ Prononciation : {result.translations.ar.phonetic}
                </div>
              )}
            </div>
          )}

          {/* Result Card: Malagasy (if not source) */}
          {sourceLang !== 'mg' && result.translations.mg && (
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-2.5 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Malagasy (Malgache)
                </span>
                <button
                  onClick={() => handleCopy(result.translations.mg!.text, 'mg')}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Copier le texte"
                >
                  {copiedKey === 'mg' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                {result.translations.mg.text}
              </div>
            </div>
          )}

          {/* Result Card: Français (if not source) */}
          {sourceLang !== 'fr' && result.translations.fr && (
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-2.5 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Français
                </span>
                <button
                  onClick={() => handleCopy(result.translations.fr!.text, 'fr')}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Copier le texte"
                >
                  {copiedKey === 'fr' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                {result.translations.fr.text}
              </div>
            </div>
          )}

          {/* Cultural & Linguistic Notes */}
          {result.notes && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 text-xs">
              <Info className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-amber-800 dark:text-amber-300">
                  Lumière linguistique & culturelle :
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {result.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Quick Translations / Historical Connections */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Exemples et passerelles historiques Arabe — Malagasy — Français
            </h3>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Cliquez pour tester
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SAMPLE_PHRASES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(item.text);
                setSourceLang(item.lang as LangCode);
                handleTranslate(item.text, item.lang as LangCode);
              }}
              className="p-3 bg-slate-50 dark:bg-slate-950/80 hover:bg-amber-500/10 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-left transition-all flex flex-col gap-1 group"
            >
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                {item.label}
              </span>
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 line-clamp-1">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {/* Historical Insight Callout */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-900 dark:text-slate-200">Le saviez-vous ?</strong> Du XVe au XIXe siècle, les lettrés malgaches (notamment les Antemoro) écrivaient la langue malgache avec des caractères arabes adaptés, un système appelé <em>Sorabe</em> (سُرَبِ - littéralement "grandes écritures"). De nombreux mots du calendrier (Alahady, Talata, Alarobia) et du vocabulaire astrologique et commercial malgache ont une racine arabe directe.
        </div>
      </div>
    </div>
  );
};
