/** Cartoon series available on PixelTales */
export const CARTOONS = [
  { id: 'doraemon', name: 'Doraemon' },
  { id: 'pokemon', name: 'Pokemon' },
  { id: 'shinchan', name: 'Shinchan' },
  { id: 'perman', name: 'Perman' },
  { id: 'oggy-and-the-cockroaches', name: 'Oggy and the Cockroaches' },
  { id: 'pakdam-pakdai', name: 'Pakdam Pakdai' },
]

export const CURRENT_USER = {
  id: 'user-1',
  name: 'Krishna Chaurasiya',
  email: 'chkrishna6590@gmail.com',
  avatarGradient:
    'linear-gradient(135deg, var(--color-turquoise-400), var(--color-turquoise-700))',
}

export const USER_STATS = {
  watched: 2,
  favorites: 10,
  inProgress: 5,
}

/** Canonical movie catalog — single source of truth for PixelTales */
export const cartoonGradients = {
  doraemon:
    "linear-gradient(135deg, #3FA9F5 0%, #1E88E5 25%, #1565C0 60%, #0D47A1 100%)",
  pokemon:
    "linear-gradient(135deg, #FFD54F 0%, #FFCA28 25%, #F9A825 65%, #E65100 100%)",

  // Shinchan
  shinchan:
    "linear-gradient(135deg, #FF8A80 0%, #FF5252 30%, #E53935 65%, #B71C1C 100%)",

  // Oggy and the Cockroaches
  oggyAndTheCockroaches:
    "linear-gradient(135deg, #6DD5FA 0%, #29B6F6 35%, #0288D1 70%, #01579B 100%)",

  // Pakdam Pakdai
  "pakdamPakdai":
    "linear-gradient(135deg, #66BB6A 0%, #43A047 35%, #2E7D32 70%, #1B5E20 100%)",

  // Perman
  perman:
    "linear-gradient(135deg, #7C4DFF 0%, #5E35B1 35%, #3949AB 70%, #1A237E 100%)",
};

function makeMovie(id, title, cartoonId, year, extra = {}) {
  const { rating, thumbnail, favorited, progress, likes, commentsCount, duration, ...detail } = extra;

  // Deterministic-looking seed numbers based on the movie id string
  const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const defaultLikes    = 12 + (seed % 89);
  const defaultComments = 3  + (seed % 27);

  return {
    id,
    title,
    cartoonId,
    year,
    rating:        rating        ?? 4.5,
    thumbnail:     thumbnail     ?? '',
    gradient:      cartoonGradients[cartoonId],
    favorited:     favorited     ?? false,
    progress:      progress      ?? null,
    likes:         likes         ?? defaultLikes,
    commentsCount: commentsCount ?? defaultComments,
    duration:      duration      ?? null,
    ...detail,
  };
}


export const ALL_MOVIES = [
  // ==========================================
  // DORAEMON MOVIES
  // ==========================================


  //error due to remaike version information of little dynasour
  // makeMovie("d1", "Doraemon: Nobita's Dinosaur", "doraemon", 1980, {    rating: 4.6,
  //   thumbnail: "",
  // }),

  // makeMovie(
  //   "d2",
  //   "Doraemon: The Records of Nobita, Spaceblazer",
  //   "doraemon",
  //   1981,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),

  // makeMovie("d3", "Doraemon: Nobita and the Haunts of Evil", "doraemon", 1982, {    rating: 4.5,
  //   thumbnail: "",
  // }),
  
  // makeMovie(
  //   "d4",
  //   "Doraemon: Nobita and the Castle of the Undersea Devil",
  //   "doraemon",
  //   1983,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d5",
  //   "Doraemon: Nobita's Great Adventure into the Underworld",
  //   "doraemon",
  //   1984,
  //   { cartoon: "doraemon", rating: 4.7, thumbnail: "" }
  // ),
  // makeMovie("d6", "Doraemon: Nobita's Little Star Wars", "doraemon", 1985, {    rating: 4.5,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d7",
  //   "Doraemon: Nobita and the Steel Troops",
  //   "doraemon",
  //   1986,
  //   { cartoon: "doraemon", rating: 4.8, favorited: true, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d8",
  //   "Doraemon: Nobita and the Knights on Dinosaurs",
  //   "doraemon",
  //   1987,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d9",
  //   "Doraemon: The Record of Nobita's Parallel Visit to the West",
  //   "doraemon",
  //   1988,
  //   { cartoon: "doraemon", rating: 4.3, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d10",
  //   "Doraemon: Nobita and the Birth of Japan",
  //   "doraemon",
  //   1989,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie("d11", "Doraemon: Nobita and the Animal Planet", "doraemon", 1990, {    rating: 4.5,
  //   thumbnail: "",
  // }),
  // makeMovie("d12", "Doraemon: Nobita's Dorabian Nights", "doraemon", 1991, {    rating: 4.6,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d13",
  //   "Doraemon: Nobita and the Kingdom of Clouds",
  //   "doraemon",
  //   1992,
  //   { cartoon: "doraemon", rating: 4.7, progress: 85, thumbnail: "" }
  // ),
  // makeMovie("d14", "Doraemon: Nobita and the Tin Labyrinth", "doraemon", 1993, {    rating: 4.4,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d15",
  //   "Doraemon: Nobita's Three Visionary Swordsmen",
  //   "doraemon",
  //   1994,
  //   { cartoon: "doraemon", rating: 4.5, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d16",
  //   "Doraemon: Nobita's Diary on the Creation of the World",
  //   "doraemon",
  //   1995,
  //   { cartoon: "doraemon", rating: 4.2, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d17",
  //   "Doraemon: Nobita and the Galaxy Super-express",
  //   "doraemon",
  //   1996,
  //   { cartoon: "doraemon", rating: 4.7, progress: 40, thumbnail: "" }
  // ),
  // makeMovie("d18", "Doraemon: Nobita and the Spiral City", "doraemon", 1997, {    rating: 4.4,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d19",
  //   "Doraemon: Nobita's Great Adventure in the South Seas",
  //   "doraemon",
  //   1998,
  //   { cartoon: "doraemon", rating: 4.5, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d20",
  //   "Doraemon: Nobita Drifts in the Universe",
  //   "doraemon",
  //   1999,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d21",
  //   "Doraemon: Nobita and the Legend of the Sun King",
  //   "doraemon",
  //   2000,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie("d22", "Doraemon: Nobita and the Winged Braves", "doraemon", 2001, {    rating: 4.5,
  //   thumbnail: "",
  // }),
  // makeMovie("d23", "Doraemon: Nobita in the Robot Kingdom", "doraemon", 2002, {    rating: 4.3,
  //   thumbnail: "",
  // }),
  // makeMovie("d24", "Doraemon: Nobita and the Windmasters", "doraemon", 2003, {    rating: 4.6,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d25",
  //   "Doraemon: Nobita in the Wan-Nyan Spacetime Odyssey", // Itchi mera Dost
  //   "doraemon",
  //   2004,
  //   { cartoon: "doraemon", rating: 4.7, thumbnail: "" }
  // ),
  // makeMovie("d26", "Doraemon: Nobita's Dinosaur 2006", "doraemon", 2006, {    rating: 4.5,
  //   progress: 62,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d27",
  //   "Doraemon: Nobita's New Great Adventure into the Underworld",
  //   "doraemon",
  //   2007,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d28",
  //   "Doraemon: Nobita and the Green Giant Legend",
  //   "doraemon",
  //   2008,
  //   { cartoon: "doraemon", rating: 4.2, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d29",
  //   "Doraemon: Adventure of Koya Koya Planet", //koya koya planet
  //   "doraemon",
  //   2009,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d30",
  //   "Doraemon: Nobita's Great Battle of the Mermaid King",
  //   "doraemon",
  //   2010,
  //   { cartoon: "doraemon", rating: 4.3, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d31",
  //   "Doraemon: Nobita and the New Steel Troops ~Winged Angels~",
  //   "doraemon",
  //   2011,
  //   { cartoon: "doraemon", rating: 4.8, favorited: true, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d32",
  //   "Doraemon: Nobita and the Island of Miracles ~Animal Adventure~",
  //   "doraemon",
  //   2012,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d33",
  //   "Doraemon: Nobita's Secret Gadget Museum",
  //   "doraemon",
  //   2013,
  //   { cartoon: "doraemon", rating: 4.7, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d34",
  //   "Doraemon: New Nobita's Great Demon ~Peko and the Exploration Party of 5~",
  //   "doraemon",
  //   2014,
  //   { cartoon: "doraemon", rating: 4.5, thumbnail: "" }
  // ),
  // makeMovie("d35", "Doraemon: Stand by Me Doraemon", "doraemon", 2014, {    rating: 4.9,
  //   favorited: true,
  //   progress: 100,
  //   thumbnail: "",
  // }),
  // makeMovie("d36", "Doraemon: Nobita's Space Heroes", "doraemon", 2015, {    rating: 4.3,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d37",
  //   "Doraemon: Nobita and the Birth of Japan 2016",
  //   "doraemon",
  //   2016,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie(
  //   "d38",
  //   "Doraemon: Nobita's Great Adventure in the Antarctic Kachi Kochi",
  //   "doraemon",
  //   2017,
  //   { cartoon: "doraemon", rating: 4.5, thumbnail: "" }
  // ),
  // makeMovie("d39", "Doraemon: Nobita's Treasure Island", "doraemon", 2018, {    rating: 4.7,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d40",
  //   "Doraemon: Nobita's Chronicle of the Moon Exploration",
  //   "doraemon",
  //   2019,
  //   { cartoon: "doraemon", rating: 4.6, thumbnail: "" }
  // ),
  // makeMovie("d41", "Doraemon: Nobita's New Dinosaur", "doraemon", 2020, {    rating: 4.6,
  //   thumbnail: "",
  // }),
  // makeMovie("d42", "Doraemon: Stand by Me Doraemon 2", "doraemon", 2020, {    rating: 4.8,
  //   progress: 12,
  //   thumbnail: "",
  // }),
  // makeMovie(
  //   "d43",
  //   "Doraemon: Nobita's Little Star Wars 2021",
  //   "doraemon",
  //   2022,
  //   { cartoon: "doraemon", rating: 4.4, thumbnail: "" }
  // ),
  // makeMovie("d44", "Doraemon: Nobita's Sky Utopia", "doraemon", 2023, {    rating: 4.7,
  //   thumbnail: "",
  // }),
  // makeMovie("d45", "Doraemon: Nobita's Earth Symphony", "doraemon", 2024, {    rating: 4.6,
  //   thumbnail: "",
  // }),

  // ==========================================
  // Pokemon MOVIES
  // ==========================================
  makeMovie(
    "p1",
    "Pokemon: The First Movie - Mewtwo Strikes Back",
    "pokemon",
    1998,
    { cartoon: "pokemon", rating: 4.9, favorited: true, thumbnail: "" }
  ),
  makeMovie("p2", "Pokemon: The Power of One", "pokemon", 1999, {    rating: 4.7,
    thumbnail: "",
  }),
  makeMovie("p3", "Pokemon: Spell of the Unown: Entei", "pokemon", 2000, {    rating: 4.6,
    thumbnail: "",
  }),
  makeMovie(
    "p4",
    "Pokemon: 4Ever - Celebi: The Voice of the Forest",
    "pokemon",
    2001,
    { cartoon: "pokemon", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "p5",
    "Pokemon:Pokemon Heroes - Latios and Latias",
    "pokemon",
    2002,
    { cartoon: "pokemon", rating: 4.7, thumbnail: "" }
  ),
  makeMovie("p6", "Pokemon: Jirachi - Wish Maker", "pokemon", 2003, {    rating: 4.4,
    thumbnail: "",
  }),
  makeMovie("p7", "Pokemon: Destiny Deoxys", "pokemon", 2004, {    rating: 4.6,
    thumbnail: "",
  }),
  makeMovie("p8", "Pokemon: Lucario and the Mystery of Mew", "pokemon", 2005, {    rating: 4.8,
    favorited: true,
    thumbnail: "",
  }),
  makeMovie(
    "p9",
    "Pokemon: Pokemon Ranger and the Temple of the Sea",
    "pokemon",
    2006,
    { cartoon: "pokemon", rating: 4.3, thumbnail: "" }
  ),
  makeMovie("p10", "Pokemon: The Rise of Darkrai", "pokemon", 2007, {    rating: 4.7,
    thumbnail: "",
  }),
  makeMovie("p11", "Pokemon: Giratina and the Sky Warrior", "pokemon", 2008, {    rating: 4.5,
    thumbnail: "",
  }),
  makeMovie("p12", "Pokemon: Arceus and the Jewel of Life", "pokemon", 2009, {    rating: 4.6,
    thumbnail: "",
  }),
  makeMovie("p13", "Pokemon: Zoroark - Master of Illusions", "pokemon", 2010, {    rating: 4.5,
    thumbnail: "",
  }),
  makeMovie("p14", "Pokemon: Black—Victini and Reshiram", "pokemon", 2011, {    rating: 4.4,
    thumbnail: "",
  }),
  makeMovie("p15", "Pokemon: White—Victini and Zekrom", "pokemon", 2011, {    rating: 4.4,
    thumbnail: "",
  }),
  makeMovie(
    "p16",
    "Pokemon: Kyurem vs. the Sword of Justice",
    "pokemon",
    2012,
    { cartoon: "pokemon", rating: 4.2, thumbnail: "" }
  ),
  makeMovie(
    "p17",
    "Pokemon: Genesect and the Legend Awakened",
    "pokemon",
    2013,
    { cartoon: "pokemon", rating: 4.3, thumbnail: "" }
  ),
  makeMovie(
    "p18",
    "Pokemon: Diancie and the Cocoon of Destruction",
    "pokemon",
    2014,
    { cartoon: "pokemon", rating: 4.4, thumbnail: "" }
  ),
  makeMovie("p19", "Pokemon: Hoopa and the Clash of Ages", "pokemon", 2015, {    rating: 4.3,
    thumbnail: "",
  }),
  makeMovie(
    "p20",
    "Pokemon: Volcanion and the Mechanical Marvel",
    "pokemon",
    2016,
    { cartoon: "pokemon", rating: 4.5, thumbnail: "" }
  ),
  makeMovie("p21", "Pokemon: I Choose You!", "pokemon", 2017, {    rating: 4.6,
    progress: 28,
    thumbnail: "",
  }),
  makeMovie("p22", "Pokemon: The Power of Us", "pokemon", 2018, {    rating: 4.5,
    thumbnail: "",
  }),
  makeMovie("p23", "Pokemon: Mewtwo Strikes Back—Evolution", "pokemon", 2019, {    rating: 4.4,
    thumbnail: "",
  }),
  makeMovie("p24", "Pokemon: Detective Pikachu", "pokemon", 2019, {    rating: 4.6,
    thumbnail: "",
  }),
  makeMovie("p25", "Pokemon: Secrets of the Jungle", "pokemon", 2020, {    rating: 4.7,
    thumbnail: "",
  }),

  // ==========================================
  // SHIN-CHAN MOVIES
  // ==========================================
  makeMovie("s1", "Shinchan: Action Mask vs. Leotard Devil", "shinchan", 1993, {    rating: 4.5,
    thumbnail: "",
  }),
  makeMovie(
    "s2",
    "Shinchan: The Secret Treasure of Buri Buri Kingdom",
    "shinchan",
    1994,
    { cartoon: "shinchan", rating: 4.4, thumbnail: "" }
  ),
  makeMovie("s3", "Shinchan: Unkokusai's Ambition", "shinchan", 1995, {    rating: 4.3,
    thumbnail: "",
  }),
  makeMovie("s4", "Shinchan: Great Adventure in Henderland", "shinchan", 1996, {    rating: 4.6,
    thumbnail: "",
  }),
  makeMovie(
    "s5",
    "Shinchan: Pursuit of the Balls of Darkness",
    "shinchan",
    1997,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "s6",
    "Shinchan: Blitzkrieg! Pig's Hoof's Secret Mission",
    "shinchan",
    1998,
    { cartoon: "shinchan", rating: 4.6, thumbnail: "" }
  ),
  makeMovie(
    "s7",
    "Shinchan: Explosion! The Hot Spring's Feel Good Final Battle",
    "shinchan",
    1999,
    { cartoon: "shinchan", rating: 4.4, thumbnail: "" }
  ),
  makeMovie("s8", "Shinchan: Jungle That Invites Storm", "shinchan", 2000, {    rating: 4.5,
    thumbnail: "",
  }),
  makeMovie(
    "s9",
    "Shinchan: Fierceness That Invites Storm! The Adult Empire Strikes Back",
    "shinchan",
    2001,
    { cartoon: "shinchan", rating: 4.9, favorited: true, thumbnail: "" }
  ),
  makeMovie(
    "s10",
    "Shinchan: Fierceness That Invites Storm! The Battle of the Warring States",
    "shinchan",
    2002,
    { cartoon: "shinchan", rating: 4.8, thumbnail: "" }
  ),
  makeMovie(
    "s11",
    "Shinchan: Fierceness That Invites Storm! Yakiniku Road of Honor",
    "shinchan",
    2003,
    { cartoon: "shinchan", rating: 4.7, thumbnail: "" }
  ),
  makeMovie(
    "s12",
    "Shinchan: Fierceness That Invites Storm! The Kasukabe Boys of the Evening Sun",
    "shinchan",
    2004,
    { cartoon: "shinchan", rating: 4.6, thumbnail: "" }
  ),
  makeMovie(
    "s13",
    "Shinchan: The Legend Called Buri Buri 3 Minutes Charge",
    "shinchan",
    2005,
    { cartoon: "shinchan", rating: 4.2, thumbnail: "" }
  ),
  makeMovie(
    "s14",
    "Shinchan: The Legend Called: Dance! Amigo!",
    "shinchan",
    2006,
    { cartoon: "shinchan", rating: 4.3, thumbnail: "" }
  ),
  makeMovie(
    "s15",
    "Shinchan: Fierceness That Invites Storm! The Singing Buttocks Bomb",
    "shinchan",
    2007,
    { cartoon: "shinchan", rating: 4.4, thumbnail: "" }
  ),
  makeMovie(
    "s16",
    "Shinchan: Fierceness That Invites Storm! The Hero of Kinpoko",
    "shinchan",
    2008,
    { cartoon: "shinchan", rating: 4.1, thumbnail: "" }
  ),
  makeMovie(
    "s17",
    "Shinchan: Roar! Kasukabe Animal Kingdom",
    "shinchan",
    2009,
    { cartoon: "shinchan", rating: 4.3, thumbnail: "" }
  ),
  makeMovie(
    "s18",
    "Shinchan: Super-Dimension! The Storm Called My Bride",
    "shinchan",
    2010,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "s19",
    "Shinchan: Fierceness That Invites Storm! Operation Golden Spy",
    "shinchan",
    2011,
    { cartoon: "shinchan", rating: 4.4, thumbnail: "" }
  ),
  makeMovie(
    "s20",
    "Shinchan: Fierceness That Invites Storm! Me and the Space Princess",
    "shinchan",
    2012,
    { cartoon: "shinchan", rating: 4.2, thumbnail: "" }
  ),
  makeMovie(
    "s21",
    "Shinchan: Very Tasty! B-class Gourmet Survival!!",
    "shinchan",
    2013,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "s22",
    "Shinchan: Intense Battle! Robo Dad Strikes Back",
    "shinchan",
    2014,
    { cartoon: "shinchan", rating: 4.8, favorited: true, thumbnail: "" }
  ),
  makeMovie(
    "s23",
    "Shinchan: My Moving Story! Cactus Large Attack!",
    "shinchan",
    2015,
    { cartoon: "shinchan", rating: 4.6, thumbnail: "" }
  ),
  makeMovie(
    "s24",
    "Shinchan: Fast Asleep! The Great Assault on Dreamy World!",
    "shinchan",
    2016,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie("s25", "Shinchan: Invasion!! Alien Shiriri", "shinchan", 2017, {    rating: 4.4,
    thumbnail: "",
  }),
  makeMovie(
    "s26",
    "Shinchan: Burst Serving! Kung Fu Boys ~Ramen Rebellion~",
    "shinchan",
    2018,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "s27",
    "Shinchan: Honeymoon Hurricane ~The Lost Hiroshi~",
    "shinchan",
    2019,
    { cartoon: "shinchan", rating: 4.6, thumbnail: "" }
  ),
  makeMovie(
    "s28",
    "Shinchan: Crash! Graffiti Kingdom and Almost Four Heroes",
    "shinchan",
    2020,
    { cartoon: "shinchan", rating: 4.4, thumbnail: "" }
  ),
  makeMovie(
    "s29",
    "Shinchan: Shrouded in Mystery! The Flowers of Tenkasu Academy",
    "shinchan",
    2021,
    { cartoon: "shinchan", rating: 4.7, thumbnail: "" }
  ),
  makeMovie(
    "s30",
    "Shinchan: The Tornado Legend of Ninja Mononoke",
    "shinchan",
    2022,
    { cartoon: "shinchan", rating: 4.5, thumbnail: "" }
  ),
  makeMovie(
    "s31",
    "Shinchan: Battle of Supernatural Powers",
    "shinchan",
    2023,
    { cartoon: "shinchan", rating: 4.6, thumbnail: "" }
  ),
  makeMovie("s32", "Shinchan: Our Dinosaur Diary", "shinchan", 2024, {    rating: 4.5,
    thumbnail: "",
  }),
];

const movieById = new Map(ALL_MOVIES.map((m) => [m.id, m]));

export function getMovieById(id) {
  return movieById.get(id);
}

export function getMoviesByIds(ids = []) {
  return ids.map((id) => movieById.get(id)).filter(Boolean);
}

export function getRecommendedMovies(movie, limit = 12) {
  if (!movie?.recommendedMovieIds?.length) return [];
  return getMoviesByIds(movie.recommendedMovieIds).slice(0, limit);
}

export const CONTINUE_WATCHING = ALL_MOVIES.filter((m) => m.progress != null);

export const WATCH_HISTORY = ALL_MOVIES.filter(
  (m) => m.progress != null && m.progress >= 80,
);

export const PARTY_MOVIE_OPTIONS = ALL_MOVIES.slice(0, 6);

export const FEEDBACK_TYPES = [
  { id: 'bug', label: 'Bug Report', icon: '🐛' },
  { id: 'feature', label: 'Feature Request', icon: '💡' },
  { id: 'content', label: 'Content Request', icon: '🎬' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
  { id: 'compliment', label: 'Compliment', icon: '👍' },
  { id: 'question', label: 'Question', icon: '❓' },
  { id: 'other', label: 'Other', icon: '📝' },
];

export const SENTIMENT_EMOJIS = [
  { id: "love", emoji: "😍", label: "Love it" },
  { id: "happy", emoji: "😊", label: "Happy" },
  { id: "laugh", emoji: "😂", label: "Funny" },
  { id: "wow", emoji: "🤩", label: "Amazing" },
  { id: "fire", emoji: "🔥", label: "Awesome" },
  { id: "cool", emoji: "😎", label: "Cool" },
  { id: "heart", emoji: "❤️", label: "Favorite" },
  { id: "clap", emoji: "👏", label: "Well Done" },
  { id: "rocket", emoji: "🚀", label: "Exciting" },
  { id: "star", emoji: "⭐", label: "Top Rated" },
  { id: "neutral", emoji: "😐", label: "Neutral" },
  { id: "confused", emoji: "🤔", label: "Confusing" },
  { id: "bored", emoji: "🥱", label: "Boring" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "angry", emoji: "😠", label: "Angry" },
];

export const COMMUNITY_FEEDBACK = [
  {
    id: "f1",
    user: "AnimeFan42",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "😊",
    date: "June 03, 2026",
    message:
      "PixelTales is amazing! Love watching Doraemon and Pokemon with my kids every weekend.",
  },
  {
    id: "f2",
    user: "CartoonLover",
    type: "Feature Request",
    typeIcon: "💡",
    emoji: "😍",
    date: "June 01, 2026",
    message:
      "Would love a download option for offline viewing during travel. Keep up the great work!",
  },
  {
    id: "f3",
    user: "ShinchanFan",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "😊",
    date: "May 28, 2026",
    message:
      "Finally found Shinchan movies in one place. The watch party feature is super fun!",
  },
  {
    id: "f4",
    user: "NostalgiaKing",
    type: "Content Request",
    typeIcon: "🎬",
    emoji: "🤩",
    date: "May 25, 2026",
    message:
      "Can you guys please add the older Digimon movies? That would complete my childhood collection!",
  },
  {
    id: "f5",
    user: "SpeedyGonzales",
    type: "Performance",
    typeIcon: "⚡",
    emoji: "🚀",
    date: "May 22, 2026",
    message:
      "The streaming quality is insanely fast. I never get any buffering even on my mobile data.",
  },
  {
    id: "f6",
    user: "PikaPika",
    type: "Bug Report",
    typeIcon: "🐛",
    emoji: "😢",
    date: "May 20, 2026",
    message:
      "The subtitles for Pokemon: The First Movie get slightly out of sync around the 45-minute mark.",
  },
  {
    id: "f7",
    user: "GokuSon",
    type: "Question",
    typeIcon: "❓",
    emoji: "🤔",
    date: "May 19, 2026",
    message:
      "Is there a way to cast the player directly to a Roku TV? I only see Chromecast right now.",
  },
  {
    id: "f8",
    user: "MangaReader",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "❤️",
    date: "May 15, 2026",
    message:
      "The UI is incredibly clean. It feels much better than most mainstream streaming apps.",
  },
  {
    id: "f9",
    user: "NightOwl",
    type: "Other",
    typeIcon: "📝",
    emoji: "🥱",
    date: "May 12, 2026",
    message:
      'I stay up way too late watching these movies. Need a "sleep timer" so it stops playing when I pass out.',
  },
  {
    id: "f10",
    user: "TechGeek",
    type: "Bug Report",
    typeIcon: "🐛",
    emoji: "😠",
    date: "May 10, 2026",
    message:
      "The app crashes when I try to switch from full-screen back to portrait mode on my iPad.",
  },
  {
    id: "f11",
    user: "DoraemonStan",
    type: "Feature Request",
    typeIcon: "💡",
    emoji: "⭐",
    date: "May 08, 2026",
    message:
      'It would be cool to have a "Skip Intro" button for the anime movies that have long opening credits.',
  },
  {
    id: "f12",
    user: "OtakuLife",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "🔥",
    date: "May 05, 2026",
    message:
      "Absolutely cracked platform! The quality is top tier and no annoying pop-up ads.",
  },
  {
    id: "f13",
    user: "BingeWatcher",
    type: "Content Request",
    typeIcon: "🎬",
    emoji: "😍",
    date: "May 02, 2026",
    message:
      "Please add the Naruto Shippuden movies next! I just finished all the classic Naruto ones you have.",
  },
  {
    id: "f14",
    user: "CasualViewer",
    type: "Question",
    typeIcon: "❓",
    emoji: "🤔",
    date: "April 28, 2026",
    message:
      "How often do you guys update the library? Is there a schedule for new releases?",
  },
  {
    id: "f15",
    user: "SatoshiTajiri",
    type: "Performance",
    typeIcon: "⚡",
    emoji: "👏",
    date: "April 25, 2026",
    message:
      "Video compression is great. Doesn't eat up my bandwidth but still looks crisp on a 4K screen.",
  },
  {
    id: "f16",
    user: "NinjaWay",
    type: "Other",
    typeIcon: "📝",
    emoji: "😂",
    date: "April 20, 2026",
    message:
      "Rewatching these as an adult makes me realize how unhinged some of the jokes in Shinchan really were lol.",
  },
  {
    id: "f17",
    user: "DesignNerd",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "😎",
    date: "April 18, 2026",
    message:
      "Props to the dev team. The animations on the buttons and the dark theme are just *chef's kiss*.",
  },
  {
    id: "f18",
    user: "SadBoy2001",
    type: "Bug Report",
    typeIcon: "🐛",
    emoji: "😐",
    date: "April 15, 2026",
    message:
      "My watch progress isn't saving properly. Whenever I refresh, it starts the movie from the beginning.",
  },
  {
    id: "f19",
    user: "MovieBuff",
    type: "Feature Request",
    typeIcon: "💡",
    emoji: "🤩",
    date: "April 12, 2026",
    message:
      "Would be awesome if you added user reviews or a 5-star rating system directly on the movie cards!",
  },
  {
    id: "f20",
    user: "GhibliFan",
    type: "Content Request",
    typeIcon: "🎬",
    emoji: "❤️",
    date: "April 09, 2026",
    message:
      "Any plans to add Studio Ghibli films? Spirited Away or Howl's Moving Castle would be perfect here.",
  },
  {
    id: "f21",
    user: "SlowInternet",
    type: "Performance",
    typeIcon: "⚡",
    emoji: "🥱",
    date: "April 05, 2026",
    message:
      "The initial load time of the website takes a bit long, though the video playback is perfectly fine.",
  },
  {
    id: "f22",
    user: "ActionBastard",
    type: "Question",
    typeIcon: "❓",
    emoji: "🤔",
    date: "April 01, 2026",
    message:
      "Are there any plans to implement a premium tier for 4K streaming, or will it stay free forever?",
  },
  {
    id: "f23",
    user: "HappyCamper",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "😊",
    date: "March 28, 2026",
    message:
      "I use this site every day on my lunch break. Really brightens my day, thank you to the creators!",
  },
  {
    id: "f24",
    user: "MistyWaterflower",
    type: "Other",
    typeIcon: "📝",
    emoji: "😎",
    date: "March 25, 2026",
    message:
      "Just wanted to drop by and say the new layout update is a massive improvement. Looks sleek!",
  },
  {
    id: "f25",
    user: "TiredParent",
    type: "Feature Request",
    typeIcon: "💡",
    emoji: "👏",
    date: "March 20, 2026",
    message:
      'A "Kids Mode" profile that locks out settings and only shows age-appropriate content would be a lifesaver.',
  },
  {
    id: "f26",
    user: "DubHater",
    type: "Bug Report",
    typeIcon: "🐛",
    emoji: "😠",
    date: "March 15, 2026",
    message:
      "For Doraemon Movie 14, the audio track switches from Japanese to English dub halfway through. Please fix!",
  },
  {
    id: "f27",
    user: "WeebWarrior",
    type: "Content Request",
    typeIcon: "🎬",
    emoji: "🔥",
    date: "March 10, 2026",
    message:
      "Need the Dragon Ball Super movies on here ASAP! The Broly movie animation goes incredibly hard.",
  },
  {
    id: "f28",
    user: "CodeMonkey",
    type: "Compliment",
    typeIcon: "👍",
    emoji: "🚀",
    date: "March 05, 2026",
    message:
      "As a fellow developer, the performance optimization on this platform is genuinely impressive.",
  },
  {
    id: "f29",
    user: "ConfusedUser",
    type: "Question",
    typeIcon: "❓",
    emoji: "🤔",
    date: "March 01, 2026",
    message:
      "Where do I find the toggle to turn on closed captions? I can't seem to locate it on the mobile player.",
  },
  {
    id: "f30",
    user: "NostalgiaTrip",
    type: "Other",
    typeIcon: "📝",
    emoji: "😢",
    date: "February 25, 2026",
    message:
      "Watching the first Pokemon movie again made me cry just like it did in theaters 20 years ago. Beautiful.",
  },
];

export const COMMUNITY_REVIEWS = [
  {
    id: 1,
    user: "AnimeFan42",
    email: "animefan42@example.com",
    rating: 5,
    likes: 24,
    dislikes: 1,
    date: "May 20, 2026",
    review:
      "One of the most emotional Doraemon movies ever. The ending made me cry.",
  },
  {
    id: 2,
    user: "CartoonLover",
    email: "cartoonlover@example.com",
    rating: 4,
    likes: 18,
    dislikes: 2,
    date: "May 18, 2026",
    review:
      "Beautiful animation and storytelling. A must watch for Doraemon fans.",
  },
  {
    id: 3,
    user: "PokemonMaster",
    email: "pokemonmaster@example.com",
    rating: 5,
    likes: 31,
    dislikes: 3,
    date: "May 15, 2026",
    review:
      "Best Pokemon movie in the franchise. Great action and emotional moments.",
  },
  {
    id: 4,
    user: "ShinchanFan",
    email: "shinchanfan@example.com",
    rating: 4,
    likes: 16,
    dislikes: 1,
    date: "May 12, 2026",
    review:
      "Funny, nostalgic and surprisingly deep. One of Shinchan's finest films.",
  },
  {
    id: 5,
    user: "OtakuKing",
    email: "otakuking@example.com",
    rating: 3,
    likes: 9,
    dislikes: 5,
    date: "May 10, 2026",
    review: "Good movie overall but pacing felt slow in the middle.",
  },
  {
    id: 6,
    user: "MovieExplorer",
    email: "movieexplorer@example.com",
    rating: 5,
    likes: 22,
    dislikes: 0,
    date: "May 08, 2026",
    review: "Excellent visuals and soundtrack. Arceus was amazing.",
  },
  {
    id: 7,
    user: "NostalgiaTrip",
    email: "nostalgiatrip@example.com",
    rating: 5,
    likes: 45,
    dislikes: 2,
    date: "May 05, 2026",
    review:
      "I went into this expecting a simple children's story, but I was completely blown away by the mature themes it tackled. The animation quality is a massive step up from the weekly television series, with beautifully rendered backgrounds and incredibly fluid action sequences. It really made me feel like a kid again sitting in front of the TV on a Sunday morning.",
  },
  {
    id: 8,
    user: "GamerDad",
    email: "gamerdad88@example.com",
    rating: 4,
    likes: 34,
    dislikes: 4,
    date: "May 02, 2026",
    review:
      "Watched this with my kids and I think I ended up enjoying it more than they did! The plot regarding the adult empire and the villain's obsession with the 20th century was surprisingly profound. It asks really good questions about nostalgia versus looking forward to the future. A bit too deep for the little ones, but highly entertaining.",
  },
  {
    id: 9,
    user: "MistyWaterflower",
    email: "mistygymleader@example.com",
    rating: 4,
    likes: 28,
    dislikes: 3,
    date: "April 29, 2026",
    review:
      "The first 3D CGI movie in the franchise, and they honestly nailed it. The character models look fantastic and the lighting adds so much emotion to the dramatic scenes. My only complaint is that the story feels a bit rushed because they tried to cram three different classic manga chapters into a single hour-and-a-half film.",
  },
  {
    id: 10,
    user: "ShadowNinja",
    email: "hiddenleafhero@example.com",
    rating: 3,
    likes: 12,
    dislikes: 8,
    date: "April 25, 2026",
    review:
      "The fight choreography was absolutely top-notch, as expected from this studio, but the overarching villain felt incredibly generic. It felt like they just copy-pasted the bad guy from the previous movie and gave him a new color palette. Still worth a watch for the final 20 minutes alone, which feature some of the best animation I've seen all year.",
  },
  {
    id: 11,
    user: "PikaPal",
    email: "pikapalsatoshi@example.com",
    rating: 5,
    likes: 56,
    dislikes: 1,
    date: "April 22, 2026",
    review:
      "The orchestral soundtrack in this movie deserves an Oscar. From the moment the legendary birds appear on screen, the music elevates the entire experience into an epic mythological tale. I've rewatched this specific movie at least ten times and the climax still gives me goosebumps. Absolute cinema.",
  },
  {
    id: 12,
    user: "ActionBastardFan",
    email: "actionbastard@example.com",
    rating: 4,
    likes: 19,
    dislikes: 2,
    date: "April 18, 2026",
    review:
      "Classic crude humor mixed with an absurdly high-stakes spy plot. Watching a five-year-old completely dismantle an international crime syndicate using nothing but pure chaos and a dance routine is something you can only find in this franchise. The pacing is a bit frantic, but you won't stop laughing.",
  },
  {
    id: 13,
    user: "TimeTraveler",
    email: "timemachine@example.com",
    rating: 4,
    likes: 21,
    dislikes: 3,
    date: "April 15, 2026",
    review:
      "The time-travel paradoxes in this one actually held together really well! Usually, cartoon movies hand-wave the sci-fi elements, but the writers clearly put thought into how the past and future timelines interacted. The emotional payoff when Nobita realizes what he has to do is fantastic.",
  },
  {
    id: 14,
    user: "CritiqueMaster",
    email: "critiquemaster99@example.com",
    rating: 2,
    likes: 5,
    dislikes: 15,
    date: "April 10, 2026",
    review:
      "Honestly, a massive letdown. They hyped up this crossover for months, but the two main casts barely interact until the last act. The pacing is incredibly slow, and the dialogue feels incredibly unnatural, almost like it was translated poorly or rushed through the localization process.",
  },
  {
    id: 15,
    user: "RocketGrunt",
    email: "teamrocketforever@example.com",
    rating: 5,
    likes: 42,
    dislikes: 0,
    date: "April 05, 2026",
    review:
      "Finally, a movie that gives the villains some actual character development! Seeing things from the antagonists' perspective for the first half of the film was a brilliant narrative choice. It makes the final confrontation feel so much more tragic because you understand exactly why both sides are fighting.",
  },
  {
    id: 16,
    user: "GadgetGeek",
    email: "futuregadgets@example.com",
    rating: 4,
    likes: 15,
    dislikes: 1,
    date: "April 02, 2026",
    review:
      "I loved seeing all the obscure gadgets from the early 80s episodes make a comeback here. It was basically a giant Easter egg hunt for hardcore fans. The mystery aspect of the museum was well-written, even if the true culprit was a little obvious to older viewers.",
  },
  {
    id: 17,
    user: "SadBoy2001",
    email: "sadboyvibes@example.com",
    rating: 5,
    likes: 38,
    dislikes: 2,
    date: "March 29, 2026",
    review:
      "I didn't expect a movie about a robotic cat to give me an existential crisis about growing up and leaving childhood behind. The montage scene showing the passage of time without any dialogue is a masterpiece of visual storytelling. Bring a box of tissues.",
  },
  {
    id: 18,
    user: "CouchPotato",
    email: "couchpotato123@example.com",
    rating: 3,
    likes: 11,
    dislikes: 6,
    date: "March 25, 2026",
    review:
      "It's a fun distraction for a lazy Sunday afternoon, but it definitely doesn't reach the heights of the earlier films. The animation is standard TV quality rather than theatrical, and the jokes rely a bit too heavily on slapstick rather than clever writing.",
  },
  {
    id: 19,
    user: "LoreMaster",
    email: "lorekeeper@example.com",
    rating: 5,
    likes: 47,
    dislikes: 4,
    date: "March 20, 2026",
    review:
      "The way this movie expands on the ancient history of the region is brilliant. It perfectly bridges the gap between the games and the anime universe. Every single frame of the legendary battle looks like a Renaissance painting. Pure perfection.",
  },
  {
    id: 20,
    user: "SleepySnorlax",
    email: "zzz_snorlax@example.com",
    rating: 4,
    likes: 25,
    dislikes: 1,
    date: "March 15, 2026",
    review:
      "The dream world concept allowed the animators to go absolutely crazy with the visuals. Surreal landscapes, impossible physics, and terrifying nightmares all blended perfectly. It gets genuinely creepy near the end, which I appreciate.",
  },
  {
    id: 21,
    user: "BentoBox",
    email: "bentolover@example.com",
    rating: 4,
    likes: 14,
    dislikes: 2,
    date: "March 10, 2026",
    review:
      "I highly recommend NOT watching this movie on an empty stomach. The animation for the food is insanely detailed and gorgeous. Beyond the culinary visuals, it's a sweet story about family bonding and learning to appreciate the little things in life.",
  },
  {
    id: 22,
    user: "MechaFanatic",
    email: "gundamlover@example.com",
    rating: 5,
    likes: 33,
    dislikes: 0,
    date: "March 05, 2026",
    review:
      "A fantastic homage to classic super robot anime from the 70s and 80s! The redesign of the steel troops looks incredibly menacing, and the final battle sequence is an absolute spectacle of explosions, laser beams, and surprisingly strategic teamwork.",
  },
  {
    id: 23,
    user: "DubWatcher",
    email: "englishdubonly@example.com",
    rating: 3,
    likes: 8,
    dislikes: 12,
    date: "March 01, 2026",
    review:
      "The movie itself is beautifully animated, but the English dub leaves a lot to be desired. A lot of the emotional nuance is lost in translation, and the voice acting for the new characters feels very flat compared to the main cast. Stick to the sub for this one.",
  },
  {
    id: 24,
    user: "NoharaFamily",
    email: "hiroshi_salaryman@example.com",
    rating: 5,
    likes: 51,
    dislikes: 1,
    date: "February 25, 2026",
    review:
      "As a father, the 'Robo Dad' movie destroyed me emotionally. It perfectly captures the exhausting, often thankless nature of being a working parent, wrapped in an absurd sci-fi comedy shell. The arm-wrestling scene at the end is one of the most poignant moments in anime history.",
  },
  {
    id: 25,
    user: "DinoHunter",
    email: "jurassicfan@example.com",
    rating: 4,
    likes: 20,
    dislikes: 2,
    date: "February 20, 2026",
    review:
      "This remake of the classic 1980 movie does a fantastic job of updating the animation while keeping the heart of the original story intact. Pisuke is more adorable than ever, and the updated dinosaur designs reflect modern paleontology, which is a neat touch.",
  },
  {
    id: 26,
    user: "AuraGuardian",
    email: "lucariomain@example.com",
    rating: 5,
    likes: 62,
    dislikes: 3,
    date: "February 14, 2026",
    review:
      "The mystery of Mew intertwined with Sir Aaron's past makes for the most compelling narrative in the entire series. Lucario's character arc from a distrustful, betrayed warrior to a loyal friend is executed flawlessly. The medieval setting also provides a refreshing change of pace.",
  },
  {
    id: 27,
    user: "SpaceExplorer",
    email: "galacticvoyager@example.com",
    rating: 3,
    likes: 13,
    dislikes: 4,
    date: "February 10, 2026",
    review:
      "The world-building on the alien planet was fascinating, but the resolution of the conflict felt too easy. After building up the villain's armada for an hour, they are defeated by a fairly simple gadget trick. Visually stunning, but narratively a bit weak.",
  },
  {
    id: 28,
    user: "GhibliVibes",
    email: "totoro_fan@example.com",
    rating: 4,
    likes: 29,
    dislikes: 1,
    date: "February 05, 2026",
    review:
      "The environmental message in this film is handled with a lot of grace, heavily reminding me of Princess Mononoke. The Forest Spirit's design is gorgeous and terrifying at the same time. It's a bit slower-paced, focusing more on atmosphere than action.",
  },
  {
    id: 29,
    user: "KasukabeDefense",
    email: "actionkindergarten@example.com",
    rating: 5,
    likes: 27,
    dislikes: 0,
    date: "January 30, 2026",
    review:
      "Seeing the kids actually have to use their wits to survive without adults around was both hilarious and genuinely tense. It proves that despite his complete lack of manners, Shinchan actually has a lot of heart and bravery when his friends are in danger.",
  },
  {
    id: 30,
    user: "PixelArtFan",
    email: "retro_gamer@example.com",
    rating: 2,
    likes: 4,
    dislikes: 9,
    date: "January 25, 2026",
    review:
      "I didn't like the new art direction they took with this film. The lines are too soft and it loses that sharp, energetic edge the TV series is known for. The story was fine, but I couldn't get past the character redesigns.",
  },
  {
    id: 31,
    user: "SymphonyLover",
    email: "classicalmusic@example.com",
    rating: 5,
    likes: 35,
    dislikes: 1,
    date: "January 18, 2026",
    review:
      "Music as a central theme is rarely done this well in an action-adventure cartoon. The way the characters' instruments corresponded to their personalities and fighting styles was genius. The grand finale orchestral piece is something I still listen to on Spotify.",
  },
  {
    id: 32,
    user: "TimePatroller",
    email: "futuretrunks@example.com",
    rating: 4,
    likes: 18,
    dislikes: 2,
    date: "January 12, 2026",
    review:
      "A solid entry that introduces a really cool futuristic city aesthetic. The villain's motivation was a bit clichéd, but the chase sequence through the neon-lit flying cars was a technical marvel of 2D animation blended with CGI backgrounds.",
  },
  {
    id: 33,
    user: "MagicGirlFan",
    email: "magical_dreams@example.com",
    rating: 4,
    likes: 22,
    dislikes: 3,
    date: "January 05, 2026",
    review:
      "The parallel universe concept where science is replaced by magic is a classic trope, but they used it perfectly here. It was great seeing the characters have to learn the rules of a completely different reality. Medusa makes for a genuinely terrifying antagonist.",
  },
  {
    id: 34,
    user: "PirateKing",
    email: "grandline@example.com",
    rating: 4,
    likes: 26,
    dislikes: 1,
    date: "December 28, 2025",
    review:
      "Treasure Island in space! The nautical themes mixed with sci-fi technology created a super unique aesthetic. The pirate crew designs were memorable, and the final puzzle to unlock the treasure was actually quite clever and required the viewer to pay attention to earlier hints.",
  },
  {
    id: 35,
    user: "WinterWonder",
    email: "snowday@example.com",
    rating: 5,
    likes: 41,
    dislikes: 0,
    date: "December 20, 2025",
    review:
      "The isolation and survival aspects of being trapped in the Antarctic made this one of the most suspenseful movies in the catalog. The ancient frozen city they discover is full of incredible, eerie lore. Highly recommend watching this one wrapped in a warm blanket.",
  },
  {
    id: 36,
    user: "IllusionMaster",
    email: "zoroark_fan@example.com",
    rating: 4,
    likes: 31,
    dislikes: 2,
    date: "December 15, 2025",
    review:
      "The plot twists involving Zoroark's illusions actually kept me guessing until the very end. The Crown City setting feels vibrant and alive, deeply inspired by European architecture. The pacing is tight, moving quickly from one set piece to the next without feeling bloated.",
  },
];

export const COMMUNITY_STATS = [
  { icon: '🎬', value: '30+', label: 'Movies & Episodes' },
  { icon: '📡', value: '∞', label: 'Streaming' },
  { icon: '✨', value: 'Cartoon Magic', label: 'All your favorites' },
]

export function getCartoonName(cartoonId) {
  return CARTOONS.find((c) => c.id === cartoonId)?.name ?? cartoonId
}

/* ── Single Community Chat (dummy seed data) ─────────────── */
export const COMMUNITY_ROOM = {
  id:          'community',
  name:        'PixelTales Community',
  description: 'One place for every PixelTales fan — chat, share & connect!',
  icon:        '🎬',
  gradient:    'linear-gradient(135deg,#0f766e,#06b6d4)',
  memberCount: 4932,
  messageCount: 19120,
};

const _ts = (offsetMin) => {
  const d = new Date(Date.now() - offsetMin * 60 * 1000);
  return d.toISOString();
};

export const COMMUNITY_MESSAGES = [
  { id: 'c1',  userId: 'u1',  userName: 'AnimeFan42',    text: 'Hey everyone! Anyone watching Doraemon movies this weekend? 🎬', timestamp: _ts(120) },
  { id: 'c2',  userId: 'u2',  userName: 'CartoonLover',  text: 'Yes! I just finished the parallel universe one. Absolutely mind-blowing 🤯', timestamp: _ts(112) },
  { id: 'c3',  userId: 'u9',  userName: 'DoraFanatic',   text: 'Stand By Me Doraemon 2 made me cry like a baby 😢', timestamp: _ts(104) },
  { id: 'c4',  userId: 'u3',  userName: 'PikachuFan',    text: 'Mewtwo Strikes Back Evolution is a visual masterpiece 🎨', timestamp: _ts(96) },
  { id: 'c5',  userId: 'u12', userName: 'AshKetchum99',  text: 'The original 1998 Pokémon movie hits harder though, nostalgia pain 😭', timestamp: _ts(90) },
  { id: 'c6',  userId: 'u4',  userName: 'NinjaWatcher',  text: 'Naruto > everything, fight me 😤', timestamp: _ts(84) },
  { id: 'c7',  userId: 'u1',  userName: 'AnimeFan42',    text: 'Lmao Naruto is great but Doraemon hits different when you grew up with it 😭', timestamp: _ts(78) },
  { id: 'c8',  userId: 'u5',  userName: 'ShinchanFan',   text: 'Shinchan movies have the best emotional endings ngl', timestamp: _ts(72) },
  { id: 'c9',  userId: 'u2',  userName: 'CartoonLover',  text: 'Hard agree. The Shinchan "Adult Empire" movie is a masterpiece 👏', timestamp: _ts(66) },
  { id: 'c10', userId: 'u15', userName: 'CrazyNohara',   text: 'Adult Empire is phenomenal but The Storm Called: Operation Golden Spy slaps too', timestamp: _ts(60) },
  { id: 'c11', userId: 'u6',  userName: 'OtakuKing',     text: 'PixelTales is literally the best site for these movies, no ads!', timestamp: _ts(54) },
  { id: 'c12', userId: 'u7',  userName: 'MovieBuff99',   text: 'Tom & Jerry never gets old. Watched it today again 😂', timestamp: _ts(48) },
  { id: 'c13', userId: 'u17', userName: 'ClassicToons',  text: 'That piano episode where they play together is cinema 🎹', timestamp: _ts(42) },
  { id: 'c14', userId: 'u20', userName: 'HinataFan99',   text: 'The Last: Naruto the Movie made me cry so hard 😭 Naruhina forever', timestamp: _ts(36) },
  { id: 'c15', userId: 'u3',  userName: 'PikachuFan',    text: 'Real! I use PixelTales every weekend with my little sister 🥰', timestamp: _ts(30) },
  { id: 'c16', userId: 'u5',  userName: 'ShinchanFan',   text: 'Who else here grew up watching all of these? Drop a 🙋', timestamp: _ts(20) },
  { id: 'c17', userId: 'u1',  userName: 'AnimeFan42',    text: '🙋🙋🙋 born in 2000s squad 😄', timestamp: _ts(14) },
  { id: 'c18', userId: 'u6',  userName: 'OtakuKing',     text: '🙋 Always! PixelTales + Naruto movies = perfect Sunday 🙌', timestamp: _ts(8) },
  { id: 'c19', userId: 'u4',  userName: 'NinjaWatcher',  text: 'Believe it! 🍥 This community is amazing', timestamp: _ts(4) },
  { id: 'c20', userId: 'u8',  userName: 'PixelFan',      text: 'Just joined PixelTales today, this platform is amazing 🔥', timestamp: _ts(1) },
];

export const BUBBLES = [
  { top: "3%", left: "4%", size: 35, opacity: 0.24 },
  { top: "6%", left: "18%", size: 55, opacity: 0.32 },
  { top: "8%", left: "35%", size: 45, opacity: 0.28 },
  { top: "10%", left: "58%", size: 70, opacity: 0.32 },
  { top: "5%", left: "78%", size: 120, opacity: 0.25 },
  { top: "8%", left: "92%", size: 40, opacity: 0.35 },
  { top: "16%", left: "8%", size: 90, opacity: 0.28 },
  { top: "18%", left: "24%", size: 60, opacity: 0.26 },
  { top: "20%", left: "42%", size: 140, opacity: 0.35 },
  { top: "22%", left: "62%", size: 50, opacity: 0.31 },
  { top: "24%", left: "82%", size: 80, opacity: 0.30 },
  { top: "28%", left: "95%", size: 45, opacity: 0.22 },
  { top: "32%", left: "5%", size: 65, opacity: 0.26 },
  { top: "35%", left: "18%", size: 110, opacity: 0.25 },
  { top: "38%", left: "32%", size: 40, opacity: 0.27 },
  { top: "40%", left: "50%", size: 85, opacity: 0.31 },
  { top: "42%", left: "68%", size: 55, opacity: 0.30 },
  { top: "45%", left: "88%", size: 130, opacity: 0.24 },
  { top: "50%", left: "10%", size: 45, opacity: 0.34 },
  { top: "52%", left: "26%", size: 70, opacity: 0.26 },
  { top: "48%", left: "40%", size: 35, opacity: 0.30 },
  { top: "55%", left: "56%", size: 95, opacity: 0.29 },
  { top: "58%", left: "74%", size: 50, opacity: 0.27 },
  { top: "60%", left: "90%", size: 75, opacity: 0.14 },
  { top: "63%", left: "6%", size: 120, opacity: 0.23 },
  { top: "66%", left: "20%", size: 55, opacity: 0.35 },
  { top: "68%", left: "38%", size: 80, opacity: 0.22 },
  { top: "70%", left: "54%", size: 45, opacity: 0.27 },
  { top: "72%", left: "70%", size: 140, opacity: 0.28 },
  { top: "74%", left: "86%", size: 60, opacity: 0.33 },
  { top: "78%", left: "12%", size: 100, opacity: 0.35 },
  { top: "80%", left: "28%", size: 50, opacity: 0.30 },
  { top: "82%", left: "44%", size: 65, opacity: 0.29 },
  { top: "84%", left: "60%", size: 170, opacity: 0.25 },
  { top: "86%", left: "78%", size: 40, opacity: 0.26 },
  { top: "88%", left: "94%", size: 90, opacity: 0.17 },
  { top: "91%", left: "6%", size: 55, opacity: 0.28 },
  { top: "92%", left: "22%", size: 130, opacity: 0.33 },
  { top: "90%", left: "36%", size: 45, opacity: 0.31 },
  { top: "13%", left: "2%", size: 75, opacity: 0.28 },
  { top: "5%", left: "8%", size: 50, opacity: 0.22 },
  { top: "24%", left: "4%", size: 110, opacity: 0.35 },
  { top: "2%", left: "18%", size: 38, opacity: 0.20 },
  { top: "7%", left: "25%", size: 95, opacity: 0.29 },
  { top: "13%", left: "35%", size: 58, opacity: 0.26 },
  { top: "17%", left: "36%", size: 42, opacity: 0.35 },
  { top: "4%", left: "46%", size: 36, opacity: 0.26 },
  { top: "36%", left: "52%", size: 82, opacity: 0.21 },
  { top: "28%", left: "68%", size: 48, opacity: 0.27 },
  { top: "38%", left: "98%", size: 160, opacity: 0.24 },
];

export const GITHUB_IMAGE_BASE =
  "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/BannerImages";

export const BANNERS = {
  doraemon: "doraemon.png",
  pokemon: "pokemon.png",
  shinchan: "shinchan.png",
  perman: "perman.png",
  "oggy-and-the-cockroaches": "oggyAndTheCockroaches.png",
  "pakdam-pakdai": "pakdamPakdai.png",
};

export const HERO_SLIDES = [
  {
    id: "h1",
    title: "Doraemon Movie",
    cartoonId: "doraemon",
    tagline: "Stream the latest Doraemon adventures in HD",
    gradient: cartoonGradients.doraemon,
    accent: "cyan",
  },
  {
    id: "h2",
    title: "Pokemon Movie 1",
    cartoonId: "pokemon",
    tagline: "Catch every Pokémon movie — anytime, anywhere",
    gradient: cartoonGradients.pokemon,
    accent: "yellow",
  },
  {
    id: "h3",
    title: "Shinchan Movie 1",
    cartoonId: "shinchan",
    tagline: "Laugh out loud with Shinchan's wildest stories",
    gradient: cartoonGradients.shinchan,
    accent: "pink",
  },
  {
    id: "h4",
    title: "Oggy and the Cockroaches",
    cartoonId: "oggy-and-the-cockroaches",
    tagline: "Enjoy Oggy's funniest battles with the crazy cockroaches",
    gradient: cartoonGradients.oggyAndTheCockroaches,
    accent: "blue",
  },
  {
    id: "h5",
    title: "Pakdam Pakdai",
    cartoonId: "pakdam-pakdai",
    tagline: "Join Doggy Don and friends for nonstop laughter and action",
    gradient: cartoonGradients.pakdamPakdai,
    accent: "green",
  },
  {
    id: "h6",
    title: "Perman",
    cartoonId: "perman",
    tagline: "Fly into nostalgic adventures with Mitsuo and the Perman team",
    gradient: cartoonGradients.perman,
    accent: "purple",
  },
  {
    id: "h7",
    title: "Doraemon Movie 2",
    cartoonId: "doraemon",
    tagline: "Nobita and friends — epic journeys await",
    gradient: cartoonGradients.doraemon,
    accent: "cyan",
  },
  {
    id: "h8",
    title: "Pokemon Movie 2",
    cartoonId: "pokemon",
    tagline: "Trending this week — join millions watching",
    gradient: cartoonGradients.pokemon,
    accent: "yellow",
  },
];

export const POPULAR_SHOWS = [
  { id: 'doraemon', name: 'Doraemon', emoji: '🔵', gradient: cartoonGradients.doraemon },
  { id: 'shinchan', name: 'Shinchan', emoji: '🔴', gradient: cartoonGradients.shinchan },
  { id: 'pokemon', name: 'Pokemon', emoji: '⚡', gradient: cartoonGradients.pokemon },
  { id: 'hattori', name: 'Ninja Hattori', emoji: '🥷', gradient: 'linear-gradient(135deg, #166534, #4ade80)' },
  { id: 'oggy', name: 'Oggy & Cockroaches', emoji: '🐱', gradient: 'linear-gradient(135deg, #1e40af, #93c5fd)' },
  { id: 'tom-jerry', name: 'Tom & Jerry', emoji: '🧀', gradient: cartoonGradients['tom-jerry'] },
]

export const GENRES = [
  'Adventure',
  'Comedy',
  'Action',
  'Fantasy',
  'Sci-Fi',
  'Family',
]

export const CHARACTERS = [
  { name: 'Doraemon', show: 'Doraemon', emoji: '🤖' },
  { name: 'Nobita', show: 'Doraemon', emoji: '👦' },
  { name: 'Shinchan', show: 'Shinchan', emoji: '😜' },
  { name: 'Pikachu', show: 'Pokemon', emoji: '⚡' },
  { name: 'Hattori', show: 'Ninja Hattori', emoji: '🥷' },
  { name: 'Oggy', show: 'Oggy', emoji: '🐱' },
]

export const FEATURES = [
  { icon: '🎬', title: 'HD Streaming', desc: 'Crystal-clear cartoon playback' },
  { icon: '⚡', title: 'Fast Loading', desc: 'Start watching in seconds' },
  { icon: '🌐', title: 'Multiple Servers', desc: 'Reliable streams worldwide' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Watch on any device' },
  { icon: '🆓', title: 'Free Access', desc: 'Enjoy cartoons at no cost' },
  { icon: '🔄', title: 'Regular Updates', desc: 'New episodes every week' },
]

export const TESTIMONIALS = [
  { user: 'Priya S.', rating: 5, text: 'Best place for Doraemon and Pokemon movies. My kids love it!' },
  { user: 'Rahul M.', rating: 5, text: 'Watch party feature is awesome. We stream Shinchan every Friday.' },
  { user: 'Ananya K.', rating: 4, text: 'Clean UI, fast streams, and tons of cartoons. Highly recommend PixelTales.' },
]

export const FAQ_ITEMS = [
  {
    q: 'How to watch?',
    a: 'Browse cartoons, pick a movie, and hit Watch Now. Create a free account to save progress.',
  },
  {
    q: 'Is registration required?',
    a: 'You can browse freely. Sign up to unlock Continue Watching, favorites, and watch parties.',
  },
  {
    q: 'Is download available?',
    a: 'Offline downloads are coming soon. For now, stream online in HD.',
  },
  {
    q: 'Supported devices?',
    a: 'Phones, tablets, laptops, and smart TVs with a modern browser.',
  },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'DMCA / Copyright', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  social: [
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

export const TRENDING_NOW = ALL_MOVIES.slice(0, 4)
export const LATEST_EPISODES = ALL_MOVIES.slice(2, 6)
export const FEATURED_MOVIES = ALL_MOVIES.filter((m) =>
  ['doraemon', 'pokemon', 'shinchan'].includes(m.cartoonId),
)
export const RECOMMENDED = [...ALL_MOVIES].sort(() => 0.5 - Math.random()).slice(0, 4)
export const TOP_RATED = [...ALL_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 4)
export const NEW_RELEASES = [...ALL_MOVIES].sort((a, b) => b.year - a.year).slice(0, 4)
