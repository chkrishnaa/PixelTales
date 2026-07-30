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
    tagline: "Catch every pokemon movie — anytime, anywhere",
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
