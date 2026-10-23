export interface DiacriticRule {
  id: string;
  name: string;
  nameAr: string;
  symbol: string;
  position: 'above' | 'below' | 'inline';
  sound: string;
  exampleBaseLetter: string;
  exampleVocalized: string;
  translit: string;
  frenchSound: string;
  description: string;
}

export const SHORT_VOWELS: DiacriticRule[] = [
  {
    id: 'fatha',
    name: 'Fatha',
    nameAr: 'فَتْحَة',
    symbol: 'َ',
    position: 'above',
    sound: 'a',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بَ',
    translit: 'ba',
    frenchSound: 'Comme le "a" dans "papa"',
    description: 'Un petit trait oblique placé au-dessus de la consonne.',
  },
  {
    id: 'kasra',
    name: 'Kasra',
    nameAr: 'كَسْرَة',
    symbol: 'ِ',
    position: 'below',
    sound: 'i',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بِ',
    translit: 'bi',
    frenchSound: 'Comme le "i" dans "midi"',
    description: 'Un petit trait oblique placé sous la consonne.',
  },
  {
    id: 'damma',
    name: 'Damma',
    nameAr: 'ضَمَّة',
    symbol: 'ُ',
    position: 'above',
    sound: 'ou',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بُ',
    translit: 'bou',
    frenchSound: 'Comme le son "ou" dans "loup"',
    description: 'Une petite boucle en forme de waw (و) miniature au-dessus.',
  },
  {
    id: 'sukun',
    name: 'Sukun',
    nameAr: 'سُكُون',
    symbol: 'ْ',
    position: 'above',
    sound: 'ø (pas de voyelle)',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بْ',
    translit: 'b',
    frenchSound: 'Arrêt sec sur la consonne',
    description: 'Un petit cercle signifiant le silence ou l\'absence de voyelle.',
  },
];

export const LONG_VOWELS: DiacriticRule[] = [
  {
    id: 'madd_alif',
    name: 'Alif long',
    nameAr: 'مَدّ بِالأَلِف',
    symbol: 'ـَا',
    position: 'inline',
    sound: 'aa',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بَا',
    translit: 'bā',
    frenchSound: 'Un "a" prolongé (durée double)',
    description: 'Une Fatha suivie d\'un Alif prolonge le son "a".',
  },
  {
    id: 'madd_ya',
    name: 'Ya long',
    nameAr: 'مَدّ بِاليَاء',
    symbol: 'ـِي',
    position: 'inline',
    sound: 'ii',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بِي',
    translit: 'bī',
    frenchSound: 'Un "i" prolongé (durée double)',
    description: 'Une Kasra suivie d\'un Ya prolonge le son "i".',
  },
  {
    id: 'madd_waw',
    name: 'Waw long',
    nameAr: 'مَدّ بِالوَاو',
    symbol: 'ـُو',
    position: 'inline',
    sound: 'uu (oouu)',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بُو',
    translit: 'bū',
    frenchSound: 'Un "ou" prolongé (durée double)',
    description: 'Une Damma suivie d\'un Waw prolonge le son "ou".',
  },
];

export const SPECIAL_SIGNS: DiacriticRule[] = [
  {
    id: 'shaddah',
    name: 'Shaddah (Gémination)',
    nameAr: 'شَدَّة',
    symbol: 'ّ',
    position: 'above',
    sound: 'Consonne doublée',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بَّ',
    translit: 'bba',
    frenchSound: 'Appui renforcé sur la consonne (comme dans "immense")',
    description: 'En forme de petit w au-dessus, elle double l\'intensité de la lettre.',
  },
  {
    id: 'tanwin_fath',
    name: 'Tanwin al-Fath',
    nameAr: 'تَنْوِين الفَتْح',
    symbol: 'ً',
    position: 'above',
    sound: 'an',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بًا',
    translit: 'ban',
    frenchSound: 'Son "ane" à la fin du mot',
    description: 'Double fatha marquant l\'indéfini à l\'accusatif.',
  },
  {
    id: 'tanwin_dam',
    name: 'Tanwin ad-Damm',
    nameAr: 'تَنْوِين الضَّم',
    symbol: 'ٌ',
    position: 'above',
    sound: 'oun',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بٌ',
    translit: 'boun',
    frenchSound: 'Son "oune" à la fin du mot',
    description: 'Double damma marquant le nominatif indéfini.',
  },
  {
    id: 'tanwin_kasr',
    name: 'Tanwin al-Kasr',
    nameAr: 'تَنْوِين الكَسْر',
    symbol: 'ٍ',
    position: 'below',
    sound: 'in',
    exampleBaseLetter: 'ب',
    exampleVocalized: 'بٍ',
    translit: 'bin',
    frenchSound: 'Son "ine" à la fin du mot',
    description: 'Double kasra marquant le génitif indéfini.',
  },
];
