export interface DictionaryEntry {
  fr: string;
  ar: string;
  arPhonetic: string;
  mg: string;
  notes?: string;
}

export const TRANSLATOR_DICTIONARY: DictionaryEntry[] = [
  {
    fr: 'Bonjour',
    ar: 'مَرْحَبًا / السَّلَامُ عَلَيْكُمْ',
    arPhonetic: 'Marḥaban / As-salāmu \'alaykum',
    mg: 'Manao ahoana / Salama',
    notes: 'Salutation courante. En malgache, "Salama" et en arabe "As-salāmu \'alaykum" partagent la notion de paix et de santé.',
  },
  {
    fr: 'Bonjour, comment allez-vous ?',
    ar: 'مَرْحَبًا، كَيْفَ حَالُكُمْ؟',
    arPhonetic: 'Marḥaban, kayfa ḥālukum?',
    mg: 'Manao ahoana tompoko, manao ahoana ny fahasalamana?',
    notes: 'En malgache comme en arabe, les formules de politesse s\'adressent avec déférence.',
  },
  {
    fr: 'Comment vas-tu ?',
    ar: 'كَيْفَ حَالُكَ؟',
    arPhonetic: 'Kayfa ḥāluk?',
    mg: 'Manao ahoana ianao? / Salama tsara ve?',
    notes: 'Formule familière adressée à un ami.',
  },
  {
    fr: 'Merci',
    ar: 'شُكْرًا',
    arPhonetic: 'Shukran',
    mg: 'Misaotra',
    notes: 'Expression fondamentale de gratitude.',
  },
  {
    fr: 'Merci beaucoup',
    ar: 'شُكْرًا جَزِيلًا',
    arPhonetic: 'Shukran jazīlan',
    mg: 'Misaotra betsaka',
    notes: 'Remerciement chaleureux.',
  },
  {
    fr: 'Merci beaucoup pour votre aide',
    ar: 'شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكُمْ',
    arPhonetic: 'Shukran jazīlan \'alā musā\'adatikum',
    mg: 'Misaotra betsaka tamin\'ny fanampianao / fanampianareo',
    notes: 'Remerciement appuyé pour un service rendu.',
  },
  {
    fr: 'Bienvenue',
    ar: 'أَهْلاً وَسَهْلاً',
    arPhonetic: 'Ahlan wa sahlan',
    mg: 'Tongasoa',
    notes: 'Formule d\'accueil traditionnelle.',
  },
  {
    fr: 'Bienvenue chez nous',
    ar: 'أَهْلاً وَسَهْلاً بِكُمْ فِي بَيْتِنَا',
    arPhonetic: 'Ahlan wa sahlan bikum fī baytinā',
    mg: 'Tongasoa eto aminay',
    notes: 'Hospitalité et ouverture de la maison aux invités.',
  },
  {
    fr: 'Bienvenue à Madagascar',
    ar: 'أَهْلاً وَسَهْلاً بِكُمْ فِي مَدَغَشْقَر',
    arPhonetic: 'Ahlan wa sahlan bikum fī Madaghashqar',
    mg: 'Tongasoa eto Madagasikara',
    notes: 'Accueil officiel et touristique sur la Grande Île.',
  },
  {
    fr: 'Au revoir',
    ar: 'مَعَ السَّلَامَة',
    arPhonetic: 'Ma\'a s-salāmah',
    mg: 'Veloma',
    notes: 'Littéralement en arabe : "partez avec la paix/sécurité". En malgache : "veloma" signifie "soyez vivant / portez-vous bien".',
  },
  {
    fr: 'S\'il vous plaît',
    ar: 'مِنْ فَضْلِكَ / مِنْ فَضْلِكُمْ',
    arPhonetic: 'Min faḍlik / Min faḍlikum',
    mg: 'Azafady tompoko',
    notes: 'Demande courtoise. En malgache "Azafady" sert aussi d\'excuse ou de pardon.',
  },
  {
    fr: 'Pardon',
    ar: 'عَفْوًا / مَعْذِرَةً',
    arPhonetic: '\'Afwan / Ma\'dhiratan',
    mg: 'Azafady / Miala tsiny',
    notes: 'Pour s\'excuser ou attirer poliment l\'attention.',
  },
  {
    fr: 'Oui',
    ar: 'نَعَمْ',
    arPhonetic: 'Na\'am',
    mg: 'Eny',
    notes: 'Affirmation.',
  },
  {
    fr: 'Non',
    ar: 'لَا',
    arPhonetic: 'Lā',
    mg: 'Tsia',
    notes: 'Négation.',
  },
  {
    fr: 'La paix',
    ar: 'السَّلَام',
    arPhonetic: 'As-salām',
    mg: 'Fandriampahalemana / Fiadanana',
    notes: 'Concept central commun aux cultures malgache et arabe.',
  },
  {
    fr: 'Dieu',
    ar: 'الله',
    arPhonetic: 'Allāh',
    mg: 'Andriamanitra / Zanahary',
    notes: 'Le Créateur suprême dans les deux spiritualités.',
  },
  {
    fr: 'L\'amour',
    ar: 'الحُبّ',
    arPhonetic: 'Al-ḥubb',
    mg: 'Fitiavana',
    notes: 'Affection et sentiment profond.',
  },
  {
    fr: 'La famille',
    ar: 'العَائِلَة / الأُسْرَة',
    arPhonetic: 'Al-\'ā\'ilah / Al-usrah',
    mg: 'Fianakaviana',
    notes: 'Le cercle familial, pilier de la société.',
  },
  {
    fr: 'L\'eau',
    ar: 'المَاء',
    arPhonetic: 'Al-mā\'',
    mg: 'Rano',
    notes: 'Élément vital indispensable.',
  },
  {
    fr: 'Le pain',
    ar: 'الخُبْز',
    arPhonetic: 'Al-khubz',
    mg: 'Mofo',
    notes: 'Nourriture de base.',
  },
  {
    fr: 'Le riz',
    ar: 'الأُرْز',
    arPhonetic: 'Al-aruzz',
    mg: 'Vary',
    notes: 'Aliment sacré et quotidien à Madagascar, très apprécié également dans le monde arabe.',
  },
  {
    fr: 'Le livre',
    ar: 'الكِتَاب',
    arPhonetic: 'Al-kitāb',
    mg: 'Boky / Soratra',
    notes: 'Le mot malgache "Sorabe" (grandes écritures) est lié à la tradition manuscrite arabe.',
  },
  {
    fr: 'Dimanche',
    ar: 'الأَحَد',
    arPhonetic: 'Al-aḥad',
    mg: 'Alahady',
    notes: 'Le nom du dimanche en malgache (Alahady) vient directement du mot arabe Al-Ahad (الأحد) !',
  },
  {
    fr: 'Lundi',
    ar: 'الاِثْنَيْن',
    arPhonetic: 'Al-ithnayn',
    mg: 'Alatsinainy',
    notes: 'Le lundi malgache (Alatsinainy) dérive de l\'arabe Al-Ithnayn (الاثنين).',
  },
  {
    fr: 'Mardi',
    ar: 'الثُّلَاثَاء',
    arPhonetic: 'Ath-thulāthā\'',
    mg: 'Talata',
    notes: 'Le mardi malgache (Talata) provient directement de l\'arabe Ath-Thulāthā\' (الثلاثاء).',
  },
  {
    fr: 'Mercredi',
    ar: 'الأَرْبِعَاء',
    arPhonetic: 'Al-arbi\'ā\'',
    mg: 'Alarobia',
    notes: 'Le mercredi malgache (Alarobia) dérive de l\'arabe Al-Arbi\'ā\' (الأربعاء).',
  },
  {
    fr: 'Jeudi',
    ar: 'الخَمِيس',
    arPhonetic: 'Al-khamīs',
    mg: 'Alakamisy',
    notes: 'Le jeudi malgache (Alakamisy) découle de l\'arabe Al-Khamīs (الخميس).',
  },
  {
    fr: 'Vendredi',
    ar: 'الجُمُعَة',
    arPhonetic: 'Al-jumu\'ah',
    mg: 'Zoma',
    notes: 'Le vendredi malgache (Zoma) vient du mot arabe Jumu\'ah (الجمعة).',
  },
  {
    fr: 'Samedi',
    ar: 'السَّبْت',
    arPhonetic: 'As-sabt',
    mg: 'Sabotsy',
    notes: 'Le samedi malgache (Sabotsy) dérive de l\'arabe As-Sabt (السبت).',
  },
];

// Helper to look up text in dictionary
export function findTranslation(query: string) {
  const q = query.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  if (!q) return null;

  // Exact match
  const exact = TRANSLATOR_DICTIONARY.find(
    (e) =>
      e.fr.toLowerCase().replace(/[.,!?;:]/g, '') === q ||
      e.mg.toLowerCase().replace(/[.,!?;:]/g, '') === q ||
      e.ar.replace(/[ًٌٍَُِّْ\(\)\[\].,!?;:\/]/g, '').trim() === q ||
      e.arPhonetic.toLowerCase().replace(/[.,!?;:]/g, '') === q
  );
  if (exact) return exact;

  // Partial match
  const partial = TRANSLATOR_DICTIONARY.find(
    (e) =>
      q.includes(e.fr.toLowerCase()) ||
      e.fr.toLowerCase().includes(q) ||
      q.includes(e.mg.toLowerCase()) ||
      e.mg.toLowerCase().includes(q)
  );
  return partial || null;
}
