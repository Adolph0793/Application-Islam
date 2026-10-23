export interface VocabWord {
  id: string;
  arabic: string;
  translit: string;
  french: string;
  category: string;
  level: 'debutant' | 'intermediaire';
  examplePhrase?: {
    ar: string;
    translit: string;
    fr: string;
  };
}

export interface VocabCategory {
  id: string;
  nameFr: string;
  nameAr: string;
  iconName: string;
  description: string;
  words: VocabWord[];
}

export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: 'greetings',
    nameFr: 'Salutations & Politesse',
    nameAr: 'التَّحِيَّاتُ وَالمُجَامَلَات',
    iconName: 'Handshake',
    description: 'Les formules essentielles pour engager la conversation avec respect.',
    words: [
      {
        id: 'g1',
        arabic: 'مَرْحَبًا',
        translit: 'Marḥaban',
        french: 'Bonjour / Bienvenue',
        category: 'greetings',
        level: 'debutant',
        examplePhrase: {
          ar: 'مَرْحَبًا، كَيْفَ حَالُكَ؟',
          translit: 'Marḥaban, kayfa ḥāluk?',
          fr: 'Bonjour, comment vas-tu ?',
        },
      },
      {
        id: 'g2',
        arabic: 'السَّلَامُ عَلَيْكُمْ',
        translit: 'As-salāmu \'alaykum',
        french: 'Que la paix soit sur vous (Salutation universelle)',
        category: 'greetings',
        level: 'debutant',
        examplePhrase: {
          ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ',
          translit: 'As-salāmu \'alaykum wa raḥmatu Llāh',
          fr: 'Que la paix et la miséricorde de Dieu soient sur vous',
        },
      },
      {
        id: 'g3',
        arabic: 'وَعَلَيْكُمُ السَّلَام',
        translit: 'Wa \'alaykumu s-salām',
        french: 'Et sur vous la paix (Réponse)',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g4',
        arabic: 'شُكْرًا جَزِيلًا',
        translit: 'Shukran jazīlan',
        french: 'Merci beaucoup',
        category: 'greetings',
        level: 'debutant',
        examplePhrase: {
          ar: 'شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكَ',
          translit: 'Shukran jazīlan \'alā musā\'adatika',
          fr: 'Merci beaucoup pour ton aide',
        },
      },
      {
        id: 'g5',
        arabic: 'عَفْوًا',
        translit: '\'Afwan',
        french: 'De rien / Je vous en prie / Pardon',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g6',
        arabic: 'مَعَ السَّلَامَة',
        translit: 'Ma\'a s-salāmah',
        french: 'Au revoir (Partez avec la paix)',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g7',
        arabic: 'مِنْ فَضْلِكَ',
        translit: 'Min faḍlik',
        french: 'S\'il te plaît / S\'il vous plaît',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g8',
        arabic: 'صَبَاحُ الخَيْر',
        translit: 'Ṣabāḥu l-khayr',
        french: 'Bonjour (littéralement : matin de bien)',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g9',
        arabic: 'مَسَاءُ الخَيْر',
        translit: 'Masā\'u l-khayr',
        french: 'Bonsoir',
        category: 'greetings',
        level: 'debutant',
      },
      {
        id: 'g10',
        arabic: 'تَشَرَّفْنَا',
        translit: 'Tasharrafnā',
        french: 'Enchanté de faire votre connaissance',
        category: 'greetings',
        level: 'debutant',
      },
    ],
  },
  {
    id: 'numbers',
    nameFr: 'Les Chiffres & Nombres',
    nameAr: 'الأَرْقَامُ وَالأَعْدَاد',
    iconName: 'Hash',
    description: 'De 0 à 10 et dizaines avec les chiffres orientaux (١، ٢، ٣...).',
    words: [
      { id: 'n0', arabic: 'صِفْرٌ (٠)', translit: 'Ṣifr (0)', french: 'Zéro (origine du mot chiffre)', category: 'numbers', level: 'debutant' },
      { id: 'n1', arabic: 'وَاحِدٌ (١)', translit: 'Wāḥid (1)', french: 'Un', category: 'numbers', level: 'debutant' },
      { id: 'n2', arabic: 'اِثْنَانِ (٢)', translit: 'Ithnān (2)', french: 'Deux', category: 'numbers', level: 'debutant' },
      { id: 'n3', arabic: 'ثَلَاثَةٌ (٣)', translit: 'Thalāthah (3)', french: 'Trois', category: 'numbers', level: 'debutant' },
      { id: 'n4', arabic: 'أَرْبَعَةٌ (٤)', translit: 'Arba\'ah (4)', french: 'Quatre', category: 'numbers', level: 'debutant' },
      { id: 'n5', arabic: 'خَمْسَةٌ (٥)', translit: 'Khamsah (5)', french: 'Cinq', category: 'numbers', level: 'debutant' },
      { id: 'n6', arabic: 'سِتَّةٌ (٦)', translit: 'Sittah (6)', french: 'Six', category: 'numbers', level: 'debutant' },
      { id: 'n7', arabic: 'سَبْعَةٌ (٧)', translit: 'Sab\'ah (7)', french: 'Sept', category: 'numbers', level: 'debutant' },
      { id: 'n8', arabic: 'ثَمَانِيَةٌ (٨)', translit: 'Thamāniyah (8)', french: 'Huit', category: 'numbers', level: 'debutant' },
      { id: 'n9', arabic: 'تِسْعَةٌ (٩)', translit: 'Tis\'ah (9)', french: 'Neuf', category: 'numbers', level: 'debutant' },
      { id: 'n10', arabic: 'عَشَرَةٌ (١٠)', translit: '\'Asharah (10)', french: 'Dix', category: 'numbers', level: 'debutant' },
      { id: 'n20', arabic: 'عِشْرُونَ (٢٠)', translit: '\'Ishrūn (20)', french: 'Vingt', category: 'numbers', level: 'debutant' },
      { id: 'n100', arabic: 'مِئَةٌ (١٠٠)', translit: 'Mi\'ah (100)', french: 'Cent', category: 'numbers', level: 'intermediaire' },
    ],
  },
  {
    id: 'family',
    nameFr: 'La Famille & Relations',
    nameAr: 'العَائِلَةُ وَالأَقَارِب',
    iconName: 'Users',
    description: 'Les membres de la famille et les termes de parenté.',
    words: [
      { id: 'f1', arabic: 'أَبٌ / وَالِدٌ', translit: 'Ab / Wālid', french: 'Père', category: 'family', level: 'debutant' },
      { id: 'f2', arabic: 'أُمٌّ / وَالِدَةٌ', translit: 'Umm / Wālidah', french: 'Mère', category: 'family', level: 'debutant' },
      { id: 'f3', arabic: 'أَخٌ', translit: 'Akh', french: 'Frère', category: 'family', level: 'debutant' },
      { id: 'f4', arabic: 'أُخْتٌ', translit: 'Ukht', french: 'Sœur', category: 'family', level: 'debutant' },
      { id: 'f5', arabic: 'اِبْنٌ', translit: 'Ibn', french: 'Fils', category: 'family', level: 'debutant' },
      { id: 'f6', arabic: 'بِنْتٌ', translit: 'Bint', french: 'Fille', category: 'family', level: 'debutant' },
      { id: 'f7', arabic: 'جَدٌّ', translit: 'Jadd', french: 'Grand-père', category: 'family', level: 'debutant' },
      { id: 'f8', arabic: 'جَدَّةٌ', translit: 'Jaddah', french: 'Grand-mère', category: 'family', level: 'debutant' },
      { id: 'f9', arabic: 'صَدِيقٌ', translit: 'Ṣadīq', french: 'Ami', category: 'family', level: 'debutant' },
      { id: 'f10', arabic: 'صَدِيقَةٌ', translit: 'Ṣadīqah', french: 'Amie', category: 'family', level: 'debutant' },
    ],
  },
  {
    id: 'food',
    nameFr: 'Nourriture & Au Restaurant',
    nameAr: 'الطَّعَامُ وَالشَّرَاب',
    iconName: 'Utensils',
    description: 'Commander à manger, ingrédients et boissons typiques.',
    words: [
      { id: 'fd1', arabic: 'مَاءٌ', translit: 'Mā\'', french: 'Eau', category: 'food', level: 'debutant' },
      { id: 'fd2', arabic: 'شَايٌ', translit: 'Shāy', french: 'Thé', category: 'food', level: 'debutant' },
      { id: 'fd3', arabic: 'قَهْوَةٌ', translit: 'Qahwah', french: 'Café (origine du mot café)', category: 'food', level: 'debutant' },
      { id: 'fd4', arabic: 'خُبْزٌ', translit: 'Khubz', french: 'Pain', category: 'food', level: 'debutant' },
      { id: 'fd5', arabic: 'لَحْمٌ', translit: 'Laḥm', french: 'Viande', category: 'food', level: 'debutant' },
      { id: 'fd6', arabic: 'سَمَكٌ', translit: 'Samak', french: 'Poisson', category: 'food', level: 'debutant' },
      { id: 'fd7', arabic: 'فَاكِهَةٌ', translit: 'Fākihah', french: 'Fruit', category: 'food', level: 'debutant' },
      { id: 'fd8', arabic: 'خُضْرَاوَاتٌ', translit: 'Khuḍrāwāt', french: 'Légumes', category: 'food', level: 'intermediaire' },
      { id: 'fd9', arabic: 'مَطْعَمٌ', translit: 'Maṭ\'am', french: 'Restaurant', category: 'food', level: 'debutant' },
      { id: 'fd10', arabic: 'حِسَابٌ', translit: 'Ḥisāb', french: 'L\'addition / La note', category: 'food', level: 'debutant' },
    ],
  },
  {
    id: 'travel',
    nameFr: 'Ville & Déplacements',
    nameAr: 'المَدِينَةُ وَالسَّفَر',
    iconName: 'Compass',
    description: 'S\'orienter dans la ville, poser des questions et voyager.',
    words: [
      { id: 't1', arabic: 'مَدِينَةٌ', translit: 'Madīnah', french: 'Ville', category: 'travel', level: 'debutant' },
      { id: 't2', arabic: 'شَارِعٌ', translit: 'Shāri\'', french: 'Rue / Avenue', category: 'travel', level: 'debutant' },
      { id: 't3', arabic: 'فُنْدُقٌ', translit: 'Funduq', french: 'Hôtel', category: 'travel', level: 'debutant' },
      { id: 't4', arabic: 'مَطَارٌ', translit: 'Maṭār', french: 'Aéroport', category: 'travel', level: 'debutant' },
      { id: 't5', arabic: 'سَفِينَةٌ', translit: 'Safīnah', french: 'Navire / Bateau', category: 'travel', level: 'debutant' },
      { id: 't6', arabic: 'سَيَّارَةٌ', translit: 'Sayyārah', french: 'Voiture', category: 'travel', level: 'debutant' },
      { id: 't7', arabic: 'أَيْنَ...؟', translit: 'Ayna...?', french: 'Où est... ?', category: 'travel', level: 'debutant' },
      { id: 't8', arabic: 'يَمِينٌ', translit: 'Yamīn', french: 'Droite', category: 'travel', level: 'debutant' },
      { id: 't9', arabic: 'يَسَارٌ', translit: 'Yasār', french: 'Gauche', category: 'travel', level: 'debutant' },
      { id: 't10', arabic: 'قَرِيبٌ / بَعِيدٌ', translit: 'Qarīb / Ba\'īd', french: 'Proche / Loin', category: 'travel', level: 'debutant' },
    ],
  },
  {
    id: 'colors',
    nameFr: 'Couleurs & Descriptions',
    nameAr: 'الأَلْوَانُ وَالصِّفَات',
    iconName: 'Palette',
    description: 'Décrire le monde qui nous entoure.',
    words: [
      { id: 'c1', arabic: 'أَبْيَضُ (م) / بَيْضَاءُ (ف)', translit: 'Abyaḍ / Bayḍā\'', french: 'Blanc / Blanche', category: 'colors', level: 'debutant' },
      { id: 'c2', arabic: 'أَسْوَدُ (م) / سَوْدَاءُ (ف)', translit: 'Aswad / Sawdā\'', french: 'Noir / Noire', category: 'colors', level: 'debutant' },
      { id: 'c3', arabic: 'أَحْمَرُ (م) / حَمْرَاءُ (ف)', translit: 'Aḥmar / Ḥamrā\'', french: 'Rouge', category: 'colors', level: 'debutant' },
      { id: 'c4', arabic: 'أَزْرَقُ (م) / زَرْقَاءُ (ف)', translit: 'Azraq / Zarqā\'', french: 'Bleu / Bleue', category: 'colors', level: 'debutant' },
      { id: 'c5', arabic: 'أَخْضَرُ (م) / خَضْرَاءُ (ف)', translit: 'Akhḍar / Khaḍrā\'', french: 'Vert / Verte', category: 'colors', level: 'debutant' },
      { id: 'c6', arabic: 'أَصْفَرُ (م) / صَفْرَاءُ (ف)', translit: 'Aṣfar / Ṣafrā\'', french: 'Jaune', category: 'colors', level: 'debutant' },
      { id: 'c7', arabic: 'كَبِيرٌ', translit: 'Kabīr', french: 'Grand', category: 'colors', level: 'debutant' },
      { id: 'c8', arabic: 'صَغِيرٌ', translit: 'Ṣaghīr', french: 'Petit', category: 'colors', level: 'debutant' },
      { id: 'c9', arabic: 'جَمِيلٌ', translit: 'Jamīl', french: 'Beau / Joli', category: 'colors', level: 'debutant' },
      { id: 'c10', arabic: 'جَدِيدٌ', translit: 'Jadīd', french: 'Nouveau', category: 'colors', level: 'debutant' },
    ],
  },
];
