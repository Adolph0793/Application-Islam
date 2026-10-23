// Complete Islamic Studies Data: Azan, Iqama, Ibada (5 Pillars, 6 Articles of Faith, Wudu, Salat step-by-step), and Duas (Hisn al-Muslim)
// All texts with full Arabic vocalization (Tashkeel), phonetic transliteration, French translation, and authentic Malagasy translation (teny Malagasy).

export interface IslamicPhrase {
  id: string;
  arabic: string;
  phonetic: string;
  french: string;
  malagasy: string;
  repeat?: number;
  note?: string;
  audioText?: string;
}

export interface AdhanSection {
  title: string;
  malagasyTitle: string;
  description: string;
  malagasyDescription: string;
  phrases: IslamicPhrase[];
}

export interface DuaItem {
  id: string;
  title: string;
  malagasyTitle: string;
  category: 'morning_evening' | 'sleep' | 'food' | 'home_mosque' | 'parents' | 'health_protection' | 'distress_forgiveness' | 'travel_istikhara';
  arabic: string;
  phonetic: string;
  french: string;
  malagasy: string;
  context: string;
  malagasyContext: string;
  reference?: string;
  repeatCount?: number;
}

export interface PillarItem {
  id: string;
  number: number;
  arabicName: string;
  phoneticName: string;
  frenchName: string;
  malagasyName: string;
  summaryFrench: string;
  summaryMalagasy: string;
  detailsFrench: string[];
  detailsMalagasy: string[];
  keyVersesOrPhrases?: IslamicPhrase[];
}

export interface FaithArticle {
  number: number;
  arabicName: string;
  phoneticName: string;
  frenchName: string;
  malagasyName: string;
  explanationFrench: string;
  explanationMalagasy: string;
}

export interface WuduStep {
  step: number;
  arabicName: string;
  frenchTitle: string;
  malagasyTitle: string;
  frenchInstruction: string;
  malagasyInstruction: string;
  dua?: IslamicPhrase;
  isObligatory: boolean;
}

export interface SalatStep {
  step: number;
  arabicName: string;
  frenchTitle: string;
  malagasyTitle: string;
  postureDescriptionFrench: string;
  postureDescriptionMalagasy: string;
  arabicFormula: string;
  phoneticFormula: string;
  frenchFormula: string;
  malagasyFormula: string;
  repetitions?: string;
}

// ----------------------------------------------------
// 1. AZAN (ADHAN) & IKAMA (IQAMA)
// ----------------------------------------------------

export const AZAN_DATA: IslamicPhrase[] = [
  {
    id: 'azan-1',
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ',
    phonetic: 'Allāhu Akbar, Allāhu Akbar',
    french: 'Allah est le Plus Grand, Allah est le Plus Grand.',
    malagasy: 'I Allah no Lehibe indrindra, I Allah no Lehibe indrindra.',
    repeat: 2,
    note: 'Répété deux fois (au total 4 fois au début).'
  },
  {
    id: 'azan-2',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ',
    phonetic: 'Ash-hadu allā ilāha illallāh',
    french: "J'atteste qu'il n'y a de divinité digne d'adoration qu'Allah.",
    malagasy: "Manambara aho fa tsy misy andriamanitra mendrika hivavahana afa-tsy i Allah.",
    repeat: 2,
    note: 'Répété deux fois.'
  },
  {
    id: 'azan-3',
    arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    phonetic: 'Ash-hadu anna Muhammadan Rasūlullāh',
    french: "J'atteste que Muhammad est le Messager d'Allah.",
    malagasy: "Manambara aho fa i Muhammad dia Irany i Allah.",
    repeat: 2,
    note: 'Répété deux fois.'
  },
  {
    id: 'azan-4',
    arabic: 'حَيَّ عَلَى الصَّلَاةِ',
    phonetic: 'Hayya ‘alas-Salāh',
    french: 'Venez à la prière !',
    malagasy: 'Avia amin’ny vavaka !',
    repeat: 2,
    note: 'Répété deux fois en tournant légèrement la tête vers la droite.'
  },
  {
    id: 'azan-5',
    arabic: 'حَيَّ عَلَى الْفَلَاحِ',
    phonetic: 'Hayya ‘alal-Falāh',
    french: 'Venez au succès et au salut !',
    malagasy: 'Avia amin’ny fahombiazana sy famonjena !',
    repeat: 2,
    note: 'Répété deux fois en tournant légèrement la tête vers la gauche.'
  },
  {
    id: 'azan-fajr-extra',
    arabic: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ',
    phonetic: 'As-Salātu khayrum-minan-nawm',
    french: 'La prière est meilleure que le sommeil ! (Uniquement pour le Fajr)',
    malagasy: 'Ny vavaka dia tsara kokoa noho ny torimaso ! (Amin’ny vavaka maraina Fajr ihany)',
    repeat: 2,
    note: 'Ajouté uniquement lors de l’appel de l’aube (Salat al-Fajr).'
  },
  {
    id: 'azan-6',
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ',
    phonetic: 'Allāhu Akbar, Allāhu Akbar',
    french: 'Allah est le Plus Grand, Allah est le Plus Grand.',
    malagasy: 'I Allah no Lehibe indrindra, I Allah no Lehibe indrindra.',
    repeat: 1
  },
  {
    id: 'azan-7',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    phonetic: 'Lā ilāha illallāh',
    french: "Il n'y a de divinité digne d'adoration qu'Allah.",
    malagasy: "Tsy misy andriamanitra mendrika hivavahana afa-tsy i Allah.",
    repeat: 1
  }
];

export const IQAMA_DATA: IslamicPhrase[] = [
  {
    id: 'iqama-1',
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ',
    phonetic: 'Allāhu Akbar, Allāhu Akbar',
    french: 'Allah est le Plus Grand, Allah est le Plus Grand.',
    malagasy: 'I Allah no Lehibe indrindra, I Allah no Lehibe indrindra.',
    repeat: 1
  },
  {
    id: 'iqama-2',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ',
    phonetic: 'Ash-hadu allā ilāha illallāh',
    french: "J'atteste qu'il n'y a de divinité qu'Allah.",
    malagasy: "Manambara aho fa tsy misy andriamanitra afa-tsy i Allah.",
    repeat: 1
  },
  {
    id: 'iqama-3',
    arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    phonetic: 'Ash-hadu anna Muhammadan Rasūlullāh',
    french: "J'atteste que Muhammad est le Messager d'Allah.",
    malagasy: "Manambara aho fa i Muhammad dia Irany i Allah.",
    repeat: 1
  },
  {
    id: 'iqama-4',
    arabic: 'حَيَّ عَلَى الصَّلَاةِ',
    phonetic: 'Hayya ‘alas-Salāh',
    french: 'Venez à la prière !',
    malagasy: 'Avia amin’ny vavaka !',
    repeat: 1
  },
  {
    id: 'iqama-5',
    arabic: 'حَيَّ عَلَى الْفَلَاحِ',
    phonetic: 'Hayya ‘alal-Falāh',
    french: 'Venez au succès !',
    malagasy: 'Avia amin’ny fahombiazana !',
    repeat: 1
  },
  {
    id: 'iqama-6',
    arabic: 'قَدْ قَامَتِ الصَّلَاةُ ، قَدْ قَامَتِ الصَّلَاةُ',
    phonetic: 'Qad qāmatis-Salāh, Qad qāmatis-Salāh',
    french: 'La prière est sur le point de débuter, la prière commence !',
    malagasy: 'Efa hitsangana ny vavaka, efa manomboka ny vavaka !',
    repeat: 1,
    note: 'Signale l’alignement des rangs pour accomplir la prière.'
  },
  {
    id: 'iqama-7',
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ',
    phonetic: 'Allāhu Akbar, Allāhu Akbar',
    french: 'Allah est le Plus Grand, Allah est le Plus Grand.',
    malagasy: 'I Allah no Lehibe indrindra, I Allah no Lehibe indrindra.',
    repeat: 1
  },
  {
    id: 'iqama-8',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    phonetic: 'Lā ilāha illallāh',
    french: "Il n'y a de divinité digne d'adoration qu'Allah.",
    malagasy: "Tsy misy andriamanitra mendrika hivavahana afa-tsy i Allah.",
    repeat: 1
  }
];

export const DUA_AFTER_ADHAN: IslamicPhrase = {
  id: 'dua-after-adhan',
  arabic: 'اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ ، وَالصَّلَاةِ الْقَائِمَةِ ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
  phonetic: 'Allāhumma Rabba hādhihid-da‘watit-tāmmah, was-salātil-qā’imah, āti Muhammadan al-wasīlata wal-fadīlah, wab‘ath-hu maqāmam-mahmūdanil-ladhī wa‘adtah.',
  french: "Ô Allah, Seigneur de cet appel parfait et de cette prière accomplie, accorde à Muhammad le rang suprême d'intercession et l'éminente noblesse, et ressuscite-le au rang glorieux que Tu lui as promis.",
  malagasy: "Ry Allah, Tompon’ity antso lavorary ity sy ny vavaka hotanterahina, omeo an’i Muhammad ny voninahitra ambony indrindra sy ny tombontsoa lehibe, ary atsangano izy amin’ilay toeran-kafaliana sy mendrika nampanantenainao azy.",
  note: 'Rapporté par Al-Boukhari. Celui qui le récite mérite l’intercession du Prophète ﷺ le Jour du Jugement.'
};

// ----------------------------------------------------
// 2. LES 5 PILIERS DE L'ISLAM (IBADA)
// ----------------------------------------------------

export const FIVE_PILLARS: PillarItem[] = [
  {
    number: 1,
    id: 'pillar-shahada',
    arabicName: 'الشَّهَادَتَانِ',
    phoneticName: 'Ash-Shahādatān',
    frenchName: 'La Profession de foi (Chahada)',
    malagasyName: 'Ny Fanekem-pinoana (Shahada)',
    summaryFrench: "La déclaration sincère qu'il n'y a de divinité qu'Allah et que Muhammad est Son serviteur et Messager.",
    summaryMalagasy: "Ny fanambarana amim-pahatsorana fa tsy misy andriamanitra afa-tsy i Allah ary i Muhammad no Mpanompony sy Irany.",
    detailsFrench: [
      "Fondement premier sans lequel aucune œuvre n'est acceptée.",
      "Comprend l'affirmation de l'unicité d'Allah (Tawhid) et le suivi exclusif du Prophète Muhammad ﷺ.",
      "Se prononce avec foi, certitude, sincérité et amour dans le cœur."
    ],
    detailsMalagasy: [
      "Fototra voalohany amin’ny finoana Silamo izay tsy ekena ny asa rehetra raha tsy misy azy.",
      "Misy ny fanekena ny maha-tokana an’i Allah (Tawhid) sy ny fanarahana ny Mpaminany Muhammad ﷺ.",
      "Tononina am-pahatokiana, fahatsorana ary fitiavana ao am-po."
    ],
    keyVersesOrPhrases: [
      {
        id: 'shahada-text',
        arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
        phonetic: 'Ash-hadu allā ilāha illallāh, wa ash-hadu anna Muhammadan rasūlullāh.',
        french: "J'atteste qu'il n'y a de dieu qu'Allah et j'atteste que Muhammad est le messager d'Allah.",
        malagasy: "Manambara aho fa tsy misy andriamanitra mendrika hivavahana afa-tsy i Allah, ary manambara aho fa i Muhammad dia Irany i Allah."
      }
    ]
  },
  {
    number: 2,
    id: 'pillar-salat',
    arabicName: 'الصَّلَاة',
    phoneticName: 'As-Salāt',
    frenchName: 'Les Cinq Prières quotidiennes',
    malagasyName: 'Ny Vavaka 5 fotoana isan’andro',
    summaryFrench: "Le pilier fondamental reliant quotidiennement le croyant à son Créateur à cinq moments précis.",
    summaryMalagasy: "Andry lehibe mampitohy ny mpino amin’ny Mpahary azy isan’andro amin’ny fotoana 5 voatondro.",
    detailsFrench: [
      "1. Al-Fajr (Aube) : 2 rak'ahs obligatoires (à voix haute).",
      "2. Ad-Dhuhr (Midi) : 4 rak'ahs obligatoires (à voix basse).",
      "3. Al-'Asr (Après-midi) : 4 rak'ahs obligatoires (à voix basse).",
      "4. Al-Maghrib (Coucher du soleil) : 3 rak'ahs obligatoires (2 à voix haute, 1 à voix basse).",
      "5. Al-'Isha (Nuit) : 4 rak'ahs obligatoires (2 à voix haute, 2 à voix basse)."
    ],
    detailsMalagasy: [
      "1. Al-Fajr (Maraina vao mangiran-dratsy) : Raka'ah 2 terena (vakiana mafy).",
      "2. Ad-Dhuhr (Midi atoandro) : Raka'ah 4 terena (vakiana moramora).",
      "3. Al-'Asr (Tolakandro) : Raka'ah 4 terena (vakiana moramora).",
      "4. Al-Maghrib (Filentehan’ny masoandro) : Raka'ah 3 terena (2 mafy, 1 moramora).",
      "5. Al-'Isha (Alina) : Raka'ah 4 terena (2 mafy, 2 moramora)."
    ]
  },
  {
    number: 3,
    id: 'pillar-zakat',
    arabicName: 'الزَّكَاة',
    phoneticName: 'Az-Zakāt',
    frenchName: "L'Aumône légale purificatrice",
    malagasyName: 'Ny Fandoavana Zakat (Fiantrana ara-dalàna)',
    summaryFrench: "Prélèvement obligatoire de 2,5 % par an sur l'épargne stagnante au-delà du seuil (Nissab) redistribué aux nécessiteux.",
    summaryMalagasy: "Fandoavana 2,5 % isan-taona amin’ny harena mihoatra ny fetra (Nissab) hozaraina amin’ireo mahantra sy sahirana.",
    detailsFrench: [
      "Purifie l'âme de l'avarice et bénit les biens matériels.",
      "Renforce la solidarité sociale et réduit les inégalités au sein de la communauté.",
      "Destinée aux pauvres, indigents, convertis récents, endettés et voyageurs en détresse."
    ],
    detailsMalagasy: [
      "Manadio ny fanahy amin’ny fitiavan-karena tafahoatra ary mitondra fitahiana amin’ny fananana.",
      "Manamafy ny fifanampiana sy mampihena ny elanelana eo amin’ny manan-karena sy ny sahirana.",
      "Omena ny mahantra, ny tsy manan-kialofana, ny bokan-trosa ary ny mpivahiny sahirana."
    ]
  },
  {
    number: 4,
    id: 'pillar-sawm',
    arabicName: 'الصَّوْم',
    phoneticName: 'As-Sawm',
    frenchName: 'Le Jeûne du mois de Ramadan',
    malagasyName: 'Ny Fifehezana (Karemy) amin’ny volana Ramadany',
    summaryFrench: "Abstention de nourriture, boisson et plaisirs charnels de l'aube jusqu'au coucher du soleil avec intention pure.",
    summaryMalagasy: "Fadiana ny fihinanana, fisotroana ary ny firaisana ara-nofo manomboka vao mangiran-dratsy ka hatramin’ny filentehan’ny masoandro.",
    detailsFrench: [
      "Développe la piété (Taqwa), la maîtrise de soi et l'empathie envers ceux qui ont faim.",
      "Obligatoire pour tout musulman pubère, sain d'esprit et en capacité physique.",
      "Comprend le repas de l'aube (Souhour) et la rupture au crépuscule (Iftar) traditionnellement avec des dattes et de l'eau."
    ],
    detailsMalagasy: [
      "Mampitombo ny tahotra an’i Allah (Taqwa), ny fifehezan-tena ary ny fiaraha-miory amin’ny noana.",
      "Adidy ho an’ny silamo rehetra efa lehibe, salama saina sy vatana.",
      "Misy ny sakafo maraina alohan’ny aube (Souhour) sy ny fisokafana amin’ny hariva (Iftar) amin’ny daty sy rano."
    ],
    keyVersesOrPhrases: [
      {
        id: 'dua-iftar',
        arabic: 'ذَهَبَ الظَّمَأُ ، وَابْتَلَّتِ الْعُرُوقُ ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
        phonetic: 'Dhahabadh-dhama’u, wabtallatil-‘urūqu, wa thabatal-ajru inshā’allāh.',
        french: "La soif est étanchée, les veines sont humectées et la récompense est assurée si Allah le veut.",
        malagasy: "Afaka ny hetaheta, lena ny lalan-drà, ary azo antoka ny valisoa raha sitrak’i Allah."
      }
    ]
  },
  {
    number: 5,
    id: 'pillar-hajj',
    arabicName: 'الحَجّ',
    phoneticName: 'Al-Hajj',
    frenchName: 'Le Pèlerinage à La Mecque',
    malagasyName: 'Ny Fivahiniana masina any La Mecque',
    summaryFrench: "Pèlerinage rituel à accomplir au moins une fois dans la vie pour qui en a la capacité financière et physique.",
    summaryMalagasy: "Dia masina tsy maintsy tanterahina indray mandeha amin’ny fiainana ho an’izay manana fahafahana ara-bola sy ara-pahasalamana.",
    detailsFrench: [
      "A lieu au cours du douzième mois lunaire (Dhou al-Hijja).",
      "Rites majeurs : port du vêtement blanc (Ihram), tours de la Kaaba (Tawaf), marche entre Safa et Marwa (Sa'y), station au mont Arafat et lapidation symbolique des stèles à Mina.",
      "Symbolise l'égalité absolue de tous les humains devant Dieu."
    ],
    detailsMalagasy: [
      "Tanterahina amin’ny volana faha-12 amin’ny tetiandro silamo (Dhou al-Hijja).",
      "Fomba fanao : fanaovana lamba fotsy (Ihram), fihodinana ny Kaaba (Tawaf), fandehanana eo anelanelan’i Safa sy Marwa (Sa'y), ary fijanonana ao Arafat.",
      "Maneho ny fitoviana tanteraka eo anatrehan’i Allah ho an’ny olombelona rehetra."
    ],
    keyVersesOrPhrases: [
      {
        id: 'talbiyah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ ، لَا شَرِيكَ لَكَ',
        phonetic: 'Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, innal-hamda wan-ni‘mata laka wal-mulk, lā sharīka lak.',
        french: "Me voici, ô Allah, me voici ! Tu n'as aucun associé, me voici ! Certes la louange, les bienfaits et la royauté T'appartiennent, Tu n'as point d'associé.",
        malagasy: "Inty aho, ry Allah, inty aho ! Tsy misy mpiombona Aminao, inty aho ! Tena Anao tokoa ny fiderana, ny fahasoavana ary ny fanjakana, tsy manana mpiombona Ianao."
      }
    ]
  }
];

// ----------------------------------------------------
// 3. LES 6 PILIERS DE LA FOI (AL-IMAN)
// ----------------------------------------------------

export const SIX_PILLARS_IMAN: FaithArticle[] = [
  {
    number: 1,
    arabicName: 'الإِيمَانُ بِاللَّهِ',
    phoneticName: 'Al-Īmānu billāh',
    frenchName: 'La foi en Allah l’Unique',
    malagasyName: 'Ny Finoana an’i Allah Tokana',
    explanationFrench: "Croire fermement en Son existence, Sa seigneurie absolue, Son droit exclusif à l'adoration et en Ses Noms et Attributs sublimes sans ressemblance ni altération.",
    explanationMalagasy: "Mino tsy amim-pisalasalana ny fisiany, ny fanapahany fara-tampony, ny zony tokana amin’ny fivavahana, ary ireo Anarany sy Toetrany mendrika indrindra."
  },
  {
    number: 2,
    arabicName: 'الإِيمَانُ بِالْمَلَائِكَةِ',
    phoneticName: 'Al-Īmānu bil-Malā’ikah',
    frenchName: 'La foi aux Anges bienveillants',
    malagasyName: 'Ny Finoana ireo Anjely Masina',
    explanationFrench: "Croire en ces créatures de lumière nobles et obéissantes qui exécutent fidèlement les ordres divins (Jibril/Gabriel porteur de la révélation, Mikail, Israfil, etc.).",
    explanationMalagasy: "Mino ireo zavaboary noforonina tamin’ny hazavana, madio sy mpankato tanteraka ny baikon’i Allah (toy an’i Jibril nitondra ny Soratra Masina, Mikail, sns)."
  },
  {
    number: 3,
    arabicName: 'الإِيمَانُ بِالْكُتُبِ السَّمَاوِيَّةِ',
    phoneticName: 'Al-Īmānu bil-Kutub',
    frenchName: 'La foi aux Livres révélés',
    malagasyName: 'Ny Finoana ireo Boky Masina Nambara',
    explanationFrench: "Croire aux écritures saintes accordées aux prophètes : les Feuillets d'Abraham, la Torah de Moïse, les Psaumes de David, l'Évangile de Jésus, et le Saint Coran préservé donné à Muhammad ﷺ.",
    explanationMalagasy: "Mino ireo soratra masina nambaran’i Allah tamin’ireo mpaminany : ny Takelak’i Ibrahim, ny Tawrat an’i Musa, ny Zabur an’i Dawud, ny Injil an’i Isa, ary ny Korany Masina nambara tamin’i Muhammad ﷺ."
  },
  {
    number: 4,
    arabicName: 'الإِيمَانُ بِالرُّسُلِ وَالأَنْبِيَاءِ',
    phoneticName: 'Al-Īmānu bir-Rusul',
    frenchName: 'La foi aux Prophètes et Messagers',
    malagasyName: 'Ny Finoana ireo Mpaminany sy Iraka',
    explanationFrench: "Croire à tous les prophètes envoyés pour guider l'humanité, depuis Adam jusqu'au dernier et sceau des prophètes, Muhammad ﷺ, sans faire de distinction injuste entre eux.",
    explanationMalagasy: "Mino ireo mpaminany rehetra nirahin’i Allah hitarika ny olombelona, nanomboka tamin’i Adama ka hatramin’ny farany sy tompon-kasen’ny mpaminany rehetra, dia i Muhammad ﷺ."
  },
  {
    number: 5,
    arabicName: 'الإِيمَانُ بِالْيَوْمِ الآخِرِ',
    phoneticName: 'Al-Īmānu bil-Yawmil-Ākhir',
    frenchName: 'La foi au Jour Dernier (Résurrection)',
    malagasyName: 'Ny Finoana ny Andro Farany (Fitsarana)',
    explanationFrench: "Croire à la fin de ce monde, à la résurrection corporelle, au jugement équitable de chaque acte, et à la demeure éternelle (le Paradis pour les pieux et l'Enfer).",
    explanationMalagasy: "Mino ny fiafaran’ity tontolo ity, ny fitsanganana amin’ny maty, ny fitsarana marina ny asa tsirairay, ary ny fiainana mandrakizay (ny Paradisa na ny Afobe)."
  },
  {
    number: 6,
    arabicName: 'الإِيمَانُ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
    phoneticName: 'Al-Īmānu bil-Qadari khayrihi wa sharrih',
    frenchName: 'La foi au Destin (bon ou éprouvant)',
    malagasyName: 'Ny Finoana ny Lahatra (Tsara na fitsapana)',
    explanationFrench: "Croire que tout ce qui survient dans l'univers arrive selon la prescience éternelle d'Allah, Sa volonté suprême et Sa sagesse parfaite.",
    explanationMalagasy: "Mino fa ny zava-drehetra mitranga eto amin’izao rehetra izao dia araka ny fahalalan’i Allah taloha indrindra, ny sitrapony lehibe ary ny fahendreny lavorary."
  }
];

// ----------------------------------------------------
// 4. GUIDE DES ABLUTIONS (WUDU)
// ----------------------------------------------------

export const WUDU_STEPS: WuduStep[] = [
  {
    step: 1,
    arabicName: 'النِّيَّةُ وَالتَّسْمِيَة',
    frenchTitle: "1. L'intention (An-Niyyah) et la formule Bismillah",
    malagasyTitle: "1. Ny Fikasana (Niyyah) sy ny filazana Bismillah",
    frenchInstruction: "Avoir l'intention sincère dans le cœur de se purifier pour la prière, puis dire à voix basse : « Bismillah » (Au nom d'Allah).",
    malagasyInstruction: "Manana finiavana madio ao am-po hanadio tena ho an’ny vavaka, ary miteny moramora hoe : « Bismillah » (Amin’ny anaran’i Allah).",
    isObligatory: true,
    dua: {
      id: 'wudu-bismillah',
      arabic: 'بِسْمِ اللَّهِ',
      phonetic: 'Bismillāh',
      french: "Au nom d'Allah.",
      malagasy: "Amin’ny anaran’i Allah."
    }
  },
  {
    step: 2,
    arabicName: 'غَسْلُ الْكَفَّيْنِ',
    frenchTitle: '2. Laver les mains jusqu’aux poignets',
    malagasyTitle: '2. Manasa ny tanana roa hatreo amin’ny fehin-tanana',
    frenchInstruction: "Laver soigneusement les deux mains 3 fois en frottant entre les doigts.",
    malagasyInstruction: "Manasa tsara ny tanana roa in-telo sady mikosoka ny rantsan-tanana.",
    isObligatory: false
  },
  {
    step: 3,
    arabicName: 'الْمَضْمَضَةُ',
    frenchTitle: '3. Rincer la bouche (Madmada)',
    malagasyTitle: '3. Manakobana ny vava (Madmada)',
    frenchInstruction: "Prendre de l'eau avec la main droite, rincer l'intérieur de la bouche et recracher (3 fois).",
    malagasyInstruction: "Maka rano amin’ny tanana havanana, manakobana ny vava ary mandrora azy (in-telo).",
    isObligatory: true
  },
  {
    step: 4,
    arabicName: 'الِاسْتِنْشَاقُ وَالِاسْتِنْثَارُ',
    frenchTitle: '4. Rincer le nez (Istinshaq & Istinthar)',
    malagasyTitle: '4. Manadio ny orona (Istinshaq & Istinthar)',
    frenchInstruction: "Aspirer légèrement un peu d'eau par le nez avec la main droite, puis la moucher avec la main gauche (3 fois).",
    malagasyInstruction: "Mitaona rano kely amin’ny orona amin’ny tanana havanana, ary mitsoka azy mivoaka amin’ny tanana havia (in-telo).",
    isObligatory: true
  },
  {
    step: 5,
    arabicName: 'غَسْلُ الْوَجْهِ',
    frenchTitle: '5. Laver le visage en entier',
    malagasyTitle: '5. Manasa ny tarehy manontolo',
    frenchInstruction: "Laver tout le visage du haut du front jusqu'au bas du menton, et d'une oreille à l'autre (3 fois).",
    malagasyInstruction: "Manasa ny tarehy manontolo manomboka eo amin’ny fakan-bolo ka hatrany amin’ny saoka, ary amin’ny sofina roa (in-telo).",
    isObligatory: true
  },
  {
    step: 6,
    arabicName: 'غَسْلُ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ',
    frenchTitle: '6. Laver les avant-bras jusqu’aux coudes',
    malagasyTitle: '6. Manasa ny sandry roa hatrany amin’ny kiho',
    frenchInstruction: "Laver le bras droit du bout des doigts jusqu'au coude inclus (3 fois), puis faire de même avec le bras gauche (3 fois).",
    malagasyInstruction: "Manasa ny sandry havanana manomboka amin’ny rantsan-tanana hatrany amin’ny kiho (in-telo), avy eo ny sandry havia (in-telo).",
    isObligatory: true
  },
  {
    step: 7,
    arabicName: 'مَسْحُ الرَّأْسِ وَالْأُذُنَيْنِ',
    frenchTitle: '7. Passer les mains mouillées sur la tête et les oreilles',
    malagasyTitle: '7. Fikosohana ny loha lena sy ny sofina roa',
    frenchInstruction: "Passer les mains mouillées d'avant en arrière sur toute la chevelure puis revenir vers l'avant (1 fois). Avec les index, nettoyer l'intérieur des oreilles et avec les pouces l'arrière (1 fois).",
    malagasyInstruction: "Mikosoka amin’ny tanana lena manerana ny loha manomboka eo aloha mankany aoriana ka miverina aloha (indray mandeha). Amin’ny fanondro manadio ny anatiny sofina ary ny ankihibe ny ivelany (indray mandeha).",
    isObligatory: true
  },
  {
    step: 8,
    arabicName: 'غَسْلُ الرِّجْلَيْنِ إِلَى الْكَعْبَيْنِ',
    frenchTitle: '8. Laver les pieds jusqu’aux chevilles',
    malagasyTitle: '8. Manasa ny tongotra roa hatrany amin’ny kitrokroka',
    frenchInstruction: "Laver le pied droit jusqu'à la cheville incluse en frottant entre les orteils (3 fois), puis faire de même avec le pied gauche (3 fois).",
    malagasyInstruction: "Manasa ny tongotra havanana hatreo amin’ny kitrokroka sady manadio ny rantsan-tongotra (in-telo), avy eo ny tongotra havia (in-telo).",
    isObligatory: true
  }
];

export const DUA_AFTER_WUDU: IslamicPhrase = {
  id: 'dua-after-wudu',
  arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
  phonetic: 'Ash-hadu allā ilāha illallāhu wahdahū lā sharīka lah, wa ash-hadu anna Muhammadan ‘abduhū wa rasūluh. Allāhummaj-‘alnī minat-tawwābīna waj-‘alnī minal-mutatahhirīn.',
  french: "J'atteste qu'il n'y a d'autre divinité digne d'adoration qu'Allah l'Unique sans aucun associé, et j'atteste que Muhammad est Son serviteur et Messager. Ô Allah, compte-moi parmi ceux qui se repentent et parmi ceux qui se purifient.",
  malagasy: "Manambara aho fa tsy misy andriamanitra mendrika hivavahana afa-tsy i Allah Tokana tsy manana mpiombona, ary manambara aho fa i Muhammad dia mpanompony sy Irany. Ry Allah, ataovy anisan’ireo mibebaka sy manadio tena aho.",
  note: 'Le Prophète ﷺ a enseigné que les huit portes du Paradis s’ouvrent pour celui qui récite cette invocation avec sincérité.'
};

// ----------------------------------------------------
// 5. GUIDE COMPLET DE LA PRIÈRE (KAIFIYAT AS-SALAT)
// ----------------------------------------------------

export const SALAT_STEPS: SalatStep[] = [
  {
    step: 1,
    arabicName: 'تَكْبِيرَةُ الإِحْرَامِ',
    frenchTitle: "1. L'Entrée en prière (Takbirat al-Ihram)",
    malagasyTitle: "1. Fidirana amin’ny vavaka (Takbirat al-Ihram)",
    postureDescriptionFrench: "Debout face à la Qiblah, lever les mains à hauteur des épaules ou des lobes d'oreilles avec les paumes tournées vers l'avant.",
    postureDescriptionMalagasy: "Mitsangana manatrika ny Qiblah, manangana ny tanana roa hatreo amin’ny soroka na ny sofina miatrika ny Kaaba.",
    arabicFormula: 'اللَّهُ أَكْبَرُ',
    phoneticFormula: 'Allāhu Akbar',
    frenchFormula: 'Allah est le Plus Grand.',
    malagasyFormula: 'I Allah no Lehibe indrindra.'
  },
  {
    step: 2,
    arabicName: 'دُعَاءُ الاسْتِفْتَاحِ',
    frenchTitle: "2. L'Invocation d'ouverture (Istiftah)",
    malagasyTitle: "2. Fitalahoana fanombohana (Istiftah)",
    postureDescriptionFrench: "Poser la main droite sur le poignet gauche sur la poitrine ou au-dessus du nombril, le regard dirigé vers le lieu de prosternation.",
    postureDescriptionMalagasy: "Mametraka ny tanana havanana eo ambonin’ny fehin-tanana havia eo amin’ny tratra, ny maso mijery ny toerana hisujoudana.",
    arabicFormula: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، وَتَبَارَكَ اسْمُكَ ، وَتَعَالَىٰ جَدُّكَ ، وَلَا إِلَٰهَ غَيْرُكَ',
    phoneticFormula: 'Subhānakallāhumma wa bihamdik, wa tabārakasmuk, wa ta‘ālā jadduk, wa lā ilāha ghayruk.',
    frenchFormula: 'Gloire et pureté à Toi, ô Allah, et à Toi la louange. Que Ton Nom soit béni, que Ta Majesté soit exaltée, et il n’y a point d’autre divinité en dehors de Toi.',
    malagasyFormula: 'Fahadiovana sy voninahitra ho Anao ry Allah, sy fiderana Anao. Isaorana ny Anaranao, hisandratra ny fahalehibiazanao, ary tsy misy andriamanitra afa-tsy Ianao.'
  },
  {
    step: 3,
    arabicName: 'قِرَاءَةُ الفَاتِحَةِ وَمَا تَيَسَّرَ',
    frenchTitle: '3. Récitation de la Fatiha et d’une sourate',
    malagasyTitle: '3. Famakiana ny Al-Fatiha sy andininy hafa',
    postureDescriptionFrench: "Toujours debout (Qiyam), réciter la sourate Al-Fatiha (obligatoire à chaque rak'at), puis dire « Amine », puis réciter une autre sourate ou quelques versets.",
    postureDescriptionMalagasy: "Mitsangana foana (Qiyam), mamaky ny soratra Al-Fatiha (tsy maintsy isaky ny raka'ah), avy eo miteny hoe « Amine », ary mamaky soratra hafa manaraka azy.",
    arabicFormula: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ... اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ... آمِينَ',
    phoneticFormula: 'Bismillāhir-Rahmānir-Rahīm ... Ihdinas-sirātal-mustaqīm ... Āmīn.',
    frenchFormula: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux ... Guide-nous dans le droit chemin ... Âmîne.",
    malagasyFormula: "Amin’ny anaran’i Allah, Ilay Be Famindram-po, Ilay Mpamindra fo mandrakizay ... Tariho amin’ny lalan-kizorana izahay ... Amena."
  },
  {
    step: 4,
    arabicName: 'الرُّكُوعُ',
    frenchTitle: '4. L’Inclinaison (Roukou’)',
    malagasyTitle: '4. Ny fiondrehana (Ruku’)',
    postureDescriptionFrench: "Dire « Allahu Akbar », s'incliner avec le dos bien droit et horizontal, poser fermement les mains sur les genoux en écartant les doigts.",
    postureDescriptionMalagasy: "Miteny hoe « Allahu Akbar », miondrika ka ataovy mahitsy tsara ny lamosina, mametraka ny tanana eo amin’ny lohalika sady mampisaraka ny rantsana.",
    arabicFormula: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    phoneticFormula: 'Subhāna Rabbiyal-‘Adhīm',
    frenchFormula: 'Gloire et pureté à mon Seigneur le Très Grand !',
    malagasyFormula: 'Voninahitra sy fahadiovana ho an’ny Tompoko Ilay Tsitoha !',
    repetitions: '3 fois (in-telo)'
  },
  {
    step: 5,
    arabicName: 'الرَّفْعُ مِنَ الرُّكُوعِ',
    frenchTitle: '5. Le Redressement de l’inclinaison',
    malagasyTitle: '5. Fitsanganana avy niondrika',
    postureDescriptionFrench: "Se redresser complètement droit en levant les mains comme au Takbir, puis baisser les bras le long du corps ou sur la poitrine.",
    postureDescriptionMalagasy: "Mitsangana mahitsy tsara sady manangana tanana toy ny tamin’ny Takbir, avy eo mamerina ny tanana amin’ny tratra na midina.",
    arabicFormula: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ',
    phoneticFormula: 'Sami‘allāhu liman hamidah, Rabbanā wa lakal-hamd.',
    frenchFormula: "Allah a entendu celui qui L'a loué. Ô notre Seigneur, à Toi la louange !",
    malagasyFormula: "Nihaino an’izay nidera Azy i Allah. Ry Tomponay, Anao ny fiderana rehetra !"
  },
  {
    step: 6,
    arabicName: 'السُّجُودُ الأَوَّلُ',
    frenchTitle: '6. La Première Prosternation (Soujoud)',
    malagasyTitle: '6. Ny Fiankohofana voalohany (Sujud)',
    postureDescriptionFrench: "Dire « Allahu Akbar » et se prosterner au sol sur 7 points d'appui : le front et le nez, les deux paumes de mains, les deux genoux, et le bout des orteils des deux pieds dressés face à la Qiblah.",
    postureDescriptionMalagasy: "Miteny hoe « Allahu Akbar » ary miankohoka amin’ny tany amin’ny faritra 7 : ny handrina sy orona, ny felan-tanana roa, ny lohalika roa, ary ny tendron’ny rantsan-tongotra roa miatrika ny Qiblah.",
    arabicFormula: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    phoneticFormula: 'Subhāna Rabbiyal-A‘lā',
    frenchFormula: 'Gloire et pureté à mon Seigneur le Très Haut !',
    malagasyFormula: 'Voninahitra sy fahadiovana ho an’ny Tompoko Ilay Avo Indrindra !',
    repetitions: '3 fois (in-telo)'
  },
  {
    step: 7,
    arabicName: 'الجُلُوسُ بَيْنَ السَّجْدَتَيْنِ',
    frenchTitle: '7. L’Assise entre les deux prosternations',
    malagasyTitle: '7. Fipetrahana eo anelanelan’ny fiankohofana roa',
    postureDescriptionFrench: "Dire « Allahu Akbar » et s'asseoir sereinement sur le pied gauche replié en dressant le pied droit, les mains posées sur les cuisses.",
    postureDescriptionMalagasy: "Miteny hoe « Allahu Akbar » ary mipetraka amim-piadanana eo ambonin’ny tongotra havia mivalona, sady manangana ny tongotra havanana, tanana eo amin’ny feny.",
    arabicFormula: 'رَبِّ اغْفِرْ لِي ، رَبِّ اغْفِرْ لِي',
    phoneticFormula: 'Rabbigh-fir lī, Rabbigh-fir lī',
    frenchFormula: 'Seigneur, pardonne-moi ! Seigneur, pardonne-moi !',
    malagasyFormula: 'Tompo ô, mamelà ny heloko ! Tompo ô, mamelà ny heloko !'
  },
  {
    step: 8,
    arabicName: 'السُّجُودُ الثَّانِي',
    frenchTitle: '8. La Seconde Prosternation (Soujoud)',
    malagasyTitle: '8. Ny Fiankohofana faharoa (Sujud)',
    postureDescriptionFrench: "Dire « Allahu Akbar » et refaire exactement la même prosternation que la première.",
    postureDescriptionMalagasy: "Miteny hoe « Allahu Akbar » ary mamerina tsara ny fiankohofana toy ny voalohany.",
    arabicFormula: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    phoneticFormula: 'Subhāna Rabbiyal-A‘lā',
    frenchFormula: 'Gloire et pureté à mon Seigneur le Très Haut !',
    malagasyFormula: 'Voninahitra sy fahadiovana ho an’ny Tompoko Ilay Avo Indrindra !',
    repetitions: '3 fois (in-telo)'
  },
  {
    step: 9,
    arabicName: 'التَّشَهُّدُ الأَوَّلُ وَالأَخِيرُ',
    frenchTitle: '9. Le Tachahhoud (Attahiyyat)',
    malagasyTitle: '9. Ny Vavaka Tachahhud (Attahiyyat)',
    postureDescriptionFrench: "S'asseoir après chaque 2 rak'ahs et à la fin de la prière. Fermer les doigts de la main droite en pointant l'index pour attester de l'Unicité divine.",
    postureDescriptionMalagasy: "Mipetraka aorian’ny raka'ah 2 sy amin’ny faran’ny vavaka. Mandray ny tanana havanana sady manondro amin’ny fanondro hanamafisana ny maha-tokana an’i Allah.",
    arabicFormula: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    phoneticFormula: 'At-tahiyyātu lillāhi was-salawātu wat-tayyibāt, as-salāmu ‘alayka ayyuhan-Nabiyyu wa rahmatullāhi wa barakātuh, as-salāmu ‘alaynā wa ‘alā ‘ibādillāhis-sālihīn. Ash-hadu allā ilāha illallāh, wa ash-hadu anna Muhammadan ‘abduhū wa rasūluh.',
    frenchFormula: "Les salutations, les prières et les bonnes œuvres appartiennent à Allah. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d'Allah et Ses bénédictions. Que la paix soit sur nous et sur les pieux serviteurs d'Allah. J'atteste qu'il n'y a de dieu qu'Allah et j'atteste que Muhammad est Son serviteur et Son Messager.",
    malagasyFormula: "Ny haja amam-boninahitra rehetra, ny vavaka sy ny asa soa dia ho an’i Allah avokoa. Ho aminao anie ny fiadanana ry Mpaminany, sy ny famindram-pon’i Allah ary ny fitahiany. Ho amintsika anie ny fiadanana sy ho an’ireo mpanompon’i Allah tsara toetra. Manambara aho fa tsy misy andriamanitra afa-tsy i Allah, ary manambara aho fa i Muhammad dia mpanompony sy Irany."
  },
  {
    step: 10,
    arabicName: 'الصَّلَاةُ الإِبْرَاهِيمِيَّةُ',
    frenchTitle: '10. La Prière Abrahamique (As-Salat al-Ibrahimiyya)',
    malagasyTitle: '10. Ny Vavaka Ibrahimiyya (Fitahiana ny Mpaminany)',
    postureDescriptionFrench: "À réciter lors de l'assise finale de la dernière rak'at avant de terminer la prière.",
    postureDescriptionMalagasy: "Vakiana amin’ny fipetrahana farany amin’ny raka'ah farany alohan’ny hamaranana ny vavaka.",
    arabicFormula: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    phoneticFormula: 'Allāhumma salli ‘alā Muhammadin wa ‘alā āli Muhammad, kamā sallayta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka Hamīdum-Majīd. Allāhumma bārik ‘alā Muhammadin wa ‘alā āli Muhammad, kamā bārakta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka Hamīdum-Majīd.',
    frenchFormula: "Ô Allah, répands Tes bénédictions sur Muhammad et sur la famille de Muhammad comme Tu as béni Abraham et la famille d'Abraham, Tu es certes Digne de louange et Glorieux. Ô Allah, accorde Tes grâces à Muhammad et à la famille de Muhammad comme Tu les as accordées à Abraham et à la famille d'Abraham, Tu es certes Digne de louange et Glorieux.",
    malagasyFormula: "Ry Allah, tahio i Muhammad sy ny ankohonan’i Muhammad tahaka ny nitsimbinanao an’i Ibrahim sy ny ankohonan’i Ibrahim, Ianao tokoa no Mendri-piderana sy Be Voninahitra. Ry Allah, asio fitahiana i Muhammad sy ny ankohonan’i Muhammad tahaka ny nanasoavanao an’i Ibrahim sy ny ankohonan’i Ibrahim, Ianao tokoa no Mendri-piderana sy Be Voninahitra."
  },
  {
    step: 11,
    arabicName: 'التَّسْلِيمُ',
    frenchTitle: '11. Les Salutations Finales (At-Taslim)',
    malagasyTitle: '11. Ny Fiarahabana famaranana (Taslim)',
    postureDescriptionFrench: "Tourner la tête vers la droite en prononçant la formule de paix, puis vers la gauche de la même manière.",
    postureDescriptionMalagasy: "Mampitodika ny loha miankavanana sady miteny ny fiarahabam-piadanana, avy eo miankavia toy izany koa.",
    arabicFormula: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    phoneticFormula: 'As-Salāmu ‘alaykum wa Rahmatullāh',
    frenchFormula: "Que la paix et la miséricorde d'Allah soient sur vous.",
    malagasyFormula: "Ho aminao anie ny fiadanana sy ny famindram-pon’i Allah."
  }
];

// ----------------------------------------------------
// 6. TOUS LES DUA (RECUEIL DE DOUAS / HISN AL-MUSLIM)
// ----------------------------------------------------

export const DUAS_COLLECTION: DuaItem[] = [
  // --- Matin & Soir ---
  {
    id: 'dua-sayyid-istighfar',
    title: 'Sayyid al-Istighfar (La maîtresse des demandes de pardon)',
    malagasyTitle: 'Sayyid al-Istighfar (Ny tampon’ny fangataham-pamelana)',
    category: 'morning_evening',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ ، خَلَقْتَنِي وَأَنَا عَبْدُكَ ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    phonetic: 'Allāhumma Anta Rabbī lā ilāha illā Ant, khalaqtanī wa anā ‘abduk, wa anā ‘alā ‘ahdika wa wa‘dika mastata‘tu, a‘ūdhu bika min sharri mā sana‘tu, abū’u laka bi-ni‘matika ‘alayya, wa abū’u laka bi-dhambī faghfir lī fa-innahū lā yaghfirudh-dhunūba illā Ant.',
    french: "Ô Allah, Tu es mon Seigneur, il n'y a de divinité que Toi. Tu m'as créé et je suis Ton serviteur, et je demeure fidèle à Ton engagement et à Ta promesse autant que je le puis. Je cherche refuge auprès de Toi contre le mal de ce que j'ai fait. Je reconnais devant Toi Tes bienfaits sur moi et je confesse mon péché ; pardonne-moi donc, car nul ne pardonne les péchés si ce n'est Toi.",
    malagasy: "Ry Allah, Ianao no Tompoko, tsy misy andriamanitra afa-tsy Ianao. Noforoninao aho ary mpanomponao, ary mitandrina ny fihavananao sy ny fampanantenanao aho araka izay vitako. Mialoka Aminao aho amin’ny ratsy nataoko. Miaiky eo anatrehanao ny soa nataonao tamiko aho, ary miaiky ny fahotako ; mamelà ahy àry satria tsy misy mamela heloka afa-tsy Ianao.",
    context: 'Rapporté par Al-Boukhari. Celui qui le récite le matin ou le soir avec conviction et meurt durant la journée ou la nuit entrera au Paradis.',
    malagasyContext: 'Nolazain’i Al-Boukhari. Izay miteny azy maraina na hariva amim-pahatokiana ka maty amin’io andro io dia hiditra ao amin’ny Paradisa.',
    repeatCount: 1
  },
  {
    id: 'dua-ayat-kursi',
    title: 'Ayat al-Kursi (Le Verset du Trône)',
    malagasyTitle: 'Ayat al-Kursi (Ny Andinin-tseza fiandrianana)',
    category: 'morning_evening',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    phonetic: 'Allāhu lā ilāha illā Huwal-Hayyul-Qayyūm, lā ta’khudhuhū sinatuw-walā nawm, lahū mā fis-samāwāti wa mā fil-ard, man dhal-ladhī yashfa‘u ‘indahū illā bi-idhnih, ya‘lamu mā bayna aydīhim wa mā khalfahum, wa lā yuhītūna bi-shay’im-min ‘ilmihī illā bi-mā shā’, wasi‘a kursiyyuhus-samāwāti wal-ard, wa lā ya’ūduhū hifdhuhumā, wa Huwal-‘Aliyyul-‘Adhīm.',
    french: "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre. Qui peut intercéder auprès de Lui sans Sa permission ? Il sait leur passé et leur futur. Et, de Sa science, ils n'embrassent que ce qu'Il veut. Son Trône déborde les cieux et la terre, dont la garde ne Lui coûte aucune peine. Et Il est le Très Haut, le Très Grand.",
    malagasy: "I Allah ! Tsy misy andriamanitra afa-tsy Izy, Ilay Velona mandrakizay, Mpanohana ny zava-drehetra. Tsy mananika Azy ny torimaso fotsy na ny torimaso lalina. Azy ny zavatra rehetra any an-danitra sy ety an-tany. Iza moa no afaka mifona eo anatrehany raha tsy amin’ny alalany ? Fantany ny teo alohan’izy ireo sy ny ho avy aoriany. Ary tsy misy zavatra takatr’izy ireo amin’ny fahalalany afa-tsy izay sitrany. Manenika ny lanitra sy ny tany ny Seza fiandrianany, ary tsy mampavesatra Azy ny fiarovana azy roa. Ary Izy no Avo Indrindra, Ilay Tsitoha.",
    context: 'Sourate Al-Baqarah (2:255). Protection suprême contre les démons et tout mal quand récité matin, soir ou avant de dormir.',
    malagasyContext: 'Soratra Al-Baqarah (2:255). Fiarovana lehibe indrindra amin’ny devoly sy ny ratsy rehetra rehefa vakiana maraina, hariva na alohan’ny hatory.',
    repeatCount: 1
  },
  {
    id: 'dua-bismillahi-lladhi',
    title: 'Protection contre tout mal terrestre et céleste',
    malagasyTitle: 'Fiarovana amin’ny ratsy rehetra ety an-tany sy any an-danitra',
    category: 'morning_evening',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    phonetic: 'Bismillāhil-ladhī lā yadurru ma‘asmihī shay’un fil-ardi wa lā fis-samā’i wa Huwas-Samī‘ul-‘Alīm.',
    french: "Au nom d'Allah, avec le Nom duquel rien ne peut nuire, ni sur la terre ni dans le ciel, et Il est l'Audient, l'Omniscient.",
    malagasy: "Amin’ny anaran’i Allah, Ilay tsy misy zavatra mety hampidi-doza raha miaraka amin’ny Anarany na ety an-tany na any an-danitra, ary Izy no Mpihaino, Ilay Mahafantatra ny zava-drehetra.",
    context: 'À réciter 3 fois le matin et 3 fois le soir. Rien ne pourra nuire à celui qui le récite.',
    malagasyContext: 'Vakiana in-telo maraina sy in-telo hariva. Tsy misy loza hahafaoka an’izay manonona azy.',
    repeatCount: 3
  },
  {
    id: 'dua-raditu-billah',
    title: 'Satisfaction de sa foi (Raditu billahi Rabba)',
    malagasyTitle: 'Fahafaham-po amin’ny finoana (Raditu billahi Rabba)',
    category: 'morning_evening',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا ، وَبِالإِسْلَامِ دِينًا ، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    phonetic: 'Radītu billāhi Rabban, wa bil-Islāmi dīnan, wa bi-Muhammadin sallallāhu ‘alayhi wa sallama Nabiyyā.',
    french: "J'agrée Allah comme mon Seigneur, l'Islam comme ma religion, et Muhammad ﷺ comme mon Prophète.",
    malagasy: "Faly sy afa-po aho fa i Allah no Tompoko, ny finoana Silamo no fivavahako, ary i Muhammad ﷺ no Mpaminaniko.",
    context: 'À réciter 3 fois chaque matin et soir. Allah Se fait un devoir de satisfaire Son serviteur au Jour de la Résurrection.',
    malagasyContext: 'Vakiana in-telo isaky ny maraina sy hariva. Adidin’i Allah ny hampifaly ny mpanompony amin’ny Andron’ny Fitsarana.',
    repeatCount: 3
  },

  // --- Sommeil & Réveil ---
  {
    id: 'dua-before-sleep',
    title: 'Invocation avant de dormir',
    malagasyTitle: 'Vavaka alohan’ny hatory',
    category: 'sleep',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي ، وَبِكَ أَرْفَعُهُ ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا ، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    phonetic: 'Bismika Rabbī wada‘tu jambī, wa bika arfa‘uh, fa-in amsakta nafsī farhamhā, wa-in arsaltahā fah-fadh-hā bi-mā tahfadhu bihī ‘ibādakas-sālihīn.',
    french: "En Ton Nom, mon Seigneur, j'ai posé mon flanc et en Ton Nom je le relève. Si Tu retiens mon âme, fais-lui miséricorde, et si Tu la renvoies, préserve-la comme Tu préserves Tes serviteurs vertueux.",
    malagasy: "Amin’ny Anaranao ry Tompoko no ametrahako ny ila-vatako hatory, ary amin’ny Anaranao no hananganako azy. Raha tazoninao ny aiko dia mamindrà fo aminy, ary raha averinao izy dia arovinao tahaka ny fiarovanao ireo mpanomponao tsara toetra.",
    context: 'Rapporté par Al-Boukhari et Muslim. Se coucher sur le côté droit en récitant.',
    malagasyContext: 'Notantarain’i Al-Boukhari sy Muslim. Mandry amin’ny ila-kavanana rehefa miteny azy.',
    repeatCount: 1
  },
  {
    id: 'dua-waking-up',
    title: 'Invocation au réveil',
    malagasyTitle: 'Vavaka rehefa mifoha amin’ny torimaso',
    category: 'sleep',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    phonetic: 'Al-hamdu lillāhil-ladhī ahyānā ba‘da mā amātanā wa ilayhin-nushūr.',
    french: "Louange à Allah qui nous a rendu la vie après nous avoir fait mourir (le sommeil) et c'est vers Lui que se fera la résurrection.",
    malagasy: "Isaorana i Allah Ilay namelona antsika indray taorian’ny nampatoriany antsika, ary any Aminy no fitsanganana amin’ny maty.",
    context: 'À prononcer dès l’ouverture des yeux au réveil.',
    malagasyContext: 'Tononina avy hatrany raha vao mahiratra ny maso maraina.',
    repeatCount: 1
  },

  // --- Repas & Boisson ---
  {
    id: 'dua-before-eating',
    title: 'Invocation avant de manger',
    malagasyTitle: 'Vavaka alohan’ny hisakafo',
    category: 'food',
    arabic: 'بِسْمِ اللَّهِ ، وَإِنْ نَسِيَ فِي أَوَّلِهِ فَلْيَقُلْ : بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
    phonetic: 'Bismillāh. (Si oublié : Bismillāhi awwalahū wa ākhirah)',
    french: "Au nom d'Allah. (En cas d'oubli au début, dire : Au nom d'Allah au début et à la fin).",
    malagasy: "Amin’ny anaran’i Allah. (Raha hadino teo am-boalohany : Amin’ny anaran’i Allah ny fiandohany sy ny fiafarany).",
    context: 'Manger de la main droite et de ce qui est devant soi.',
    malagasyContext: 'Mihinana amin’ny tanana havanana sy ny eo anoloana.',
    repeatCount: 1
  },
  {
    id: 'dua-after-eating',
    title: 'Invocation après avoir mangé',
    malagasyTitle: 'Vavaka rehefa avy nisakafo',
    category: 'food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    phonetic: 'Al-hamdu lillāhil-ladhī at‘amanī hādhā wa razaqanīhi min ghayri hawlim-minnī wa lā quwwah.',
    french: "Louange à Allah qui m'a nourri de cet aliment et me l'a accordé sans force ni puissance de ma part.",
    malagasy: "Isaorana i Allah Ilay nanome ahy ity sakafo ity sy namatsy ahy tsy tamin’ny heriko na ny tanjako manokana.",
    context: 'Tous les péchés passés sont pardonnés à celui qui prononce cette invocation après le repas.',
    malagasyContext: 'Voavela ny fahotana lasa rehetra ho an’izay manonona ity vavaka ity rehefa avy misakafo.',
    repeatCount: 1
  },

  // --- Maison & Mosquée ---
  {
    id: 'dua-leaving-home',
    title: 'Invocation en sortant de la maison',
    malagasyTitle: 'Vavaka rehefa mivoaka ny trano',
    category: 'home_mosque',
    arabic: 'بِسْمِ اللَّهِ ، تَوَكَّلْتُ عَلَى اللَّهِ ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    phonetic: 'Bismillāh, tawakkaltu ‘alallāh, wa lā hawla wa lā quwwata illā billāh.',
    french: "Au nom d'Allah, je place ma confiance en Allah, et il n'y a de force ni de puissance que par Allah.",
    malagasy: "Amin’ny anaran’i Allah, mametraka ny fitokiako amin’i Allah aho, ary tsy misy hery na tanjaka afa-tsy amin’ny alalan’i Allah.",
    context: 'Il lui est dit : Tu es guidé, préservé et protégé, et le diable s’écarte de lui.',
    malagasyContext: 'Lazaina aminy hoe : Voatarika ianao, voaaro ary voaroza, ka mandositra lavitra azy ny devoly.',
    repeatCount: 1
  },
  {
    id: 'dua-entering-home',
    title: 'Invocation en entrant dans la maison',
    malagasyTitle: 'Vavaka rehefa miditra ny trano',
    category: 'home_mosque',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا ، وَبِسْمِ اللَّهِ خَرَجْنَا ، وَعَلَىٰ رَبِّنَا تَوَكَّلْنَا',
    phonetic: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alā Rabbinā tawakkalnā.',
    french: "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et en notre Seigneur nous plaçons notre confiance.",
    malagasy: "Amin’ny anaran’i Allah no idiranay, amin’ny anaran’i Allah no nivoahanay, ary amin’ny Tomponay no ametrahanay ny fitokianay.",
    context: 'Saluer ensuite les habitants de la maison avec le Salam.',
    malagasyContext: 'Miarahaba amin’ny Salam ireo olona ao an-trano avy eo.',
    repeatCount: 1
  },
  {
    id: 'dua-entering-mosque',
    title: 'Invocation en entrant dans la mosquée',
    malagasyTitle: 'Vavaka rehefa miditra ao amin’ny moske',
    category: 'home_mosque',
    arabic: 'بِسْمِ اللَّهِ ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    phonetic: 'Bismillāh, was-salātu was-salāmu ‘alā Rasūlillāh, Allāhummaftah lī abwāba rahmatik.',
    french: "Au nom d'Allah, prière et salut sur le Messager d'Allah. Ô Allah, ouvre-moi les portes de Ta miséricorde.",
    malagasy: "Amin’ny anaran’i Allah, fiadanana sy fitahiana ho an’ny Irak’i Allah. Ry Allah, vohay ho ahy ireo varavaran’ny famindram-ponao.",
    context: 'Entrer avec le pied droit en récitant.',
    malagasyContext: 'Miditra amin’ny tongotra havanana sady manonona azy.',
    repeatCount: 1
  },
  {
    id: 'dua-leaving-mosque',
    title: 'Invocation en sortant de la mosquée',
    malagasyTitle: 'Vavaka rehefa mivoaka ny moske',
    category: 'home_mosque',
    arabic: 'بِسْمِ اللَّهِ ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    phonetic: 'Bismillāh, was-salātu was-salāmu ‘alā Rasūlillāh, Allāhumma innī as’aluka min fadlik.',
    french: "Au nom d'Allah, prière et salut sur le Messager d'Allah. Ô Allah, je Te demande de Tes bienfaits.",
    malagasy: "Amin’ny anaran’i Allah, fiadanana sy fitahiana ho an’ny Irak’i Allah. Ry Allah, mangataka aminao ny fahasoavanao aho.",
    context: 'Sortir avec le pied gauche en récitant.',
    malagasyContext: 'Mivoaka amin’ny tongotra havia sady manonona azy.',
    repeatCount: 1
  },

  // --- Parents ---
  {
    id: 'dua-parents-quran',
    title: 'Invocation coranique pour les parents',
    malagasyTitle: 'Vavaka avy ao amin’ny Korany ho an’ny ray aman-dreny',
    category: 'parents',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    phonetic: 'Rabbir-hamhumā kamā rabbayānī saghīrā.',
    french: "Ô mon Seigneur, fais-leur miséricorde comme ils m'ont élevé tout petit.",
    malagasy: "Ry Tompoko, mamindrà fo amin’izy roa tahaka ny nitaizany ahy fony aho mbola kely.",
    context: 'Sourate Al-Isra (17:24). À répéter souvent pour ses parents vivants ou décédés.',
    malagasyContext: 'Soratra Al-Isra (17:24). Tononina matetika ho an’ny ray aman-dreny na mbola velona na efa nodimandry.',
    repeatCount: 1
  },
  {
    id: 'dua-parents-forgiveness',
    title: 'Pardon pour soi, ses parents et tous les croyants',
    malagasyTitle: 'Fangataham-pamelana ho an’ny tena, ray aman-dreny sy ny mpino rehetra',
    category: 'parents',
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    phonetic: 'Rabbanagh-fir lī wa li-wālidayya wa lil-mu’minīna yawma yaqūmul-hisāb.',
    french: "Notre Seigneur ! Pardonne-moi, ainsi qu'à mes parents et aux croyants, le jour où s'établira le Jugement.",
    malagasy: "Ry Tomponay ! Mamelà ahy sy ny ray aman-dreniko ary ireo mpino rehetra amin’ny andro hisian’ny fitsarana.",
    context: 'Invocation du prophète Ibrahim (Sourate Ibrahim 14:41).',
    malagasyContext: 'Vavak’i Ibrahim mpaminany (Soratra Ibrahim 14:41).',
    repeatCount: 1
  },

  // --- Santé, Guérison & Protection ---
  {
    id: 'dua-healing-patient',
    title: 'Invocation pour la guérison du malade (Roqya)',
    malagasyTitle: 'Vavaka fahasitranana ho an’ny marary (Roqya)',
    category: 'health_protection',
    arabic: 'أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ ، وَاشْفِ أَنْتَ الشَّافِي ، لَا شِفَاءَ إِلَّا شِفَاؤُكَ ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    phonetic: 'Adh-hibil-ba’sa Rabban-nās, washfi Antash-Shāfī, lā shifā’a illā shifā’uk, shifā’an lā yughādiru saqamā.',
    french: "Fais partir le mal, Seigneur des hommes, et guéris ! Tu es le Guérisseur, il n'y a de guérison que Ta guérison, une guérison qui ne laisse subsister aucune maladie.",
    malagasy: "Esory ny aretina ry Tompon’ny olombelona, ary manasitrana Ianao fa Ianao no Mpanasitrana ! Tsy misy fahasitranana afa-tsy ny fahasitrananao, fahasitranana tsy mamela soritr’aretina na kely aza.",
    context: 'Rapporté par Al-Boukhari et Muslim. Poser la main sur la douleur en récitant.',
    malagasyContext: 'Notantarain’i Al-Boukhari sy Muslim. Apetraka eo amin’ny faritra marary ny tanana sady manonona azy.',
    repeatCount: 1
  },
  {
    id: 'dua-evil-eye',
    title: 'Protection des enfants contre le mauvais œil',
    malagasyTitle: 'Fiarovana ny ankizy amin’ny maso ratsy sy ny devoly',
    category: 'health_protection',
    arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    phonetic: 'U‘īdhukumā bi-kalimātillāhit-tāmmati min kulli shaytāniw-wa hāmmah, wa min kulli ‘aynil-lāmmah.',
    french: "Je cherche protection pour vous auprès des paroles parfaites d'Allah contre tout démon, toute bête venimeuse, et contre tout mauvais œil nuisible.",
    malagasy: "Mampialoka anareo amin’ireo teny lavorarin’i Allah aho amin’ny devoly rehetra, ny biby manapoizina rehetra, ary amin’ny maso ratsy rehetra mandratra.",
    context: 'Invocation que le Prophète ﷺ récitait pour protéger Al-Hassan et Al-Houssayn.',
    malagasyContext: 'Vavaka nataon’ny Mpaminany ﷺ niarovana an’i Hassan sy Houssayn.',
    repeatCount: 1
  },

  // --- Angoisse, Tristesse & Pardon ---
  {
    id: 'dua-distress-yunus',
    title: 'Invocation de Jonas dans l’épreuve (Dua Younous)',
    malagasyTitle: 'Vavak’i Jonasa (Younous) tao anaty fahoriana',
    category: 'distress_forgiveness',
    arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    phonetic: 'Lā ilāha illā Anta subhānaka innī kuntu minadh-dhālimīn.',
    french: "Il n'y a de divinité digne d'adoration que Toi ! Gloire et pureté à Toi, j'ai été certes du nombre des injustes !",
    malagasy: "Tsy misy andriamanitra mendrika hivavahana afa-tsy Ianao ! Voninahitra ho Anao, tena anisan’ireo nanao ny tsy rariny tokoa aho !",
    context: 'Sourate Al-Anbiya (21:87). Aucun musulman n’invoque Allah avec cette parole dans une détresse sans qu’Allah ne l’exauce.',
    malagasyContext: 'Soratra Al-Anbiya (21:87). Tsy misy silamo miantso an’i Allah amin’ity vavaka ity ao anaty fahoriana ka tsy hovalian’i Allah.',
    repeatCount: 1
  },
  {
    id: 'dua-anxiety-debt',
    title: 'Délivrance de l’anxiété, du chagrin et des dettes',
    malagasyTitle: 'Fanafahana amin’ny fanahiana, alahelo ary trosa',
    category: 'distress_forgiveness',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    phonetic: 'Allāhumma innī a‘ūdhu bika minal-hammi wal-hazan, wa a‘ūdhu bika minal-‘ajzi wal-kasal, wa a‘ūdhu bika minal-jubni wal-bukhl, wa a‘ūdhu bika min ghalabatid-dayni wa qahrir-rijāl.',
    french: "Ô Allah, je cherche refuge auprès de Toi contre les soucis et le chagrin, contre l'impuissance et la paresse, contre la lâcheté et l'avarice, et contre le fardeau des dettes et l'oppression des hommes.",
    malagasy: "Ry Allah, mialoka Aminao aho amin’ny tebiteby sy ny alahelo, amin’ny tsy fahafahana sy ny hakamoana, amin’ny tahotra sy ny fitiavan-karena tafahoatra, ary amin’ny vesatry ny trosa sy ny fampahorian’ny olona.",
    context: 'Rapporté par Al-Boukhari. À réciter régulièrement le matin et le soir pour chasser l’oppression.',
    malagasyContext: 'Notantarain’i Al-Boukhari. Vakiana maraina sy hariva hanalana ny vesatra am-po sy ny fahasahiranana.',
    repeatCount: 1
  },

  // --- Voyage & Istikhara ---
  {
    id: 'dua-travel',
    title: 'Invocation du départ en voyage (Safar)',
    malagasyTitle: 'Vavaka rehefa hiainga handeha lavitra (Safar)',
    category: 'travel_istikhara',
    arabic: 'اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    phonetic: 'Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, Subhānal-ladhī sakh-khara lanā hādhā wa mā kunnā lahū muqrinīn, wa innā ilā Rabbinā la-munqalibūn.',
    french: "Allah est le Plus Grand (3 fois). Gloire à Celui qui a mis ce moyen de transport à notre disposition alors que nous n'étions pas capables de le maîtriser de nous-mêmes, et c'est assurément vers notre Seigneur que nous retournerons.",
    malagasy: "I Allah no Lehibe indrindra (in-telo). Voninahitra ho an’Ilay nampanompo ity fitaovam-pitaterana ity ho antsika nefa tsy nanana fahefana taminy isika, ary any amin’ny Tompontsika tokoa no hiverenantsika.",
    context: 'À réciter dès la montée dans la voiture, l’avion, le train ou tout moyen de transport.',
    malagasyContext: 'Vakiana raha vao miakatra amin’ny fiara, fiaramanidina na fitaovam-pitaterana.',
    repeatCount: 1
  },
  {
    id: 'dua-istikhara',
    title: 'Invocation de consultation divine (Al-Istikhara)',
    malagasyTitle: 'Vavaka fisafidianana sy fitarihana (Al-Istikhara)',
    category: 'travel_istikhara',
    arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ ، وَتَعْلَمُ وَلَا أَعْلَمُ ، وَأَنْتَ عَلَّامُ الْغُيُوبِ ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَٰذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ',
    phonetic: 'Allāhumma innī astakhīruka bi-‘ilmika, wa astaqdiruka bi-qudratika, wa as’aluka min fadlikal-‘adhīm, fa-innaka taqdiru wa lā aqdir, wa ta‘lamu wa lā a‘lam, wa Anta ‘Allāmul-ghuyūb. Allāhumma in kunta ta‘lamu anna hādhal-amra khayrul-lī fī dīnī wa ma‘āshī wa ‘āqibati amrī faqdur-hu lī wa yassir-hu lī thumma bārik lī fīh.',
    french: "Ô Allah, je Te demande de me guider par Ta science, je cherche la capacité par Ta puissance et je Te sollicite de Ton immense grâce. Car Tu peux tout et je ne peux rien, Tu sais tout et je ne sais rien, et Tu es le Parfait Connaisseur de l'invisible. Ô Allah, si Tu sais que cette affaire est un bien pour moi dans ma religion, ma vie présente et future, destine-la-moi, facilite-la-moi, puis bénis-la pour moi.",
    malagasy: "Ry Allah, mangataka fitarihana Aminao araka ny fahalalanao aho, mitady hery Aminao araka ny herinao aho, ary mangataka amin’ny fahasoavanao lehibe. Satria Ianao no mahavita fa izaho kosa tsy afaka, Ianao no mahalala fa izaho tsy mahalala, ary Ianao no Mahafantatra ny miafina rehetra. Ry Allah, raha fantatrao fa ity raharaha ity no tsara ho ahy amin’ny finoako, ny fiainako ary ny fiafarako, dia tendreo ho ahy izy, ataovy mora ho ahy ary tahio aho ao aminy.",
    context: 'À réciter après 2 rak’ahs surérogatoires lors d’un choix important (mariage, projet, voyage, décision de vie).',
    malagasyContext: "Vakiana aorian’ny raka'ah 2 fanampiny rehefa misy fanapahan-kevitra lehibe (fanambadiana, asa, fandraharahana).",
    repeatCount: 1
  }
];
