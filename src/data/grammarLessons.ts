export interface GrammarRuleExample {
  arabic: string;
  translit: string;
  french: string;
  note?: string;
}

export interface GrammarLesson {
  id: string;
  titleFr: string;
  titleAr: string;
  summary: string;
  badge: string;
  sections: {
    heading: string;
    explanation: string;
    examples: GrammarRuleExample[];
  }[];
  keyTakeaway: string;
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'solar-lunar',
    titleFr: 'Lettres Solaires et Lettres Lunaires',
    titleAr: 'الحُرُوفُ الشَّمْسِيَّةُ وَالقَمَرِيَّة',
    summary: 'Comprendre l\'assimilation du "L" de l\'article défini (الـ) selon la lettre suivante.',
    badge: 'Phonétique & Écriture',
    sections: [
      {
        heading: '1. L\'article défini en arabe (الـ)',
        explanation: 'En arabe, il n\'y a qu\'un seul article défini invariable : "Al-" (الـ), équivalent de "le", "la", "les". Il s\'attache directement au mot sans espace.',
        examples: [
          { arabic: 'كِتَابٌ', translit: 'Kitābun', french: 'Un livre (indéfini, avec tanwin)' },
          { arabic: 'الكِتَابُ', translit: 'Al-kitābu', french: 'Le livre (défini, sans tanwin)' },
        ],
      },
      {
        heading: '2. Les Lettres Lunaires (القَمَرِيَّة) : Le "L" se prononce',
        explanation: 'Il y a 14 lettres lunaires. Devant ces lettres, le "L" de "Al-" est nettement prononcé. Mnémonique : "Al-Qamar" (القَمَر - la lune).',
        examples: [
          { arabic: 'القَمَرُ', translit: 'Al-Qamar', french: 'La lune', note: 'Le "L" est clairement articulé' },
          { arabic: 'البَابُ', translit: 'Al-Bāb', french: 'La porte', note: 'Ba (ب) est lunaire' },
          { arabic: 'المَطَارُ', translit: 'Al-Maṭār', french: 'L\'aéroport', note: 'Mim (م) est lunaire' },
        ],
      },
      {
        heading: '3. Les Lettres Solaires (الشَّمْسِيَّة) : Le "L" s\'assimile',
        explanation: 'Il y a 14 lettres solaires (principalement dentales et sifflantes : t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n). Le "L" devient muet et la lettre suivante est doublée (porte une Shaddah ّ). Mnémonique : "Ash-Shams" (الشَّمْس - le soleil, et non "Al-shams").',
        examples: [
          { arabic: 'الشَّمْسُ', translit: 'Ash-Shams (et non Al-shams)', french: 'Le soleil', note: 'Le "L" s\'assimile en "Sh"' },
          { arabic: 'السَّلَامُ', translit: 'As-Salām (et non Al-salām)', french: 'La paix', note: 'Sin (س) est solaire' },
          { arabic: 'النُّورُ', translit: 'An-Nūr', french: 'La lumière', note: 'Nun (ن) est solaire' },
        ],
      },
    ],
    keyTakeaway: 'Retenez : Devant les lettres du soleil (dentales comme S, T, N, R...), le L s\'efface pour doubler la consonne suivante !',
  },
  {
    id: 'gender-ta-marbuta',
    titleFr: 'Le Masculin et le Féminin',
    titleAr: 'المُذَكَّرُ وَالمُؤَنَّث',
    summary: 'Comment transformer un mot masculin en féminin grâce à la Ta Marbuta (ة).',
    badge: 'Morphologie',
    sections: [
      {
        heading: '1. Le masculin par défaut',
        explanation: 'En arabe, les noms et adjectifs sont par défaut au masculin s\'ils ne portent pas de marqueur spécifique de féminin.',
        examples: [
          { arabic: 'مُعَلِّمٌ', translit: 'Mu\'allim', french: 'Un enseignant' },
          { arabic: 'طَالِبٌ', translit: 'Ṭālib', french: 'Un étudiant' },
          { arabic: 'كَبِيرٌ', translit: 'Kabīr', french: 'Grand' },
        ],
      },
      {
        heading: '2. La Ta Marbuta (ة / ـة) : Le sceau du féminin',
        explanation: 'Pour transformer un nom ou un adjectif masculin au féminin, on ajoute généralement une "Ta Marbuta" (تَاء مَرْبُوطَة, littéralement "t liée") à la fin, précédée d\'une voyelle Fatha (a). À la pause finale, elle se prononce comme un "a" ou un "h" doux.',
        examples: [
          { arabic: 'مُعَلِّمَةٌ', translit: 'Mu\'allimah', french: 'Une enseignante' },
          { arabic: 'طَالِبَةٌ', translit: 'Ṭālibah', french: 'Une étudiante' },
          { arabic: 'كَبِيرَةٌ', translit: 'Kabīrah', french: 'Grande' },
          { arabic: 'مَدِينَةٌ', translit: 'Madīnah', french: 'Une ville (féminin par nature)' },
        ],
      },
    ],
    keyTakeaway: 'Adjectif au féminin = Radical masculin + ة (ex: جميل Jamīl -> جميلة Jamīlah).',
  },
  {
    id: 'pronouns',
    titleFr: 'Les Pronoms Personnels',
    titleAr: 'الضَّمَائِرُ المُنْفَصِلَة',
    summary: 'Les pronoms sujets isolés pour s\'exprimer (Je, Tu, Il, Elle, Nous...).',
    badge: 'Pronoms',
    sections: [
      {
        heading: '1. Les pronoms singuliers',
        explanation: 'Attention : en arabe, le "Tu" distingue le masculin (أَنْتَ) et le féminin (أَنْتِ) !',
        examples: [
          { arabic: 'أَنَا', translit: 'Anā', french: 'Moi / Je' },
          { arabic: 'أَنْتَ', translit: 'Anta', french: 'Toi / Tu (adressé à un homme)' },
          { arabic: 'أَنْتِ', translit: 'Anti', french: 'Toi / Tu (adressé à une femme)' },
          { arabic: 'هُوَ', translit: 'Huwa', french: 'Lui / Il' },
          { arabic: 'هِيَ', translit: 'Hiya', french: 'Elle' },
        ],
      },
      {
        heading: '2. Le pluriel et le duel',
        explanation: 'L\'arabe possède une forme pour deux personnes (le duel هُمَا / أَنْتُمَا) ainsi que le pluriel :',
        examples: [
          { arabic: 'نَحْنُ', translit: 'Naḥnu', french: 'Nous' },
          { arabic: 'أَنْتُمْ', translit: 'Antum', french: 'Vous (pluriel)' },
          { arabic: 'هُمْ', translit: 'Hum', french: 'Eux / Ils' },
          { arabic: 'هُنَّ', translit: 'Hunna', french: 'Elles' },
        ],
      },
    ],
    keyTakeaway: 'Distinction clé : Anta (أَنْتَ) pour un homme, Anti (أَنْتِ) pour une femme.',
  },
  {
    id: 'nominal-sentence',
    titleFr: 'La Phrase Nominale (Sans verbe être)',
    titleAr: 'الجُمْلَةُ الاِسْمِيَّة',
    summary: 'En arabe au présent, le verbe "être" n\'existe pas ! La juxtaposition suffit.',
    badge: 'Syntaxe',
    sections: [
      {
        heading: '1. Le principe du Mubtada\' et Khabar',
        explanation: 'Une phrase nominale se compose de deux éléments fondamentaux : le sujet (المُبْتَدَأ Al-Mubtada\') qui est généralement défini (avec الـ), et l\'information/attribut (الخَبَر Al-Khabar) qui est généralement indéfini. Au présent, aucun verbe "être" n\'est nécessaire.',
        examples: [
          { arabic: 'الكِتَابُ جَدِيدٌ', translit: 'Al-kitābu jadīd', french: 'Le livre [est] nouveau.' },
          { arabic: 'البَيْتُ كَبِيرٌ', translit: 'Al-baytu kabīr', french: 'La maison [est] grande.' },
          { arabic: 'أَنَا طَالِبٌ', translit: 'Anā ṭālib', french: 'Je [suis] étudiant.' },
          { arabic: 'الطَّقْسُ جَمِيلٌ', translit: 'Aṭ-ṭaqsu jamīl', french: 'Le temps [est] beau.' },
        ],
      },
    ],
    keyTakeaway: 'Sujet défini + Adjectif indéfini = une phrase complète sans verbe être !',
  },
  {
    id: 'trilateral-roots',
    titleFr: 'Le Génie des Racines Trilatères',
    titleAr: 'جُذُورُ الكَلِمَاتِ وَالأَوْزَان',
    summary: 'Presque tous les mots arabes dérivent d\'une racine de 3 consonnes porteuses de sens.',
    badge: 'Morphologie profonde',
    sections: [
      {
        heading: '1. Une matrice de trois consonnes',
        explanation: 'En arabe, environ 85% du vocabulaire est construit autour d\'une racine de 3 lettres (جذر). En appliquant des moules vocaliques (أوزان), on génère des dizaines de mots reliés logiquement.',
        examples: [
          { arabic: 'ك-ت-ب', translit: 'K - T - B', french: 'L\'idée d\'écrire, de lier, de fixer' },
          { arabic: 'كَتَبَ', translit: 'Kataba', french: 'Il a écrit (le verbe de base)' },
          { arabic: 'كِتَابٌ', translit: 'Kitāb', french: 'Un livre (ce qui est écrit)' },
          { arabic: 'كَاتِبٌ', translit: 'Kātib', french: 'Un écrivain / auteur' },
          { arabic: 'مَكْتَبٌ', translit: 'Maktab', french: 'Un bureau (le lieu où l\'on écrit)' },
          { arabic: 'مَكْتَبَةٌ', translit: 'Maktabah', french: 'Une bibliothèque / librairie' },
          { arabic: 'مَكْتُوبٌ', translit: 'Maktūb', french: 'Écrit / Le destin' },
        ],
      },
      {
        heading: '2. Autre exemple : la racine D-R-S (د-ر-س)',
        explanation: 'Autour du concept de l\'étude et de l\'apprentissage :',
        examples: [
          { arabic: 'دَرَسَ', translit: 'Darasa', french: 'Il a étudié' },
          { arabic: 'دَرْسٌ', translit: 'Dars', french: 'Une leçon' },
          { arabic: 'مَدْرَسَةٌ', translit: 'Madrasah', french: 'Une école (le lieu où l\'on étudie)' },
          { arabic: 'مُدَرِّسٌ', translit: 'Mudarris', french: 'Un enseignant' },
        ],
      },
    ],
    keyTakeaway: 'Apprenez 1 racine de 3 lettres, et vous devinerez le sens de 10 mots différents !',
  },
  {
    id: 'prepositions',
    titleFr: 'Les Prépositions Courantes',
    titleAr: 'حُرُوفُ الجَرّ',
    summary: 'Dans, vers, sur, de : situer les choses dans l\'espace.',
    badge: 'Grammaire',
    sections: [
      {
        heading: '1. Les prépositions fondamentales',
        explanation: 'Ces petites particules relient les éléments d\'une phrase. Le mot qui les suit prend la marque du cas génitif (Kasra ِ).',
        examples: [
          { arabic: 'فِي', translit: 'Fī', french: 'Dans / En' },
          { arabic: 'إِلَى', translit: 'Ilā', french: 'Vers / À (direction)' },
          { arabic: 'مِنْ', translit: 'Min', french: 'De / En provenance de' },
          { arabic: 'عَلَى', translit: '\'Alā', french: 'Sur' },
        ],
      },
      {
        heading: '2. Exemples en contexte',
        explanation: 'Observez la terminaison en "i" (kasra) du mot qui suit la préposition :',
        examples: [
          { arabic: 'القَلَمُ عَلَى المَكْتَبِ', translit: 'Al-qalamu \'alā l-maktabi', french: 'Le stylo est sur le bureau.' },
          { arabic: 'أَنَا فِي المَدِينَةِ', translit: 'Anā fī l-madīnati', french: 'Je suis dans la ville.' },
          { arabic: 'سَافَرْتُ إِلَى المَطَارِ', translit: 'Sāfartu ilā l-maṭāri', french: 'Je suis allé à l\'aéroport.' },
        ],
      },
    ],
    keyTakeaway: 'Toute préposition place le mot suivant au cas génitif (son "i" final).',
  },
];
