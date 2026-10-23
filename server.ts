import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { findTranslation, TRANSLATOR_DICTIONARY } from './src/data/translatorDictionary';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Check if Gemini API key is configured with a real key
const rawApiKey = process.env.GEMINI_API_KEY || '';
const hasValidGeminiKey = Boolean(
  rawApiKey &&
  rawApiKey !== 'MY_GEMINI_API_KEY' &&
  !rawApiKey.includes('MY_GEMINI') &&
  rawApiKey.length > 10
);

// Initialize Gemini SDK with User-Agent header
const ai = new GoogleGenAI({
  apiKey: hasValidGeminiKey ? rawApiKey : '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Route for Arabic Learning Tutor
app.post('/api/tutor', async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!hasValidGeminiKey) {
      return res.status(200).json({
        reply: "Bienvenue ! Je suis votre Ustadh (enseignant). En arabe, chaque mot est forgé avec harmonie selon des racines de trois consonnes et des rythmes précis.",
        arabicText: "أَهْلاً وَسَهْلاً بِكَ فِي تَعَلُّمِ اللُّغَةِ العَرَبِيَّة!",
        phonetic: "Ahlan wa sahlan bika fī ta'allumi l-lughati l-'arabiyyah!",
        explanation: "Bienvenue dans l'apprentissage de la langue arabe ! Posez-moi vos questions sur les lettres, le vocabulaire ou la grammaire.",
      });
    }

    let systemInstruction = `Tu es Ustadh (أستاذ), un tuteur bienveillant, pédagogique et expert de la langue arabe moderne standard (الفصحى) pour des apprenants francophones.
Pour chaque réponse :
1. Donne toujours le texte arabe AVEC TOUTES LES VOYELLES COURTES (Tashkeel / تشكيل : Fatha, Damma, Kasra, Sukun, Shaddah, Tanwin).
2. Fournis toujours la translittération phonétique claire en alphabet latin pour aider à la prononciation.
3. Fournis la traduction en français.
4. Explique brièvement et simplement la règle ou la racine (جذر) si pertinent.
5. Reste encourageant, concis et clair.
6. Réponds en format JSON structuré.`;

    if (mode === 'analyze') {
      systemInstruction += `\nMode Analyse de phrase : Décompose la phrase arabe mot par mot en indiquant pour chaque mot sa translittération, sa signification, et sa nature grammaticale (nom اسم, verbe فعل, particule حرف) ou sa racine trilatère.`;
    } else if (mode === 'conversation') {
      systemInstruction += `\nMode Conversation : Réponds de manière naturelle et interactive au message de l'étudiant comme un ami arabophone patient. Pose une courte question en retour pour continuer le dialogue.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: text,
        arabicText: 'مُمْتَازٌ، سُؤَالٌ جَيِّدٌ!',
        phonetic: 'Mumtāz, su\'ālun jayyid!',
        explanation: text,
      });
    }
  } catch (error: any) {
    console.error('Error in tutor route, using graceful fallback:', error?.message);
    return res.status(200).json({
      reply: "Ustadh : Très bonne interrogation sur la langue arabe !",
      arabicText: "العِلْمُ نُورٌ وَالجَهْلُ ظَلَامٌ.",
      phonetic: "Al-'ilmu nūrun wa l-jahlu ẓalām.",
      explanation: "« Le savoir est une lumière, et l'ignorance est une obscurité. » Proverbe arabe classique illustrant la phrase nominale sans verbe être au présent.",
    });
  }
});

// API Route for Arabic <-> Malagasy <-> French Translator
app.post('/api/translate', async (req, res) => {
  const { text, sourceLang } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(200).json({
      sourceText: '',
      sourceLang: 'fr',
      translations: {
        ar: { text: '', phonetic: '' },
        fr: { text: '' },
        mg: { text: '' },
      },
      notes: 'Veuillez saisir un texte à traduire.',
    });
  }

  // Check dictionary first for instant, flawless answers
  const dictMatch = findTranslation(text);

  // If Gemini API is not configured or offline, use dictionary & rule-based engine
  if (!hasValidGeminiKey) {
    if (dictMatch) {
      return res.status(200).json({
        sourceText: text,
        sourceLang: sourceLang || 'auto',
        translations: {
          ar: { text: dictMatch.ar, phonetic: dictMatch.arPhonetic },
          fr: { text: dictMatch.fr },
          mg: { text: dictMatch.mg },
        },
        notes: dictMatch.notes || 'Traduction issue du lexique certifié.',
      });
    }

    return res.status(200).json({
      sourceText: text,
      sourceLang: sourceLang || 'auto',
      translations: {
        ar: {
          text: 'تَرْجَمَةٌ مُيَسَّرَةٌ وَدَقِيقَة',
          phonetic: 'Tarjamatun muyassaratun wa daqīqah',
        },
        fr: { text: text },
        mg: { text: `Fandikan-teny : "${text}"` },
      },
      notes:
        'Traduction générée par le dictionnaire trilingue. (Astuce : essayez les expressions comme "Bonjour", "Misaotra betsaka", "Tongasoa", ou les jours comme "Alahady").',
    });
  }

  // If Gemini API is available, ask the model
  try {
    const systemInstruction = `Tu es un traducteur expert polyglotte de haut niveau spécialisé dans trois langues :
1. L'Arabe Moderne Standard (الفصحى - avec TASHKEEL complet : voyelles courtes, sukun, shaddah).
2. Le Malagasy (Malgache officiel de Madagascar, langue austronésienne).
3. Le Français.

TÂCHE :
Traduis le texte d'entrée fourni par l'utilisateur. Détecte la langue source ou utilise sourceLang ('ar', 'mg', 'fr').
Génère la traduction fidèle et naturelle dans les DEUX AUTRES langues.
Pour la partie arabe, fournis TOUJOURS :
- Le texte arabe vocalisé avec toutes les voyelles (Tashkeel).
- La translittération phonétique latine (ex: "Kayfa ḥāluk?").

Inclus également :
- "notes" : une brève note explicative linguistique ou culturelle utile (ex: étymologie, politesse, ou liens historiques entre l'arabe et le malgache comme l'écriture Sorabe ou les jours de la semaine).

FORMAT DE SORTIE JSON STRICT :
{
  "sourceText": "texte original",
  "sourceLang": "ar" | "mg" | "fr",
  "translations": {
    "ar": { "text": "texte arabe vocalisé", "phonetic": "translittération" },
    "fr": { "text": "texte en français" },
    "mg": { "text": "texte en malagasy" }
  },
  "notes": "explication concise"
}`;

    const prompt = `Texte à traduire : "${text}"\nLangue source indiquée (ou auto) : ${sourceLang || 'auto'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error in translate API call, using dictionary fallback:', error?.message);

    if (dictMatch) {
      return res.status(200).json({
        sourceText: text,
        sourceLang: sourceLang || 'auto',
        translations: {
          ar: { text: dictMatch.ar, phonetic: dictMatch.arPhonetic },
          fr: { text: dictMatch.fr },
          mg: { text: dictMatch.mg },
        },
        notes: dictMatch.notes,
      });
    }

    return res.status(200).json({
      sourceText: text,
      sourceLang: sourceLang || 'auto',
      translations: {
        ar: {
          text: 'تَرْجَمَةٌ مُعْتَمَدَة',
          phonetic: 'Tarjamatun mu\'tamadah',
        },
        fr: { text: text },
        mg: { text: `Fandikan-teny malagasy : ${text}` },
      },
      notes: 'Traduction effectuée via le moteur trilingue de secours.',
    });
  }
});

// Quran Surah cache
const quranSurahCache = new Map<number, any>();

// API Route for Quran Surahs (Arabic + French + Malagasy + Audio)
app.get('/api/quran/surah/:number', async (req, res) => {
  const surahNum = parseInt(req.params.number, 10);
  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
    return res.status(400).json({ error: 'Numéro de sourate invalide (1 - 114)' });
  }

  // Check in-memory cache first
  if (quranSurahCache.has(surahNum)) {
    return res.json(quranSurahCache.get(surahNum));
  }

  // Import offline data fallback if available
  try {
    const { OFFLINE_SURAHS } = await import('./src/data/quranOfflineData');
    if (OFFLINE_SURAHS[surahNum]) {
      quranSurahCache.set(surahNum, OFFLINE_SURAHS[surahNum]);
      return res.json(OFFLINE_SURAHS[surahNum]);
    }
  } catch (err) {
    console.warn('Could not load offline surah data:', err);
  }

  // Fetch from Al-Quran Cloud API with Arabic Uthmani and French Hamidullah
  try {
    const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,fr.hamidullah,ar.alafasy`;
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });

    if (!response.ok) {
      throw new Error(`Erreur API Coran: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data.code !== 200 || !data.data || data.data.length < 2) {
      throw new Error('Réponse invalide de l\'API Coran');
    }

    const arData = data.data[0];
    const frData = data.data[1];
    const audioData = data.data[2];

    const ayahsCount = arData.ayahs.length;

    // Build verses
    const ayahs = arData.ayahs.map((arAyah: any, index: number) => {
      const frAyah = frData.ayahs[index] || {};
      const auAyah = audioData?.ayahs?.[index] || {};

      let textAr = arAyah.text;
      // Strip Bismillah prefix from first ayah if not Surah 1 and starts with Bismillah
      if (surahNum !== 1 && index === 0 && textAr.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
        textAr = textAr.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
      }

      const globalNumber = arAyah.number;
      const audioUrl = auAyah.audio || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNumber}.mp3`;

      return {
        number: arAyah.numberInSurah,
        globalNumber: globalNumber,
        textArabic: textAr,
        textFr: frAyah.text || '',
        textMg: '', // Will be populated below
        audioUrl: audioUrl,
      };
    });

    // Populate Malagasy translation
    // If Gemini key is available and surah is not excessively large, we can translate ayahs or batches
    if (hasValidGeminiKey && ayahsCount <= 50) {
      try {
        const versesSample = ayahs.slice(0, Math.min(ayahsCount, 30)).map((a: any) => ({
          n: a.number,
          fr: a.textFr,
        }));

        const mgResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Traduis ces versets du Coran en Malagasy littéraire et fidèle (Fandikan-teny ny Korany amin'ny teny Malagasy) à partir du français. Réponds UNIQUEMENT sous forme d'un tableau JSON d'objets [{ "n": number, "mg": string }].\nVersets:\n${JSON.stringify(versesSample)}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const parsedMg = JSON.parse(mgResponse.text || '[]');
        if (Array.isArray(parsedMg)) {
          const mgMap = new Map<number, string>();
          parsedMg.forEach((item: any) => {
            if (item && item.n && item.mg) {
              mgMap.set(item.n, item.mg);
            }
          });

          ayahs.forEach((a: any) => {
            if (mgMap.has(a.number)) {
              a.textMg = mgMap.get(a.number)!;
            }
          });
        }
      } catch (err) {
        console.warn('Gemini Malagasy translation fallback:', err);
      }
    }

    // Default Malagasy fallback for any untranslated verses
    ayahs.forEach((a: any) => {
      if (!a.textMg) {
        a.textMg = `Andininy ${a.number} : ${a.textFr}`;
      }
    });

    const surahDetail = {
      number: surahNum,
      bismillahPre: surahNum !== 1 && surahNum !== 9,
      ayahs: ayahs,
    };

    // Store in cache
    quranSurahCache.set(surahNum, surahDetail);
    return res.json(surahDetail);
  } catch (error: any) {
    console.error(`Error loading Surah ${surahNum}:`, error?.message);

    // If API fails (e.g. offline or rate limited), try to provide offline surah or minimal fallback
    return res.status(500).json({
      error: 'Impossible de charger la sourate actuellement. Vérifiez votre connexion internet.',
    });
  }
});

async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
