export interface QuizQuestion {
  id: string;
  category: 'alphabet' | 'vocab' | 'grammar' | 'audio';
  questionFr: string;
  arabicPrompt?: string;
  options: {
    id: string;
    text: string;
    subtext?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  tip?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'alphabet',
    questionFr: 'Quelle est la lettre arabe souvent appelée "l\'âme de la langue arabe" car son son est unique au monde ?',
    options: [
      { id: 'o1', text: 'ض (Dad)', subtext: 'Consonne emphatique profonde', isCorrect: true },
      { id: 'o2', text: 'ب (Ba)', subtext: 'Consonne bilabiale', isCorrect: false },
      { id: 'o3', text: 'م (Mim)', subtext: 'Consonne nasale', isCorrect: false },
      { id: 'o4', text: 'ل (Lam)', subtext: 'Consonne liquide', isCorrect: false },
    ],
    explanation: 'L\'arabe est couramment désigné comme « Lughat al-Dad » (لُغَة الضَّاد - la langue du Dad) car le son de la lettre Dad (ض) est quasi-exclusif à la langue arabe.',
  },
  {
    id: 'q2',
    category: 'alphabet',
    questionFr: 'Parmi ces lettres, laquelle NE se connecte JAMAIS avec la lettre qui la suit à sa gauche ?',
    options: [
      { id: 'o1', text: 'ر (Ra)', subtext: 'Lettre non-liante à gauche', isCorrect: true },
      { id: 'o2', text: 'ب (Ba)', subtext: 'Se connecte des deux côtés', isCorrect: false },
      { id: 'o3', text: 'س (Sin)', subtext: 'Se connecte des deux côtés', isCorrect: false },
      { id: 'o4', text: 'ك (Kaf)', subtext: 'Se connecte des deux côtés', isCorrect: false },
    ],
    explanation: 'Les 6 lettres non-liantes à gauche sont : ا (Alif), د (Dal), ذ (Dhal), ر (Ra), ز (Zay) et و (Waw). Elles conservent toujours un petit espace après elles.',
  },
  {
    id: 'q3',
    category: 'vocab',
    questionFr: 'Que signifie l\'expression arabe courante « شُكْرًا جَزِيلًا » (Shukran jazīlan) ?',
    arabicPrompt: 'شُكْرًا جَزِيلًا',
    options: [
      { id: 'o1', text: 'Merci beaucoup', subtext: 'Formule de gratitude', isCorrect: true },
      { id: 'o2', text: 'Au revoir', subtext: 'Salutation de départ', isCorrect: false },
      { id: 'o3', text: 'S\'il vous plaît', subtext: 'Demande polie', isCorrect: false },
      { id: 'o4', text: 'Bonne nuit', subtext: 'Souhait du soir', isCorrect: false },
    ],
    explanation: '« Shukran » signifie merci, et « jazīlan » signifie abondamment ou beaucoup.',
  },
  {
    id: 'q4',
    category: 'grammar',
    questionFr: 'Devant quel type de lettre le "L" de l\'article « Al- » (الـ) s\'assimile-t-il pour devenir muet ?',
    options: [
      { id: 'o1', text: 'Les lettres solaires (الشمسية)', subtext: 'Ex: Ash-Shams, As-Salām', isCorrect: true },
      { id: 'o2', text: 'Les lettres lunaires (القمرية)', subtext: 'Ex: Al-Qamar, Al-Kitāb', isCorrect: false },
      { id: 'o3', text: 'Toutes les voyelles longues', subtext: 'Alif, Waw, Ya', isCorrect: false },
      { id: 'o4', text: 'Uniquement la lettre Hamza', subtext: 'Support de son', isCorrect: false },
    ],
    explanation: 'Devant les 14 lettres solaires (dentales et sifflantes), le "L" s\'assimile et la lettre suivante est redoublée par une Shaddah (ex: الشَّمْس ash-shams).',
  },
  {
    id: 'q5',
    category: 'grammar',
    questionFr: 'Quelle est la racine trilatère commune aux mots « كَتَبَ » (il a écrit), « كِتَاب » (livre) et « مَكْتَبَة » (bibliothèque) ?',
    options: [
      { id: 'o1', text: 'ك - ت - ب (K - T - B)', subtext: 'Racine liée à l\'écriture', isCorrect: true },
      { id: 'o2', text: 'د - ر - س (D - R - S)', subtext: 'Racine liée à l\'étude', isCorrect: false },
      { id: 'o3', text: 'ع - ل - م (\' - L - M)', subtext: 'Racine liée au savoir', isCorrect: false },
      { id: 'o4', text: 'ق - ر - أ (Q - R - \')', subtext: 'Racine liée à la lecture', isCorrect: false },
    ],
    explanation: 'En arabe, presque tous les mots sont dérivés d\'une racine de 3 lettres. La racine ك-ت-ب (K-T-B) englobe tout ce qui a trait à l\'action d\'écrire et aux objets écrits.',
  },
  {
    id: 'q6',
    category: 'vocab',
    questionFr: 'Comment dit-on « La Paix » en langue arabe ?',
    options: [
      { id: 'o1', text: 'السَّلَام (As-Salām)', subtext: 'Nom dérivé de la racine S-L-M', isCorrect: true },
      { id: 'o2', text: 'الكِتَاب (Al-Kitāb)', subtext: 'Le livre', isCorrect: false },
      { id: 'o3', text: 'المَاء (Al-Mā\')', subtext: 'L\'eau', isCorrect: false },
      { id: 'o4', text: 'الصَّبَاح (Aṣ-Ṣabāḥ)', subtext: 'Le matin', isCorrect: false },
    ],
    explanation: '« As-Salām » signifie la paix, la sérénité et la sauvegarde. C\'est aussi l\'un des plus beaux noms dans la culture arabe.',
  },
  {
    id: 'q7',
    category: 'grammar',
    questionFr: 'En arabe au présent, comment traduit-on : « Le livre est beau » ?',
    options: [
      { id: 'o1', text: 'الكِتَابُ جَمِيلٌ', subtext: 'Al-kitābu jamīl (phrase nominale sans verbe)', isCorrect: true },
      { id: 'o2', text: 'الكِتَابُ يَكُونُ جَمِيلٌ', subtext: 'Emploi superflu du verbe kāna', isCorrect: false },
      { id: 'o3', text: 'كِتَابٌ الجَمِيلُ', subtext: 'Inversion agrammaticale', isCorrect: false },
      { id: 'o4', text: 'هُوَ كِتَابٌ جَمِيلٌ', subtext: 'C\'est un beau livre', isCorrect: false },
    ],
    explanation: 'La phrase nominale arabe ne requiert aucun verbe au présent. Il suffit d\'associer un sujet défini (الكتابُ) avec un attribut indéfini (جميلٌ).',
  },
  {
    id: 'q8',
    category: 'alphabet',
    questionFr: 'Quelle est la différence fondamentale entre la lettre ح (Ha guttural) et la lettre ه (Ha doux) ?',
    options: [
      { id: 'o1', text: 'ح vient du fond de la gorge (souffle rauque), alors que ه est un simple souffle d\'air léger', subtext: 'Point d\'articulation (Makhraj)', isCorrect: true },
      { id: 'o2', text: 'Ce sont exactement les mêmes lettres écrites différemment', subtext: 'Faux', isCorrect: false },
      { id: 'o3', text: 'ح est une voyelle alors que ه est une consonne', subtext: 'Les deux sont des consonnes', isCorrect: false },
      { id: 'o4', text: 'ح se prononce "ch"', subtext: 'C\'est la lettre Shin (ش)', isCorrect: false },
    ],
    explanation: 'La lettre ح (Ha) a son point d\'articulation au milieu de la gorge (comme pour faire de la buée sur un miroir), tandis que ه (Ha) se prononce tout en douceur depuis le fond de la poitrine (comme "hello").',
  },
];
