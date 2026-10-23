// Audio synthesis utility for Arabic pronunciation

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speakArabic(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    options?.onError?.('Synthèse vocale non supportée');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Clean text from extra annotations if any
  const cleanText = text.replace(/[\(\)0-9]/g, '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  activeUtterance = utterance;

  utterance.lang = 'ar-SA';
  utterance.rate = options?.rate ?? 0.85; // Slightly slower for clarity
  utterance.pitch = options?.pitch ?? 1.0;

  // Try to find native Arabic voice
  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(
    (v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic')
  );
  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }

  utterance.onstart = () => {
    options?.onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    options?.onEnd?.();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    options?.onError?.(e);
  };

  window.speechSynthesis.speak(utterance);
}

export function stopArabicSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}
