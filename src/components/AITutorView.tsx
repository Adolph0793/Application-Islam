import React, { useState } from 'react';
import { Send, Bot, Volume2, Sparkles, MessageSquare, BookOpen, Compass, HelpCircle } from 'lucide-react';
import { speakArabic } from '../utils/sound';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  arabicText?: string;
  phonetic?: string;
  explanation?: string;
}

const SAMPLE_QUESTIONS = [
  'Quelle est la différence entre les consonnes س (Sin) et ص (Sad) ?',
  'Décompose la phrase : « الكِتَابُ عَلَى المَكْتَبِ »',
  'Explique-moi l\'origine arabe des mots français « Chiffre » et « Algèbre »',
  'Comment dit-on poliment « Je voudrais un thé à la menthe » ?',
];

export const AITutorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Marhaban bik ! Je suis votre Ustadh (أستاذ), votre enseignant personnel d\'arabe moderne standard. Posez-moi vos questions de grammaire, faites analyser une phrase ou pratiquez la conversation.',
      arabicText: 'أَهْلاً وَسَهْلاً بِكَ يَا صَدِيقِي!',
      phonetic: 'Ahlan wa sahlan bika yā ṣadīqī!',
      explanation: 'Bienvenue mon ami ! N\'hésitez pas à poser n\'importe quelle question sur la langue arabe.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tutorMode, setTutorMode] = useState<'general' | 'conversation' | 'analyze'>('general');

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          mode: tutorMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur de communication avec le serveur.');
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.reply || data.explanation || 'Voici mon analyse de votre question :',
          arabicText: data.arabicText || '',
          phonetic: data.phonetic || '',
          explanation: data.explanation || '',
        },
      ]);
    } catch (err) {
      console.error(err);
      // Helpful pedagogical fallback
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Excellente question sur la langue arabe !',
          arabicText: 'اللُّغَةُ العَرَبِيَّةُ لُغَةٌ غَنِيَّةٌ وَجَمِيلَةٌ.',
          phonetic: 'Al-lughatu l-\'arabiyyatu lughatun ghaniyyatun wa jamīlah.',
          explanation: 'La langue arabe est une langue riche et harmonieuse. En arabe, chaque mot est construit sur des racines logiques et des rythmes précis.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (text: string) => {
    speakArabic(text);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Ustadh AI — Tuteur Personnel</span>
            <span className="font-arabic text-amber-500 dark:text-amber-400 text-3xl font-normal">الأُسْتَاذُ الذَّكِيّ</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Posez vos questions sur la grammaire, pratiquez un dialogue ou analysez la composition de phrases arabes.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-sm">
          <button
            onClick={() => setTutorMode('general')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tutorMode === 'general' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Questions Libres
          </button>
          <button
            onClick={() => setTutorMode('conversation')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tutorMode === 'conversation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dialogue
          </button>
          <button
            onClick={() => setTutorMode('analyze')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tutorMode === 'analyze' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Analyseur
          </button>
        </div>
      </div>

      {/* Chat Sandbox */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-[520px] shadow-xl overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-1.5 ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <p>{m.content}</p>

                {/* Arabic Callout Box if Assistant provided vocalized text */}
                {m.arabicText && (
                  <div className="mt-3 p-3.5 bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col gap-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-arabic text-3xl text-amber-600 dark:text-amber-300 leading-normal" dir="rtl">
                        {m.arabicText}
                      </span>
                      <button
                        onClick={() => handlePlay(m.arabicText!)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-500 transition-colors shrink-0 ml-3"
                        title="Écouter la prononciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {m.phonetic && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        🗣️ {m.phonetic}
                      </span>
                    )}

                    {m.explanation && m.explanation !== m.content && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-1">
                        {m.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 p-3 bg-amber-50 dark:bg-slate-950/40 rounded-xl border border-amber-200 dark:border-slate-800 self-start">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Ustadh réfléchit et vocalise la réponse...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 dark:text-slate-400 shrink-0 text-[11px] font-medium">Suggestions :</span>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors shrink-0 hover:text-slate-900 dark:hover:text-white shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              tutorMode === 'conversation'
                ? 'Écrivez en français ou en arabe pour discuter...'
                : tutorMode === 'analyze'
                ? 'Collez une phrase en arabe à décomposer...'
                : 'Posez une question sur l\'alphabet, la prononciation ou la grammaire...'
            }
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
          >
            <span>Envoyer</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
