// Reading Lessons Dataset: Complete progressive Arabic reading tutor (Qaida Nuraniyya method)
// Levels: 1. Short vowels, 2. Long vowels (Madd), 3. Sukun (Closed syllables), 4. Tanwin, 5. Shaddah, 6. Word Assembly (Breakdown)
// Fully vocalized, with phonetics, French explanations, and Malagasy translations.

export interface SyllableExercise {
  letter: string;
  letterName: string;
  letterNameMalagasy: string;
  fatha: { ar: string; ph: string; audio: string };
  kasra: { ar: string; ph: string; audio: string };
  damma: { ar: string; ph: string; audio: string };
}

export interface MaddExample {
  id: string;
  letter: string;
  shortForm: { ar: string; ph: string };
  longFormAlif: { ar: string; ph: string };
  longFormWaw: { ar: string; ph: string };
  longFormYa: { ar: string; ph: string };
}

export interface SukunExample {
  id: string;
  arabic: string;
  phonetic: string;
  french: string;
  malagasy: string;
  rule: string;
  malagasyRule: string;
}

export interface TanwinExample {
  id: string;
  baseWord: string;
  phonetic: string;
  tanwinDamm: { ar: string; ph: string };
  tanwinFath: { ar: string; ph: string };
  tanwinKasr: { ar: string; ph: string };
  french: string;
  malagasy: string;
}

export interface ShaddahExample {
  id: string;
  arabic: string;
  phonetic: string;
  breakdown: string;
  french: string;
  malagasy: string;
  explanation: string;
}

export interface WordAssemblyLesson {
  id: string;
  fullWord: string;
  phonetic: string;
  syllables: {
    isolated: string;
    joined: string;
    phonetic: string;
    vowelName: string;
  }[];
  french: string;
  malagasy: string;
  type: 'daily' | 'quran' | 'easy' | 'intermediate';
  tipFrench?: string;
  tipMalagasy?: string;
}

// ----------------------------------------------------
// NIVEAU 1 : SYLLABES COURTES (Voyelles Fatha, Kasra, Damma)
// ----------------------------------------------------

export const SHORT_SYLLABLES_DATA: SyllableExercise[] = [
  {
    letter: 'أ',
    letterName: 'Alif / Hamza',
    letterNameMalagasy: 'Alif / Hamza',
    fatha: { ar: 'أَ', ph: 'A', audio: 'أَ' },
    kasra: { ar: 'إِ', ph: 'I', audio: 'إِ' },
    damma: { ar: 'أُ', ph: 'U', audio: 'أُ' }
  },
  {
    letter: 'ب',
    letterName: 'Bā’',
    letterNameMalagasy: 'Ba',
    fatha: { ar: 'بَ', ph: 'Ba', audio: 'بَ' },
    kasra: { ar: 'بِ', ph: 'Bi', audio: 'بِ' },
    damma: { ar: 'بُ', ph: 'Bu', audio: 'بُ' }
  },
  {
    letter: 'ت',
    letterName: 'Tā’',
    letterNameMalagasy: 'Ta',
    fatha: { ar: 'تَ', ph: 'Ta', audio: 'تَ' },
    kasra: { ar: 'تِ', ph: 'Ti', audio: 'تِ' },
    damma: { ar: 'تُ', ph: 'Tu', audio: 'تُ' }
  },
  {
    letter: 'ث',
    letterName: 'Thā’ (son th anglais)',
    letterNameMalagasy: 'Tha (fanononana malefaka)',
    fatha: { ar: 'ثَ', ph: 'Tha', audio: 'ثَ' },
    kasra: { ar: 'ثِ', ph: 'Thi', audio: 'ثِ' },
    damma: { ar: 'ثُ', ph: 'Thu', audio: 'ثُ' }
  },
  {
    letter: 'ج',
    letterName: 'Jīm',
    letterNameMalagasy: 'Jim (Dj)',
    fatha: { ar: 'جَ', ph: 'Ja', audio: 'جَ' },
    kasra: { ar: 'جِ', ph: 'Ji', audio: 'جِ' },
    damma: { ar: 'جُ', ph: 'Ju', audio: 'جُ' }
  },
  {
    letter: 'ح',
    letterName: 'Hā’ (aspiré profond)',
    letterNameMalagasy: 'Ha (fofonaina lalina)',
    fatha: { ar: 'حَ', ph: 'Ha', audio: 'حَ' },
    kasra: { ar: 'حِ', ph: 'Hi', audio: 'حِ' },
    damma: { ar: 'حُ', ph: 'Hu', audio: 'حُ' }
  },
  {
    letter: 'خ',
    letterName: 'Khā’ (râclé guttural)',
    letterNameMalagasy: 'Kha (fanononana an-tenda)',
    fatha: { ar: 'خَ', ph: 'Kha', audio: 'خَ' },
    kasra: { ar: 'خِ', ph: 'Khi', audio: 'خِ' },
    damma: { ar: 'خُ', ph: 'Khu', audio: 'خُ' }
  },
  {
    letter: 'د',
    letterName: 'Dāl',
    letterNameMalagasy: 'Dal (D malefaka)',
    fatha: { ar: 'دَ', ph: 'Da', audio: 'دَ' },
    kasra: { ar: 'دِ', ph: 'Di', audio: 'دِ' },
    damma: { ar: 'دُ', ph: 'Du', audio: 'دُ' }
  },
  {
    letter: 'ذ',
    letterName: 'Dhāl (son th anglais doux)',
    letterNameMalagasy: 'Dhal (toy ny "the" anglisy)',
    fatha: { ar: 'ذَ', ph: 'Dha', audio: 'ذَ' },
    kasra: { ar: 'ذِ', ph: 'Dhi', audio: 'ذِ' },
    damma: { ar: 'ذُ', ph: 'Dhu', audio: 'ذُ' }
  },
  {
    letter: 'ر',
    letterName: 'Rā’ (roulé)',
    letterNameMalagasy: 'Ra (mivalona)',
    fatha: { ar: 'رَ', ph: 'Ra', audio: 'رَ' },
    kasra: { ar: 'رِ', ph: 'Ri', audio: 'رِ' },
    damma: { ar: 'رُ', ph: 'Ru', audio: 'رُ' }
  },
  {
    letter: 'ز',
    letterName: 'Zāy',
    letterNameMalagasy: 'Zay (Z)',
    fatha: { ar: 'زَ', ph: 'Za', audio: 'زَ' },
    kasra: { ar: 'زِ', ph: 'Zi', audio: 'زِ' },
    damma: { ar: 'زُ', ph: 'Zu', audio: 'زُ' }
  },
  {
    letter: 'س',
    letterName: 'Sīn',
    letterNameMalagasy: 'Sin (S madio)',
    fatha: { ar: 'سَ', ph: 'Sa', audio: 'سَ' },
    kasra: { ar: 'سِ', ph: 'Si', audio: 'سِ' },
    damma: { ar: 'سُ', ph: 'Su', audio: 'سُ' }
  },
  {
    letter: 'ش',
    letterName: 'Shīn',
    letterNameMalagasy: 'Shin (Ch)',
    fatha: { ar: 'شَ', ph: 'Sha', audio: 'شَ' },
    kasra: { ar: 'شِ', ph: 'Shi', audio: 'شِ' },
    damma: { ar: 'شُ', ph: 'Shu', audio: 'شُ' }
  },
  {
    letter: 'ص',
    letterName: 'Sād (S emphatique)',
    letterNameMalagasy: 'Sad (S matevina)',
    fatha: { ar: 'صَ', ph: 'Ṣa', audio: 'صَ' },
    kasra: { ar: 'صِ', ph: 'Ṣi', audio: 'صِ' },
    damma: { ar: 'صُ', ph: 'Ṣu', audio: 'صُ' }
  },
  {
    letter: 'ض',
    letterName: 'Dād (D emphatique)',
    letterNameMalagasy: 'Dad (D matevina manokana)',
    fatha: { ar: 'ضَ', ph: 'Ḍa', audio: 'ضَ' },
    kasra: { ar: 'ضِ', ph: 'Ḍi', audio: 'ضِ' },
    damma: { ar: 'ضُ', ph: 'Ḍu', audio: 'ضُ' }
  },
  {
    letter: 'ط',
    letterName: 'Tā’ (T emphatique)',
    letterNameMalagasy: 'Ta (T matevina)',
    fatha: { ar: 'طَ', ph: 'Ṭa', audio: 'طَ' },
    kasra: { ar: 'طِ', ph: 'Ṭi', audio: 'طِ' },
    damma: { ar: 'طُ', ph: 'Ṭu', audio: 'طُ' }
  },
  {
    letter: 'ظ',
    letterName: 'Dhā’ (Z/Dh emphatique)',
    letterNameMalagasy: 'Zha (Dh matevina)',
    fatha: { ar: 'ظَ', ph: 'Ẓa', audio: 'ظَ' },
    kasra: { ar: 'ظِ', ph: 'Ẓi', audio: 'ظِ' },
    damma: { ar: 'ظُ', ph: 'Ẓu', audio: 'ظُ' }
  },
  {
    letter: 'ع',
    letterName: '‘Ayn (guttural profond)',
    letterNameMalagasy: '‘Ayn (faneno an-tenda lalina)',
    fatha: { ar: 'عَ', ph: '‘A', audio: 'عَ' },
    kasra: { ar: 'عِ', ph: '‘I', audio: 'عِ' },
    damma: { ar: 'عُ', ph: '‘U', audio: 'عُ' }
  },
  {
    letter: 'غ',
    letterName: 'Ghayn (R grasseyé)',
    letterNameMalagasy: 'Ghayn (R frantsay malefaka)',
    fatha: { ar: 'غَ', ph: 'Gha', audio: 'غَ' },
    kasra: { ar: 'غِ', ph: 'Ghi', audio: 'غِ' },
    damma: { ar: 'غُ', ph: 'Ghu', audio: 'غُ' }
  },
  {
    letter: 'ف',
    letterName: 'Fā’',
    letterNameMalagasy: 'Fa (F)',
    fatha: { ar: 'فَ', ph: 'Fa', audio: 'فَ' },
    kasra: { ar: 'فِ', ph: 'Fi', audio: 'فِ' },
    damma: { ar: 'فُ', ph: 'Fu', audio: 'فُ' }
  },
  {
    letter: 'ق',
    letterName: 'Qāf (glottal profond)',
    letterNameMalagasy: 'Qaf (K an-tenda lalina)',
    fatha: { ar: 'قَ', ph: 'Qa', audio: 'قَ' },
    kasra: { ar: 'قِ', ph: 'Qi', audio: 'قِ' },
    damma: { ar: 'قُ', ph: 'Qu', audio: 'قُ' }
  },
  {
    letter: 'ك',
    letterName: 'Kāf',
    letterNameMalagasy: 'Kaf (K mahazatra)',
    fatha: { ar: 'كَ', ph: 'Ka', audio: 'كَ' },
    kasra: { ar: 'كِ', ph: 'Ki', audio: 'كِ' },
    damma: { ar: 'كُ', ph: 'Ku', audio: 'كُ' }
  },
  {
    letter: 'ل',
    letterName: 'Lām',
    letterNameMalagasy: 'Lam (L)',
    fatha: { ar: 'لَ', ph: 'La', audio: 'لَ' },
    kasra: { ar: 'لِ', ph: 'Li', audio: 'لِ' },
    damma: { ar: 'لُ', ph: 'Lu', audio: 'لُ' }
  },
  {
    letter: 'م',
    letterName: 'Mīm',
    letterNameMalagasy: 'Mim (M)',
    fatha: { ar: 'مَ', ph: 'Ma', audio: 'مَ' },
    kasra: { ar: 'مِ', ph: 'Mi', audio: 'مِ' },
    damma: { ar: 'مُ', ph: 'Mu', audio: 'مُ' }
  },
  {
    letter: 'ن',
    letterName: 'Nūn',
    letterNameMalagasy: 'Nun (N)',
    fatha: { ar: 'نَ', ph: 'Na', audio: 'نَ' },
    kasra: { ar: 'نِ', ph: 'Ni', audio: 'نِ' },
    damma: { ar: 'نُ', ph: 'Nu', audio: 'نُ' }
  },
  {
    letter: 'ه',
    letterName: 'Hā’ (soupir doux)',
    letterNameMalagasy: 'Ha (fofonaina malefaka)',
    fatha: { ar: 'هَ', ph: 'Ha', audio: 'هَ' },
    kasra: { ar: 'هِ', ph: 'Hi', audio: 'هِ' },
    damma: { ar: 'هُ', ph: 'Hu', audio: 'هُ' }
  },
  {
    letter: 'و',
    letterName: 'Wāw',
    letterNameMalagasy: 'Waw (W)',
    fatha: { ar: 'وَ', ph: 'Wa', audio: 'وَ' },
    kasra: { ar: 'وِ', ph: 'Wi', audio: 'وِ' },
    damma: { ar: 'وُ', ph: 'Wu', audio: 'وُ' }
  },
  {
    letter: 'ي',
    letterName: 'Yā’',
    letterNameMalagasy: 'Ya (Y)',
    fatha: { ar: 'يَ', ph: 'Ya', audio: 'يَ' },
    kasra: { ar: 'يِ', ph: 'Yi', audio: 'يِ' },
    damma: { ar: 'يُ', ph: 'Yu', audio: 'يُ' }
  }
];

// ----------------------------------------------------
// NIVEAU 2 : VOYELLES LONGUES (AL-MADD / MADD)
// ----------------------------------------------------

export const MADD_DATA: MaddExample[] = [
  {
    id: 'madd-ba',
    letter: 'ب',
    shortForm: { ar: 'بَ', ph: 'Ba (court)' },
    longFormAlif: { ar: 'بَا', ph: 'Bā (long avec Alif)' },
    longFormWaw: { ar: 'بُو', ph: 'Bū (long avec Waw)' },
    longFormYa: { ar: 'بِي', ph: 'Bī (long avec Ya)' }
  },
  {
    id: 'madd-ta',
    letter: 'ت',
    shortForm: { ar: 'تَ', ph: 'Ta (court)' },
    longFormAlif: { ar: 'تَا', ph: 'Tā' },
    longFormWaw: { ar: 'تُو', ph: 'Tū' },
    longFormYa: { ar: 'تِي', ph: 'Tī' }
  },
  {
    id: 'madd-sin',
    letter: 'س',
    shortForm: { ar: 'سَ', ph: 'Sa (court)' },
    longFormAlif: { ar: 'سَا', ph: 'Sā' },
    longFormWaw: { ar: 'سُو', ph: 'Sū' },
    longFormYa: { ar: 'سِي', ph: 'Sī' }
  },
  {
    id: 'madd-mim',
    letter: 'م',
    shortForm: { ar: 'مَ', ph: 'Ma (court)' },
    longFormAlif: { ar: 'مَا', ph: 'Mā' },
    longFormWaw: { ar: 'مُو', ph: 'Mū' },
    longFormYa: { ar: 'مِي', ph: 'Mī' }
  },
  {
    id: 'madd-nun',
    letter: 'ن',
    shortForm: { ar: 'نَ', ph: 'Na (court)' },
    longFormAlif: { ar: 'نَا', ph: 'Nā' },
    longFormWaw: { ar: 'نُور', ph: 'Nūr' },
    longFormYa: { ar: 'نِي', ph: 'Nī' }
  },
  {
    id: 'madd-qaf',
    letter: 'ق',
    shortForm: { ar: 'قَ', ph: 'Qa (court)' },
    longFormAlif: { ar: 'قَالَ', ph: 'Qāla (Il a dit)' },
    longFormWaw: { ar: 'يَقُولُ', ph: 'Yaqūlu (Il dit)' },
    longFormYa: { ar: 'قِيلَ', ph: 'Qīla (Il a été dit)' }
  }
];

// ----------------------------------------------------
// NIVEAU 3 : LE SOUKOUN (SYLLABES FERMÉES)
// ----------------------------------------------------

export const SUKUN_DATA: SukunExample[] = [
  {
    id: 'sukun-1',
    arabic: 'أَبْ',
    phonetic: 'Ab',
    french: 'Père / Papa',
    malagasy: 'Ray / Dada',
    rule: "Le soukoun (ـْ) arrête le son de la consonne sans voyelle (A + b = Ab).",
    malagasyRule: "Ny soukoun (ـْ) dia manapaka ny feo tsy misy zanatsoratra (A + b = Ab)."
  },
  {
    id: 'sukun-2',
    arabic: 'مَنْ',
    phonetic: 'Man',
    french: 'Qui ?',
    malagasy: 'Iza ?',
    rule: "Ma + nûn avec soukoun = Man.",
    malagasyRule: "Ma + nun miaraka amin’ny soukoun = Man."
  },
  {
    id: 'sukun-3',
    arabic: 'كَمْ',
    phonetic: 'Kam',
    french: 'Combien ?',
    malagasy: 'Firy ?',
    rule: "Ka + mîm avec soukoun = Kam.",
    malagasyRule: "Ka + mim misy soukoun = Kam."
  },
  {
    id: 'sukun-4',
    arabic: 'هَلْ',
    phonetic: 'Hal',
    french: 'Est-ce que ?',
    malagasy: 'Moa ve ?',
    rule: "Ha + lām avec soukoun = Hal.",
    malagasyRule: "Ha + lam misy soukoun = Hal."
  },
  {
    id: 'sukun-5',
    arabic: 'قُلْ',
    phonetic: 'Qul',
    french: 'Dis ! (Ordre)',
    malagasy: 'Mitenena ! (Baiko)',
    rule: "Qu + lām avec soukoun = Qul (comme dans Qul Huwa Allahu Ahad).",
    malagasyRule: "Qu + lam misy soukoun = Qul (toy ny ao amin’ny Qul Huwa Allahu Ahad)."
  },
  {
    id: 'sukun-6',
    arabic: 'بِنْتْ',
    phonetic: 'Bint',
    french: 'Fille',
    malagasy: 'Zanaka vavy',
    rule: "Bi + n + t = Bint.",
    malagasyRule: "Bi + n + t = Bint."
  }
];

// ----------------------------------------------------
// NIVEAU 4 : LE TANWÎN (NUNATION -an, -in, -un)
// ----------------------------------------------------

export const TANWIN_DATA: TanwinExample[] = [
  {
    id: 'tanwin-kitab',
    baseWord: 'كِتَاب',
    phonetic: 'Kitāb',
    tanwinDamm: { ar: 'كِتَابٌ', ph: 'Kitābun' },
    tanwinFath: { ar: 'كِتَابًا', ph: 'Kitāban' },
    tanwinKasr: { ar: 'كِتَابٍ', ph: 'Kitābin' },
    french: 'Un livre (indéfini)',
    malagasy: 'Boky iray'
  },
  {
    id: 'tanwin-bayt',
    baseWord: 'بَيْت',
    phonetic: 'Bayt',
    tanwinDamm: { ar: 'بَيْتٌ', ph: 'Baytun' },
    tanwinFath: { ar: 'بَيْتًا', ph: 'Baytan' },
    tanwinKasr: { ar: 'بَيْتٍ', ph: 'Baytin' },
    french: 'Une maison',
    malagasy: 'Trano iray'
  },
  {
    id: 'tanwin-shukran',
    baseWord: 'شُكْر',
    phonetic: 'Shukr',
    tanwinDamm: { ar: 'شُكْرٌ', ph: 'Shukrun' },
    tanwinFath: { ar: 'شُكْرًا', ph: 'Shukran' },
    tanwinKasr: { ar: 'شُكْرٍ', ph: 'Shukrin' },
    french: 'Merci / Remerciement',
    malagasy: 'Misaotra / Fankasitrahana'
  },
  {
    id: 'tanwin-ilm',
    baseWord: 'عِلْم',
    phonetic: '‘Ilm',
    tanwinDamm: { ar: 'عِلْمٌ', ph: '‘Ilmun' },
    tanwinFath: { ar: 'عِلْمًا', ph: '‘Ilman' },
    tanwinKasr: { ar: 'عِلْمٍ', ph: '‘Ilmin' },
    french: 'Une science / Un savoir',
    malagasy: 'Fahalalana / Siansa'
  }
];

// ----------------------------------------------------
// NIVEAU 5 : LA SHADDAH (CONSONNES DOUBLÉES)
// ----------------------------------------------------

export const SHADDAH_DATA: ShaddahExample[] = [
  {
    id: 'shaddah-rabbi',
    arabic: 'رَبِّ',
    phonetic: 'Rabbi',
    breakdown: 'رَبْ + بِ = رَبِّ',
    french: 'Mon Seigneur',
    malagasy: 'Ny Tompoko',
    explanation: "La lettre Ba porte une Shaddah avec Kasra en dessous : on appuie fermement sur le 'b' (Rab-bi)."
  },
  {
    id: 'shaddah-shams',
    arabic: 'الشَّمْسُ',
    phonetic: 'Ash-Shamsu',
    breakdown: 'اَلْ + شَمْس = اَشَّمْس',
    french: 'Le soleil',
    malagasy: 'Ny masoandro',
    explanation: "Lettre solaire Shīn : le Lâm de l'article s'assimile complètement et double la lettre suivante."
  },
  {
    id: 'shaddah-haqq',
    arabic: 'حَقّ',
    phonetic: 'Haqq',
    breakdown: 'حَقْ + قُ = حَقٌّ',
    french: 'Vérité / Droit',
    malagasy: 'Fahamarinana / Zo',
    explanation: "Le Qāf final est prononcé avec insistance et force sonore."
  },
  {
    id: 'shaddah-umm',
    arabic: 'أُمّ',
    phonetic: 'Umm',
    breakdown: 'أُمْ + مُ = أُمٌّ',
    french: 'Mère / Maman',
    malagasy: 'Reny / Neny',
    explanation: "Le Mîm est doublé et maintenu un court instant avec résonance nasale (Ghunnah)."
  }
];

// ----------------------------------------------------
// NIVEAU 6 : ASSEMBLAGE DE MOTS COMPLETS & LECTURE
// ----------------------------------------------------

export const WORD_ASSEMBLY_LESSONS: WordAssemblyLesson[] = [
  {
    id: 'word-kataba',
    fullWord: 'كَتَبَ',
    phonetic: 'Kataba',
    syllables: [
      { isolated: 'كـ', joined: 'كَ', phonetic: 'Ka', vowelName: 'Fatha' },
      { isolated: 'ـتـ', joined: 'تَ', phonetic: 'Ta', vowelName: 'Fatha' },
      { isolated: 'ـب', joined: 'بَ', phonetic: 'Ba', vowelName: 'Fatha' }
    ],
    french: 'Il a écrit',
    malagasy: 'Nanoratra izy',
    type: 'easy',
    tipFrench: 'Trois lettres simples attachées, chacune avec une voyelle courte Fatha (a-a-a).',
    tipMalagasy: 'Taratasy tsotra telo mitambatra, samy manana zanatsoratra fohy Fatha (a-a-a).'
  },
  {
    id: 'word-qalam',
    fullWord: 'قَلَمٌ',
    phonetic: 'Qalamun',
    syllables: [
      { isolated: 'قـ', joined: 'قَ', phonetic: 'Qa', vowelName: 'Fatha' },
      { isolated: 'ـلـ', joined: 'لَ', phonetic: 'La', vowelName: 'Fatha' },
      { isolated: 'ـم', joined: 'مٌ', phonetic: 'Mun', vowelName: 'Tanwin Damm' }
    ],
    french: 'Un stylo / Un calame',
    malagasy: 'Penina / Fanamarihana',
    type: 'easy',
    tipFrench: 'Le mot Kalam du titre de l’application ! Qa + La + Mun.',
    tipMalagasy: 'Ilay teny Kalam anaran’ny rindranasa ! Qa + La + Mun.'
  },
  {
    id: 'word-kitab',
    fullWord: 'كِتَابٌ',
    phonetic: 'Kitābun',
    syllables: [
      { isolated: 'كـ', joined: 'كِ', phonetic: 'Ki', vowelName: 'Kasra' },
      { isolated: 'ـتـ', joined: 'تَا', phonetic: 'Tā', vowelName: 'Madd Alif' },
      { isolated: 'ـب', joined: 'بٌ', phonetic: 'Bun', vowelName: 'Tanwin Damm' }
    ],
    french: 'Un livre',
    malagasy: 'Boky iray',
    type: 'intermediate',
    tipFrench: 'Notez la voyelle longue au milieu : Ki-TĀ-bun.',
    tipMalagasy: 'Mariho ny zanatsoratra lava eo afovoany : Ki-TĀ-bun.'
  },
  {
    id: 'word-masjid',
    fullWord: 'مَسْجِدٌ',
    phonetic: 'Masjidun',
    syllables: [
      { isolated: 'مـ', joined: 'مَسْ', phonetic: 'Mas', vowelName: 'Fatha + Sukun' },
      { isolated: 'ـجـ', joined: 'جِ', phonetic: 'Ji', vowelName: 'Kasra' },
      { isolated: 'ـد', joined: 'دٌ', phonetic: 'Dun', vowelName: 'Tanwin Damm' }
    ],
    french: 'Une mosquée (Lieu de prosternation)',
    malagasy: 'Moske (Toerana fiankohofana)',
    type: 'intermediate',
    tipFrench: 'Première syllabe fermée avec Soukoun : Mas - ji - dun.',
    tipMalagasy: 'Vaninteny voalohany mihidy miaraka amin’ny Soukoun : Mas - ji - dun.'
  },
  {
    id: 'word-salam',
    fullWord: 'سَلَامٌ',
    phonetic: 'Salāmun',
    syllables: [
      { isolated: 'سـ', joined: 'سَ', phonetic: 'Sa', vowelName: 'Fatha' },
      { isolated: 'ـلا', joined: 'لَا', phonetic: 'Lā', vowelName: 'Lâm-Alif Madd' },
      { isolated: 'ـم', joined: 'مٌ', phonetic: 'Mun', vowelName: 'Tanwin Damm' }
    ],
    french: 'Paix / Salut',
    malagasy: 'Fiadanana / Fiarahabana',
    type: 'easy',
    tipFrench: 'La ligature spéciale Lam-Alif (لا) est indispensable en arabe.',
    tipMalagasy: 'Tena ilaina ny fitambaran’ny Lam-Alif (لا) amin’ny teny arabo.'
  },
  {
    id: 'word-alhamdu',
    fullWord: 'الْحَمْدُ',
    phonetic: 'Al-Hamdu',
    syllables: [
      { isolated: 'الـ', joined: 'الْ', phonetic: 'Al', vowelName: 'Article défini' },
      { isolated: 'ـحـ', joined: 'حَمْ', phonetic: 'Ham', vowelName: 'Fatha + Sukun' },
      { isolated: 'ـد', joined: 'دُ', phonetic: 'Du', vowelName: 'Damma' }
    ],
    french: 'La louange (Al-Hamd)',
    malagasy: 'Ny fiderana rehetra',
    type: 'quran',
    tipFrench: 'Le premier mot de la sourate Al-Fatiha ! Al - Ham - du.',
    tipMalagasy: 'Ny teny voalohany ao amin’ny soratra Al-Fatiha ! Al - Ham - du.'
  },
  {
    id: 'word-rahman',
    fullWord: 'الرَّحْمَٰنُ',
    phonetic: 'Ar-Rahmānu',
    syllables: [
      { isolated: 'الـ', joined: 'اَرْ', phonetic: 'Ar', vowelName: 'Assimilation solaire' },
      { isolated: 'ـر', joined: 'رَحْ', phonetic: 'Rah', vowelName: 'Shaddah + Fatha + Sukun' },
      { isolated: 'ـمـ', joined: 'مَا', phonetic: 'Mā', vowelName: 'Alif Khanjariyyah' },
      { isolated: 'ـن', joined: 'نُ', phonetic: 'Nu', vowelName: 'Damma' }
    ],
    french: 'Le Tout Miséricordieux',
    malagasy: 'Ilay Be Famindram-po',
    type: 'quran',
    tipFrench: 'Nom sublime d’Allah présent dans la Basmala.',
    tipMalagasy: 'Anarana mendrika indrindra an’i Allah ao amin’ny Basmala.'
  },
  {
    id: 'word-nur',
    fullWord: 'نُورٌ',
    phonetic: 'Nūrun',
    syllables: [
      { isolated: 'نـ', joined: 'نُو', phonetic: 'Nū', vowelName: 'Madd Waw' },
      { isolated: 'ـر', joined: 'رٌ', phonetic: 'Run', vowelName: 'Tanwin Damm' }
    ],
    french: 'Lumière',
    malagasy: 'Hazavana',
    type: 'easy',
    tipFrench: 'Une syllabe longue puis une nunation : Nū - run.',
    tipMalagasy: 'Vaninteny lava iray sy fanononana tanwin : Nū - run.'
  }
];
