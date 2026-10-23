export interface AyahData {
  number: number; // Surah-relative ayah number (1, 2, ...)
  globalNumber: number; // Global Quran ayah number (1 to 6236)
  textArabic: string;
  translit?: string;
  textFr: string;
  textMg: string;
  audioUrl: string;
}

export interface OfflineSurahDetails {
  number: number;
  bismillahPre: boolean;
  bismillahText?: string;
  bismillahFr?: string;
  bismillahMg?: string;
  ayahs: AyahData[];
}

export const OFFLINE_SURAHS: Record<number, OfflineSurahDetails> = {
  // 1: Al-Faatiha
  1: {
    number: 1,
    bismillahPre: false,
    ayahs: [
      {
        number: 1,
        globalNumber: 1,
        textArabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
        translit: "Bismi-llāhi r-raḥmāni r-raḥīm",
        textFr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
        textMg: "Amin'ny anaran'i Allah, Ilay be fiantrana, Ilay be famindrampo.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
      },
      {
        number: 2,
        globalNumber: 2,
        textArabic: "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ",
        translit: "Al-ḥamdu li-llāhi rabbi l-'ālamīn",
        textFr: "Louange à Allah, Seigneur de l'univers.",
        textMg: "Dera ho an'i Allah, Tompon'izao tontolo izao.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
      },
      {
        number: 3,
        globalNumber: 3,
        textArabic: "ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
        translit: "Ar-raḥmāni r-raḥīm",
        textFr: "Le Tout Miséricordieux, le Très Miséricordieux,",
        textMg: "Ilay be fiantrana, Ilay be famindrampo,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
      },
      {
        number: 4,
        globalNumber: 4,
        textArabic: "مَٰلِكِ يَوۡمِ ٱلدِّينِ",
        translit: "Māliki yawmi d-dīn",
        textFr: "Maître du Jour de la rétribution.",
        textMg: "Mpanjakan'ny Andron'ny Fitsarana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
      },
      {
        number: 5,
        globalNumber: 5,
        textArabic: "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ",
        translit: "Iyyāka na'budu wa-iyyāka nasta'īn",
        textFr: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours.",
        textMg: "Ianao irery ihany no tompoinay, ary Ianao irery ihany no angatahinay fanampiana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
      },
      {
        number: 6,
        globalNumber: 6,
        textArabic: "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ",
        translit: "Ihdinā ṣ-ṣirāṭa l-mustaqīm",
        textFr: "Guide-nous dans le droit chemin,",
        textMg: "Tariho amin'ny lalana mahitsy izahay,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
      },
      {
        number: 7,
        globalNumber: 7,
        textArabic: "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ",
        translit: "Ṣirāṭa l-ladhīna an'amta 'alayhim ghayri l-maghḍūbi 'alayhim wa-lā ḍ-ḍāllīn",
        textFr: "Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.",
        textMg: "Lalan'ireo izay notoloranao fahasoavana, tsy an'ireo izay niharan'ny fahatezeranao na ireo very lalana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
      },
    ],
  },

  // 103: Al-Asr
  103: {
    number: 103,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6177,
        textArabic: "وَٱلۡعَصۡرِ",
        translit: "Wal-'aṣr",
        textFr: "Par le Temps !",
        textMg: "Mianiana amin'ny fotoana Aho !",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3",
      },
      {
        number: 2,
        globalNumber: 6178,
        textArabic: "إِنَّ ٱلۡإِنسَٰنَ لَفِي خُسۡرٍ",
        translit: "Inna l-insāna lafī khusr",
        textFr: "L'homme est certes en perdition,",
        textMg: "Tena ao anatin'ny fatiantoka tanteraka ny olombelona,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6178.mp3",
      },
      {
        number: 3,
        globalNumber: 6179,
        textArabic: "إِلَّا ٱلَّذِينَ ءَامَنُواْ وَعَمِلُواْ ٱلصَّٰلِحَٰتِ وَتَوَاصَوۡاْ بِٱلۡحَقِّ وَتَوَاصَوۡاْ بِٱلصَّبۡرِ",
        translit: "Illā l-ladhīna āmanū wa 'amilū ṣ-ṣāliḥāti wa-tawāṣaw bil-ḥaqqi wa-tawāṣaw biṣ-ṣabr",
        textFr: "sauf ceux qui croient et accomplissent les bonnes œuvres, s'enjoignent mutuellement la vérité et s'enjoignent mutuellement l'endurance.",
        textMg: "afa-tsy ireo izay nino sy nanao asa soa, ary nifanafatatra ny marina sy nifanafatatra ny faharetana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6179.mp3",
      },
    ],
  },

  // 108: Al-Kawthar
  108: {
    number: 108,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6194,
        textArabic: "إِنَّآ أَعۡطَيۡنَٰكَ ٱلۡكَوۡثَرَ",
        translit: "Innā a'ṭaynāka l-kawthar",
        textFr: "Nous t'avons certes accordé l'Abondance.",
        textMg: "Tena nomenay anao tokoa ny Fahasondrotana be (Al-Kawthar).",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6194.mp3",
      },
      {
        number: 2,
        globalNumber: 6195,
        textArabic: "فَصَلِّ لِرَبِّكَ وَٱنۡحَرۡ",
        translit: "Fa-ṣalli li-rabbika wan-ḥar",
        textFr: "Accomplis la prière pour ton Seigneur et sacrifie.",
        textMg: "Koa mivavaha ho an'ny Tomponao ary manao sorona.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6195.mp3",
      },
      {
        number: 3,
        globalNumber: 6196,
        textArabic: "إِنَّ شَانِئَكَ هُوَ ٱلۡأَبۡتَرُ",
        translit: "Inna shāni'aka huwa l-abtar",
        textFr: "Celui qui te hait sera certes sans postérité.",
        textMg: "Tena ny mpankahala anao tokoa no ho tapaka fara sy tsy hisy mpahatsiaro.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6196.mp3",
      },
    ],
  },

  // 109: Al-Kaafiroon
  109: {
    number: 109,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6197,
        textArabic: "قُلۡ يَٰٓأَيُّهَا ٱلۡكَٰفِرُونَ",
        translit: "Qul yā ayyuhā l-kāfirūn",
        textFr: "Dis : « Ô vous les infidèles !",
        textMg: "Lazao hoe : « Ry mpanota tsy mino !",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6197.mp3",
      },
      {
        number: 2,
        globalNumber: 6198,
        textArabic: "لَآ أَعۡبُدُ مَا تَعۡبُدُونَ",
        translit: "Lā a'budu mā ta'budūn",
        textFr: "Je n'adore pas ce que vous adorez.",
        textMg: "Tsy manompo izay tompoinareo aho,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6198.mp3",
      },
      {
        number: 3,
        globalNumber: 6199,
        textArabic: "وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ",
        translit: "Wa-lā antum 'ābidūna mā a'bud",
        textFr: "Et vous n'êtes pas adorateurs de ce que j'adore.",
        textMg: "Ary ianareo koa tsy manompo Ilay tompoiko.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6199.mp3",
      },
      {
        number: 4,
        globalNumber: 6200,
        textArabic: "وَلَآ أَنَا۠ عَابِدٞ مَّا عَبَدتُّمۡ",
        translit: "Wa-lā ana 'ābidun mā 'abattum",
        textFr: "Je ne suis pas adorateur de ce que vous avez adoré.",
        textMg: "Ary izaho tsy hanompo na oviana na oviana izay efa notompoinareo,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6200.mp3",
      },
      {
        number: 5,
        globalNumber: 6201,
        textArabic: "وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ",
        translit: "Wa-lā antum 'ābidūna mā a'bud",
        textFr: "Et vous n'êtes pas adorateurs de ce que j'adore.",
        textMg: "Ary ianareo koa tsy hanompo Ilay tompoiko.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6201.mp3",
      },
      {
        number: 6,
        globalNumber: 6202,
        textArabic: "لَكُمۡ دِينُكُمۡ وَلِيَ دِينِ",
        translit: "Lakum dīnukum wa-liya dīn",
        textFr: "À vous votre religion, et à moi ma religion. »",
        textMg: "Anareo ny fivavahanareo, ary ahy ny fivavahako. »",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6202.mp3",
      },
    ],
  },

  // 110: An-Nasr
  110: {
    number: 110,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6203,
        textArabic: "إِذَا جَآءَ نَصۡرُ ٱللَّهِ وَٱلۡفَتۡحُ",
        translit: "Idhā jā'a naṣru llāhi wal-fatḥ",
        textFr: "Lorsque vient le secours d'Allah ainsi que la victoire,",
        textMg: "Raha tonga ny famonjen'i Allah sy ny fandresena lehibe,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6203.mp3",
      },
      {
        number: 2,
        globalNumber: 6204,
        textArabic: "وَرَأَيۡتَ ٱلنَّاسَ يَدۡخُلُونَ فِي دِينِ ٱللَّهِ أَفۡوَاجٗا",
        translit: "Wa-ra'ayta n-nāsa yadkhulūna fī dīni llāhi afwājā",
        textFr: "et que tu vois les gens entrer en foule dans la religion d'Allah,",
        textMg: "ary mahita ny olona miditra amin'ny fivavahan'i Allah marobe,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6204.mp3",
      },
      {
        number: 3,
        globalNumber: 6205,
        textArabic: "فَسَبِّحۡ بِحَمۡدِ رَبِّكَ وَٱسۡتَغۡفِرۡهُۚ إِنَّهُۥ كَانَ تَوَّابَۢا",
        translit: "Fa-sabbiḥ bi-ḥamdi rabbika was-taghfirh, innahū kāna tawwābā",
        textFr: "alors par la louange, célèbre la gloire de ton Seigneur et implore Son pardon. Car c'est Lui le grand Accueillant au repentir.",
        textMg: "dia manamasìna amin'ny fiderana ny Tomponao ary mangataha famelan-keloka Aminy. Fa Izy tokoa no Mpandray fibebahana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3",
      },
    ],
  },

  // 112: Al-Ikhlas
  112: {
    number: 112,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6222,
        textArabic: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ",
        translit: "Qul huwa llāhu aḥad",
        textFr: "Dis : « Il est Allah, Unique.",
        textMg: "Lazao hoe : « Izy no Allah, Tokana.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3",
      },
      {
        number: 2,
        globalNumber: 6223,
        textArabic: "ٱللَّهُ ٱلصَّمَدُ",
        translit: "Allāhu ṣ-ṣamad",
        textFr: "Allah, Le Seul à être imploré pour ce que nous désirons.",
        textMg: "Allah, Ilay fialofana sy ilain'ny zava-drehetra.",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3",
      },
      {
        number: 3,
        globalNumber: 6224,
        textArabic: "لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ",
        translit: "Lam yalid wa-lam yūlad",
        textFr: "Il n'a jamais engendré, n'a pas été engendré non plus.",
        textMg: "Tsy miteraka Izy ary tsy nateraka,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3",
      },
      {
        number: 4,
        globalNumber: 6225,
        textArabic: "وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ",
        translit: "Wa-lam yakun lahū kufuwan aḥad",
        textFr: "Et nul n'est égal à Lui. »",
        textMg: "Ary tsy misy na iza na iza mitovy Aminy na oviana na oviana. »",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3",
      },
    ],
  },

  // 113: Al-Falaq
  113: {
    number: 113,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6226,
        textArabic: "قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ",
        translit: "Qul a'ūdhu bi-rabbi l-falaq",
        textFr: "Dis : « Je cherche protection auprès du Seigneur de l'aube naissante,",
        textMg: "Lazao hoe : « Mitady fialofana amin'ny Tompon'ny maraina vao mangiran-dratsy aho,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3",
      },
      {
        number: 2,
        globalNumber: 6227,
        textArabic: "مِن شَرِّ مَا خَلَقَ",
        translit: "Min sharri mā khalaq",
        textFr: "contre le mal des êtres qu'Il a créés,",
        textMg: "manoloana ny ratsy avy amin'izay noforoniny,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3",
      },
      {
        number: 3,
        globalNumber: 6228,
        textArabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        translit: "Wa-min sharri ghāsiqin idhā waqab",
        textFr: "contre le mal de l'obscurité quand elle s'approfondit,",
        textMg: "sy manoloana ny ratsy ateraky ny alina maizina rehefa manjaka,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3",
      },
      {
        number: 4,
        globalNumber: 6229,
        textArabic: "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ",
        translit: "Wa-min sharri n-naffāthāti fī l-'uqad",
        textFr: "contre le mal de celles qui soufflent (les sorcières) sur les nœuds,",
        textMg: "sy manoloana ny ratsy avy amin'ireo mpitsoka amin'ny fatorana (mpamosavy),",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3",
      },
      {
        number: 5,
        globalNumber: 6230,
        textArabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        translit: "Wa-min sharri ḥāsidin idhā ḥasad",
        textFr: "et contre le mal de l'envieux quand il envie. »",
        textMg: "sy manoloana ny ratsy avy amin'ny mialona rehefa mialona Izy. »",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3",
      },
    ],
  },

  // 114: An-Naas
  114: {
    number: 114,
    bismillahPre: true,
    ayahs: [
      {
        number: 1,
        globalNumber: 6231,
        textArabic: "قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
        translit: "Qul a'ūdhu bi-rabbi n-nās",
        textFr: "Dis : « Je cherche protection auprès du Seigneur des hommes,",
        textMg: "Lazao hoe : « Mitady fialofana amin'ny Tompon'ny olombelona aho,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3",
      },
      {
        number: 2,
        globalNumber: 6232,
        textArabic: "مَلِكِ ٱلنَّاسِ",
        translit: "Maliki n-nās",
        textFr: "Le Souverain des hommes,",
        textMg: "Mpanjakan'ny olombelona,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3",
      },
      {
        number: 3,
        globalNumber: 6233,
        textArabic: "إِلَٰهِ ٱلنَّاسِ",
        translit: "Ilāhi n-nās",
        textFr: "Dieu des hommes,",
        textMg: "Andriamanitry ny olombelona,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3",
      },
      {
        number: 4,
        globalNumber: 6234,
        textArabic: "مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ",
        translit: "Min sharri l-waswāsi l-khannās",
        textFr: "contre le mal du mauvais conseiller, furtif,",
        textMg: "manoloana ny fakam-panahy ratsy ataon'ilay mpanakorontana mpiafina,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3",
      },
      {
        number: 5,
        globalNumber: 6235,
        textArabic: "ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ",
        translit: "Al-ladhī yuwaswisu fī ṣudūri n-nās",
        textFr: "qui souffle le mal dans les poitrines des hommes,",
        textMg: "izay mibitsibitsika ratsy ao anaty fon'ny olombelona,",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3",
      },
      {
        number: 6,
        globalNumber: 6236,
        textArabic: "مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ",
        translit: "Mina l-jinnati wan-nās",
        textFr: "qu'il soit d'entre les djinns ou les hommes. »",
        textMg: "na avy amin'ny jiny izany na avy amin'ny olombelona. »",
        audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3",
      },
    ],
  },
};
