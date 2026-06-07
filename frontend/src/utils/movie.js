
export const ADMIN_USER = "PixelTales";

const LIKERS_POOL = [
  { name: "Raj Patel",       email: "raj.patel@pixeltales.com" },
  { name: "Meera Singh",     email: "meera.singh@pixeltales.com" },
  { name: "Aditya Kumar",    email: "aditya.kumar@pixeltales.com" },
  { name: "Pooja Nair",      email: "pooja.nair@pixeltales.com" },
  { name: "Kunal Joshi",     email: "kunal.joshi@pixeltales.com" },
  { name: "Riya Verma",      email: "riya.verma@pixeltales.com" },
  { name: "Siddharth Rao",   email: "siddharth.rao@pixeltales.com" },
  { name: "Nisha Patel",     email: "nisha.patel@pixeltales.com" },
  { name: "Vikram Malhotra", email: "vikram.malhotra@pixeltales.com" },
  { name: "Deepa Sharma",    email: "deepa.sharma@pixeltales.com" },
  { name: "Yash Trivedi",    email: "yash.trivedi@pixeltales.com" },
  { name: "Kritika Das",     email: "kritika.das@pixeltales.com" },
  { name: "Aryan Bose",      email: "aryan.bose@pixeltales.com" },
  { name: "Simran Kaur",     email: "simran.kaur@pixeltales.com" },
  { name: "Manish Dubey",    email: "manish.dubey@pixeltales.com" },
  { name: "Anjali Gupta",    email: "anjali.gupta@pixeltales.com" },
  { name: "Rohit Khanna",    email: "rohit.khanna@pixeltales.com" },
  { name: "Preeti Sinha",    email: "preeti.sinha@pixeltales.com" },
  { name: "Tarun Mehta",     email: "tarun.mehta@pixeltales.com" },
  { name: "Sunita Iyer",     email: "sunita.iyer@pixeltales.com" },
  { name: "Karan Bajaj",     email: "karan.bajaj@pixeltales.com" },
  { name: "Divya Menon",     email: "divya.menon@pixeltales.com" },
  { name: "Pranav Shah",     email: "pranav.shah@pixeltales.com" },
];

/** Return n likers starting at offset for variety across comments */
function likers(n, offset = 0) {
  const doubled = [...LIKERS_POOL, ...LIKERS_POOL];
  return doubled.slice(offset, offset + Math.min(n, LIKERS_POOL.length));
}

/** Recursively count all comments including nested replies */
export function countAllComments(comments) {
  return (comments ?? []).reduce(
    (total, c) => total + 1 + countAllComments(c.replies ?? []),
    0
  );
}

/** Get comments array for a movie by id */
export function getCommentsForMovie(movieId) {
  const movie = MOVIE_DETAILS.find((m) => m.id === movieId);
  return movie?.comments ?? [];
}

const DORAEMON_GRADIENT =
  "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)";

const REC_THUMBNAIL = "";

export const MOVIE_DETAILS = [
  {
    id: "d-steel-troops",
    title: "Doraemon: Nobita and the New Steel Troops",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT, // Assuming this is imported elsewhere
    progress: 62,
    videoUrl:
      "https://drive.google.com/file/d/1LeLvdNurMAwANalm1HWchhS1TotCh0v7/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SteelTroops.jpg",
    rating: 4.9,
    year: 2011,
    releaseDate: "2011-03-05", // Updated to ISO 8601 for easier Date parsing/sorting
    duration: 108, // Updated to a number (easy to do: {duration} minutes on the frontend)
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: true,
    director: "Yukiyo Teramoto",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Fantasy", "Action"],
    description:
      "While playing in an empty lot, Nobita discovers mysterious robot parts falling from the sky. With Doraemon's help, he secretly assembles a gigantic robot inside a mirror world. What begins as a fun adventure soon turns into a dangerous mission when they learn that the robot belongs to a powerful mechanical army from another world. As war threatens Earth, Doraemon and his friends must uncover the truth behind the robot invasion and fight to protect both worlds. Filled with emotional moments, action-packed battles, friendship, sacrifice, and unforgettable characters, Nobita and the New Steel Troops is considered one of the most beloved and emotionally powerful Doraemon movies ever made.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Zanda Claus", role: "Robot Ally" },
      { name: "Pippo", role: "Antagonist / Ally" },
      { name: "Riruru", role: "Key Antagonist / Ally" }, // Added Lilulu
    ],
    gallery: [
      // Suffixes added to simulate unique gallery images
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SteelTroops.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SteelTroops.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SteelTroops.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SteelTroops.jpg",
    ],
    comments: [
      {
        id: "c1",
        user: "Arjun Mehta",
        isAdmin: false,
        replyTo: null,
        text: "One of the best Doraemon movies ever made! The emotional ending with Lilulu hit completely different 😭 I had to pause and collect myself.",
        likes: 12,
        likedByMe: false,
        likedBy: likers(12, 0),
        timestamp: "2w",
        replies: [
          {
            id: "c1-r1",
            user: "Sneha Rao",
            isAdmin: false,
            replyTo: "Arjun Mehta",
            text: "Right?! I cried at the very end. Lilulu's sacrifice was so powerful and I did not see it coming at all.",
            likes: 7,
            likedByMe: false,
            likedBy: likers(7, 3),
            timestamp: "2w",
            replies: [
              {
                id: "c1-r1-r1",
                user: ADMIN_USER,
                isAdmin: true,
                replyTo: "Sneha Rao",
                text: "Glad you both connected so deeply with the story! Lilulu's arc is genuinely a masterclass in character writing — it's what makes Steel Troops stand apart. Stay tuned for more classics coming soon! 💙",
                likes: 15,
                likedByMe: false,
                likedBy: likers(15, 5),
                timestamp: "1w",
                replies: [],
              },
            ],
          },
          {
            id: "c1-r2",
            user: "Rohan Gupta",
            isAdmin: false,
            replyTo: "Arjun Mehta",
            text: "The giant robot battle scenes were absolutely epic! The final confrontation gave me real goosebumps.",
            likes: 4,
            likedByMe: false,
            likedBy: likers(4, 7),
            timestamp: "1w",
            replies: [
              {
                id: "c1-r2-r1",
                user: "Kavya Nair",
                isAdmin: false,
                replyTo: "Rohan Gupta",
                text: "Yes! And the soundtrack during that scene was incredible. Still gives me chills.",
                likes: 2,
                likedByMe: false,
                likedBy: likers(2, 10),
                timestamp: "1w",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "c2",
        user: "Priya Sharma",
        isAdmin: false,
        replyTo: null,
        text: "I have watched this movie at least 10 times and it still gives me chills every single time. Riruru's character development is truly unmatched in the entire Doraemon series!",
        likes: 23,
        likedByMe: false,
        likedBy: likers(23, 0),
        timestamp: "3w",
        replies: [
          {
            id: "c2-r1",
            user: ADMIN_USER,
            isAdmin: true,
            replyTo: "Priya Sharma",
            text: "Riruru is genuinely one of the most well-written characters in any Doraemon film. The way she transforms through the story is beautiful storytelling. We're so happy you keep coming back to watch! 🎬✨",
            likes: 18,
            likedByMe: false,
            likedBy: likers(18, 4),
            timestamp: "3w",
            replies: [
              {
                id: "c2-r1-r1",
                user: "Priya Sharma",
                isAdmin: false,
                replyTo: ADMIN_USER,
                text: "Aww thank you for replying! Love how interactive PixelTales is. This is my favourite streaming site now 💙",
                likes: 5,
                likedByMe: false,
                likedBy: likers(5, 8),
                timestamp: "2w",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: "c3",
        user: "Vikram Singh",
        isAdmin: false,
        replyTo: null,
        text: "Does anyone know if this is available in Japanese audio with subtitles? The Hindi dub is great but I'd love the original voice acting experience.",
        likes: 6,
        likedByMe: false,
        likedBy: likers(6, 2),
        timestamp: "1w",
        replies: [
          {
            id: "c3-r1",
            user: ADMIN_USER,
            isAdmin: true,
            replyTo: "Vikram Singh",
            text: "Hey Vikram! We currently have the Hindi Dubbed version available. Japanese audio with subtitles is on our roadmap — watch this space for updates! 🚧🎌",
            likes: 8,
            likedByMe: false,
            likedBy: likers(8, 6),
            timestamp: "1w",
            replies: [],
          },
        ],
      },
      {
        id: "c4",
        user: "Ananya Das",
        isAdmin: false,
        replyTo: null,
        text: "Perfect family movie! My little sister (7 years old) was absolutely glued to the screen the entire time 😄 Thank you PixelTales for making this accessible!",
        likes: 14,
        likedByMe: false,
        likedBy: likers(14, 3),
        timestamp: "4d",
        replies: [
          {
            id: "c4-r1",
            user: "Dev Patel",
            isAdmin: false,
            replyTo: "Ananya Das",
            text: "Same here! My nephew watched it twice back-to-back. The robot designs are super creative and the concept is brilliant.",
            likes: 3,
            likedByMe: false,
            likedBy: likers(3, 9),
            timestamp: "3d",
            replies: [
              {
                id: "c4-r1-r1",
                user: "Ananya Das",
                isAdmin: false,
                replyTo: "Dev Patel",
                text: "Exactly! And the animation holds up so well even by today's standards.",
                likes: 2,
                likedByMe: false,
                likedBy: likers(2, 11),
                timestamp: "2d",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "d-parallel-visit-to-the-west",
    title: [
      "Doraemon: The Record of Nobita's Parallel Visit to the West",
      "Doraemon's Parallel Journey to the West",
      "Doraemon The Movie: Nobita Bana Superhero",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1AkSI1NF0mZXTW5plSNfse6PFVgqXHdGv/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ParallelVisitToTheWest.jpg",
    rating: 4.3,
    year: 1988,
    releaseDate: "1988-03-12",
    duration: 90,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Family", "Comedy"],
    description:
      "While preparing for a school play based on the classic Chinese novel 'Journey to the West', Nobita uses Doraemon's Hero Machine to become Sun Wukong, the legendary Monkey King. However, a major malfunction occurs, and they accidentally release dangerous, real-life monsters from the game into the real world. To save humanity and their families from being conquered by demons, Nobita, Doraemon, and their friends must travel back in time to ancient China, fully embracing their 'Journey to the West' roles to defeat the fearsome Bull Demon King and fix the timeline.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character / Sun Wukong" },
      { name: "Shizuka", role: "Supporting Character / Sanzang" },
      { name: "Gian", role: "Supporting Character / Zhu Bajie" },
      { name: "Suneo", role: "Supporting Character / Sha Wujing" },
      { name: "Linlay", role: "Key Ally / Guest Character" },
      { name: "Bull Demon King", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-tin-labyrinth",
    title: "Doraemon: Nobita and the Tin Labyrinth",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1oG9uswDZP8skgm8YayHt7BMf06R-Gtl1/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TinLabyrinth.jpg",
    rating: 4.4,
    year: 1993,
    releaseDate: "1993-03-06",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Mystery"],
    description:
      "After Nobita's father mysteriously receives a suitcase that books a family vacation, Nobita and Doraemon arrive at a luxurious resort on Buriki (Tin) Island, operated entirely by tin toy robots. Things take a dark turn when Doraemon gets kidnapped by a rogue robot army led by Emperor Napo. Nobita, Shizuka, Gian, and Suneo must team up with a young alien boy named Sapio to navigate a giant labyrinth, rescue Doraemon, and free the planet of Chamocha from its tyrannical robot overlords. The movie carries a strong, thought-provoking message about the dangers of humanity becoming too dependent on technology and losing its independence.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Sapio", role: "Key Ally / Guest Character" },
      { name: "Tap", role: "Robot Guide / Ally" },
      { name: "Emperor Napo", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-three-visionary-swordsmen",
    title: "Doraemon: Nobita's Three Visionary Swordsmen",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/16IKZg7IOcN10bXVx_fwQhRh7GOKL_7WT/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ThreeVisionarySwordsmen.jpg",
    rating: 4.5,
    year: 1994,
    releaseDate: "1994-03-12",
    duration: 99,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: true,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Action", "Comedy"],
    description:
      "Fed up with reality, Nobita asks Doraemon for a dream machine so he can become a heroic swordsman. However, what begins as a fun fantasy takes a dangerous turn when he realizes the dream world—the Kingdom of Yumirume—is being attacked by Emperor Odrome's dark army. Dragging Shizuka, Gian, and Suneo into the dream, the group must assume the roles of legendary swordsmen to slay a fire-breathing dragon and save the kingdom. The lines between dreams and reality begin to blur, raising the stakes higher than they ever imagined.",
    characters: [
      { name: "Doraemon", role: "Main Character / Doran the Magician" },
      {
        name: "Nobita",
        role: "Main Character / Nobitanian (The Silver Swordsman)",
      },
      { name: "Shizuka", role: "Supporting Character / Princess Shizukaria" },
      { name: "Gian", role: "Supporting Character / Gitos" },
      { name: "Suneo", role: "Supporting Character / Sunemith" },
      { name: "Emperor Odrome", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-adventure-in-south-seas",
    title: "Doraemon: Nobita's Great Adventure in the South Seas",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1v6J1jH9gofCZr6XNO27mYaZ4x-y8qGid/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/AdventureInSouthSeas.jpg",
    rating: 4.5,
    year: 1998,
    releaseDate: "1998-03-07",
    duration: 91,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Comedy", "Family"],
    description:
      "Interested in pirate life and hidden treasure, Nobita asks Doraemon to help him find a secret fortune. Bringing along Shizuka, Gian, and Suneo, they roam the Pacific Ocean on a ship simulator. However, a time distortion transports the group back to the 16th century. After a whirlpool destroys their ship, Nobita goes missing and befriends a boy named Jack and a dolphin named Ruffin on a mysterious island. Meanwhile, Doraemon and the rest of the gang are rescued by real pirates led by Captain Kidd and Betty. Without most of Doraemon's gadgets, the crew must survive strange sea creatures, reunite with Nobita, and uncover the island's secrets.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Captain William Kidd", role: "Pirate Captain / Ally" },
      { name: "Betty", role: "Pirate / Ally" },
      { name: "Jack", role: "Key Ally" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-legend-of-the-sun-king",
    title: "Doraemon: Nobita and the Legend of the Sun King",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1QZ6n0MLXDlrdsXKt7W4YQ1Sd0Rwz7Mgg/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/LegendOfTheSunKing.jpg",
    rating: 4.6,
    year: 2000,
    releaseDate: "2000-03-04",
    duration: 93,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Family", "Comedy"],
    description:
      "Using a malfunctioning time-space portal, Nobita and Doraemon accidentally travel to the ancient Mesoamerican kingdom of Mayana. There, Nobita meets Prince Tio, the heir to the throne, who happens to look exactly like him. Inspired by 'The Prince and the Pauper', the two decide to temporarily switch places. Tio experiences the modern wonders of Japan, while Nobita struggles with the royal duties and intense martial arts training of a prince. However, Mayana is in grave danger: an evil witch named Ledina has cursed the queen with an eternal sleep and soon kidnaps a young girl named Kuku to use as a sacrifice. Nobita, Tio, Doraemon, and the rest of the gang must join forces to defeat the dark magic, save the kingdom, and discover the true meaning of leadership and friendship.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Prince Tio", role: "Deuteragonist / Nobita's Look-alike" },
      { name: "Kuku", role: "Key Ally" },
      { name: "Ledina", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-stand-by-me",
    title: "Stand by Me Doraemon",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 100,
    videoUrl:
      "https://drive.google.com/file/d/1voTSIzx3n3Uj55_Mi1hGoWO4fZ63vWVR/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/StandByMe.jpg",
    rating: 4.9,
    year: 2014,
    releaseDate: "2014-08-08",
    duration: 95,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shirogumi / Shin-Ei Animation",
    favorited: true,
    director: "Takashi Yamazaki, Ryuichi Yagi",
    country: "Japan",
    genres: ["Animation", "Sci-Fi", "Drama", "Family"],
    description:
      "In the suburbs of Tokyo, a clumsy and lazy boy named Nobita Nobi is visited by his great-great-grandson Sewashi from the 22nd century, accompanied by a robotic cat named Doraemon. Sewashi reveals that Nobita's poor choices will lead his future family into poverty. To alter this fate, he leaves Doraemon to guide Nobita, programming him so he cannot return to the future until Nobita achieves true happiness. Combining several of the most iconic and emotional stories from the original manga, this stunning 3D CGI film beautifully chronicles Nobita's growth, his heartfelt attempts to win over his childhood crush Shizuka, and the deeply moving bond he shares with his robotic best friend.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character / Love Interest" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Sewashi", role: "Great-Great-Grandson" },
      { name: "Hidetoshi Dekisugi", role: "Nobita's Rival" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-nobitas-treasure-island",
    title: "Doraemon: Nobita's Treasure Island",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1sIkwTU1mbWXcU55LSQe-LL53wABtGU95/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasTreasureIsland.jpg",
    rating: 4.7,
    year: 2018,
    releaseDate: "2018-03-03",
    duration: 109,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Kazuaki Imai",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Action"],
    description:
      "Inspired by Robert Louis Stevenson's classic novel, Nobita declares to his friends that he will find a real treasure island. Using Doraemon's special treasure map gadget, they discover a newly emerged island in the Pacific Ocean. The group sets sail on a magnificent ship, but their adventure is interrupted when they are attacked by a crew of time-traveling pirates. During the chaos, Shizuka is kidnapped because she bears a striking resemblance to Sarah, a girl from the pirate ship. Nobita and his friends team up with Flock, a brilliant mechanic and Sarah's brother, to rescue Shizuka. They soon discover that the 'island' is actually a massive, high-tech pirate ship captained by Silver, who plans to drain the Earth's energy to save his family, threatening the planet's very existence in the process.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Flock", role: "Key Ally" },
      { name: "Sarah", role: "Key Ally / Shizuka's Look-alike" },
      { name: "Captain Silver", role: "Primary Antagonist" },
      { name: "Quiz", role: "Robot Parrot Guide" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-little-space-war",
    title: "Doraemon: Nobita's Little Star Wars",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1l6V8mnu4jJOnKVyW1S2srgQAItgp-8r6/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/LittleSpaceWar.jpg",
    rating: 4.5,
    year: 1985,
    releaseDate: "1985-03-16",
    duration: 98,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Action", "Comedy"],
    description:
      "While making their own miniature space movie, Nobita and his friends discover Papi, the tiny palm-sized president of the faraway planet Pirika. Papi has escaped to Earth to avoid being captured by the tyrannical General Gilmore and his oppressive PCIA intelligence agency, led by Dorakoruru. Using Doraemon's Small Light, the gang shrinks down to Papi's size to play with him and protect him in a secret dollhouse base. However, the PCIA tracks Papi to Earth, steals the Small Light, and kidnaps Shizuka. To save her, Papi surrenders himself. Stranded at a tiny size, Doraemon, Nobita, Gian, Suneo, and Shizuka team up with Papi's talking dog Rokoroko and the underground Freedom Alliance. They travel across the galaxy to Pirika to rescue Papi from execution and overthrow Gilmore's regime.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Papi", role: "Key Ally / President of Pirika" },
      { name: "Rokoroko", role: "Ally / Papi's Talking Dog" },
      { name: "General Gilmore", role: "Primary Antagonist" },
      { name: "Dorakoruru", role: "Antagonist / PCIA Commander" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-stand-by-me-2",
    title: "Stand by Me Doraemon 2",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 12,
    videoUrl:
      "https://drive.google.com/file/d/1bcya92lyFgvRkdM00Vf8SGGsHMOuQ19J/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/StandByMe2.jpg",
    rating: 4.8,
    year: 2020,
    releaseDate: "2020-11-20",
    duration: 96,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shirogumi / Shin-Ei Animation",
    favorited: false,
    director: "Takashi Yamazaki, Ryuichi Yagi",
    country: "Japan",
    genres: ["Animation", "Sci-Fi", "Drama", "Family"],
    description:
      "After finding an old teddy bear patched up by his late grandmother, Nobita decides to travel back in time to see her one more time. Overjoyed to see him, his grandmother expresses a heartfelt wish: she wants to see Nobita's future bride. Determined to fulfill her dream, Nobita and Doraemon travel to the future, only to discover that adult Nobita has panicked and run away on the day of his wedding to Shizuka. Young Nobita must step in to cover for his adult self, find the runaway groom, and ensure the wedding goes smoothly, all while trying to show his beloved grandmother the beautiful future she hoped for.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita (Child & Adult)", role: "Main Character" },
      { name: "Shizuka (Child & Adult)", role: "Supporting Character / Bride" },
      { name: "Nobita's Grandmother", role: "Key Figure" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-nobitas-new-dinosaur",
    title: "Doraemon: Nobita's New Dinosaur",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1bVya_zt_s9f9nd_4-O3X08fiiq25AWU3/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasNewDinosaur.jpg",
    rating: 4.6,
    year: 2020,
    releaseDate: "2020-08-07",
    duration: 110,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Kazuaki Imai",
    country: "Japan",
    genres: ["Animation", "Adventure", "Family", "Sci-Fi"],
    description:
      "While visiting a dinosaur exhibition, Nobita accidentally discovers a fossilized egg mixed with rocks. Using Doraemon's Time Blanket, he returns it to its original state, and it hatches into an entirely new, unrecorded species of twin feathered dinosaurs, which he names Kyu and Myu. As the dinosaurs grow too large to be kept secretly in modern-day Tokyo, Nobita, Doraemon, and the gang use the Time Machine to travel back 66 million years to the Cretaceous period. Their mission to find the twins' true home becomes a fight for survival as they encounter massive prehistoric predators, a mysterious organization monitoring them, and the impending threat of the asteroid that caused the dinosaur extinction.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Kyu", role: "Twin Dinosaur / Key Ally" },
      { name: "Myu", role: "Twin Dinosaur / Key Ally" },
      { name: "Jill", role: "Mysterious Researcher" },
      { name: "Natalie", role: "Jill's Assistant" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-nobitas-chronicle-of-the-moon-exploration",
    title: "Doraemon: Nobita's Chronicle of the Moon Exploration",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/17yRUXq88CLDqFL7LbHrOFx6McmJBwdBD/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasChronicleOfTheMoonExploration.jpg",
    rating: 4.6,
    year: 2019,
    releaseDate: "2019-03-01",
    duration: 111,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Shinnosuke Yakuwa",
    country: "Japan",
    genres: ["Animation", "Sci-Fi", "Adventure", "Family"],
    description:
      "After Nobita's class laughs at him for believing that a mysterious white shadow on the moon is the mythical moon rabbit, Doraemon uses the 'History Explorers Club Badge' to make his theory come true. Together, they create a secret civilization of rabbits on the far side of the moon known as the Rabbit Kingdom. Things take an exciting turn when a mysterious new transfer student named Luca joins the group. During a trip to the moon, Nobita discovers Luca's true identity: he and his sister Luna are 'Espals,' beings with special powers living in a hidden lunar colony. The peaceful adventure turns dangerous when the evil Emperor Diabolo and his commander, Godart, track the Espals down to harness their powers for the doomed Planet Kaguya. When Luca and his family are captured, Nobita, Doraemon, and the rest of the gang must mount an interstellar rescue mission to save their new friends and restore light to an entire planet.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Luca", role: "Key Ally / Espal" },
      { name: "Luna", role: "Key Ally / Espal" },
      { name: "Emperor Diabolo", role: "Primary Antagonist" },
      { name: "Godart", role: "Antagonist / Ally" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-nobitas-space-heroes",
    title: "Doraemon: Nobita's Space Heroes",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1hDP7GAMyGOwBWZFK0VUIb9C7CSu5v3RW/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceHeroes.jpg",
    rating: 4.3,
    year: 2015,
    releaseDate: "2015-03-07",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Yoshihiro Osugi",
    country: "Japan",
    genres: ["Action", "Adventure", "Sci-Fi", "Comedy", "Family"],
    description:
      "Inspired by a superhero television show, Nobita and his friends decide to make their own sci-fi superhero movie using Doraemon's 'Burger Director' gadget. While filming their pretend battles, they are approached by Aron, a genuine alien boy who mistakes them for real galactic heroes. Desperate for help, Aron begs the team to save his home, the Pokkuru Planet, which has been invaded by ruthless space pirates. Believing it is all just an elaborate part of their movie production, the gang agrees and travels into deep space. However, when the attacks become lethal and the pirates' true, sinister motives to drain the planet's energy are revealed, Nobita and his friends must step up to become the true heroes Aron believes them to be.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Aron", role: "Key Ally / Alien Boy" },
      { name: "Burger Director", role: "Gadget Ally" },
      { name: "Ikaros", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-nobitas-great-demon-peko",
    title:
      "Doraemon: New Nobita's Great Demon ~Peko and the Exploration Party of 5~",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatDemonPeko.jpg",
    rating: 4.5,
    year: 2014,
    releaseDate: "2014-03-08",
    duration: 109,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Shinnosuke Yakuwa",
    country: "Japan",
    genres: ["Animation", "Adventure", "Family", "Sci-Fi"],
    description:
      "Determined to find an undiscovered place on Earth for their summer vacation adventure, Nobita asks Doraemon for help. While searching, Nobita adopts a stray white dog and names him Peko. Using Doraemon's satellite technology, the gang discovers a mysterious, massive statue hidden deep within an unexplored African jungle. The group, accompanied by Peko, sets off on a dangerous expedition filled with wild animals and treacherous terrain. As they journey deeper into the jungle, they discover that Peko is no ordinary dog—he is Prince Kuntakku, the rightful heir to a highly advanced, hidden civilization known as the Dog Kingdom. The kingdom has been taken over by the evil minister Daburanda, who plans to conquer the outside human world. Doraemon, Nobita, and their friends must fulfill an ancient prophecy and help Peko defeat Daburanda to reclaim his throne.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Peko (Prince Kuntakku)", role: "Key Ally / Dog Prince" },
      { name: "Minister Daburanda", role: "Primary Antagonist" },
      { name: "Brus", role: "Antagonist / Daburanda's Henchman" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-secret-gadget-museum",
    title: "Doraemon: Nobita's Secret Gadget Museum",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1Gv3Q7TLA_PuPUKugFhKU83xyWv0Mg3HW/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/SecretGadgetMuseum.jpg",
    rating: 4.7,
    year: 2013,
    releaseDate: "2013-03-09",
    duration: 104,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Yukiyo Teramoto",
    country: "Japan",
    genres: ["Animation", "Adventure", "Comedy", "Mystery", "Sci-Fi"],
    description:
      "When Doraemon is asleep, a mysterious thief known as Phantom Thief Deluxe steals his iconic bell. Using the 'Sherlock Holmes Suit', Nobita discovers that the thief has fled to the 22nd century. To retrieve the precious bell, Nobita and his friends travel to the future and visit the Secret Gadget Museum, a massive facility where every gadget ever created is displayed. There, they meet Kurt, a clumsy but passionate apprentice gadget maker, and his unusual slime-like companion, Popon. As they explore the incredible museum and search for clues, they soon realize that Phantom Thief Deluxe is targeting specific artifacts. The gang must solve the mystery of the phantom thief, uncover the museum's hidden secrets, and prevent a catastrophic event involving an unstable artificial sun.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Kurt", role: "Key Ally / Apprentice Maker" },
      { name: "Popon", role: "Kurt's Creation / Ally" },
      { name: "Phantom Thief Deluxe", role: "Antagonist / Mystery Thief" },
      { name: "Inspector Mustard", role: "Police Inspector" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
  {
    id: "d-adventure-of-koya-koya-planet",
    title:
      "Doraemon: The New Record of Nobita's Spaceblazer (Adventure of Koya Koya Planet)",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1hJAFSM3I7VimVnMy5v-E5lkjgVkL6Ets/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/AdventureOfKoyaKoyaPlanet.jpg",
    rating: 4.4,
    year: 2009,
    releaseDate: "2009-03-07",
    duration: 102,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Shigeo Koshi",
    country: "Japan",
    genres: ["Animation", "Adventure", "Sci-Fi", "Action"],
    description:
      "Due to a mysterious spatial distortion under the tatami mat in Nobita's room, a door connects directly to the cargo bay of a spaceship far out in the galaxy. There, Nobita and Doraemon meet a boy named Roppuru and his alien rabbit-like companion, Chami. They are residents of the Koya Koya Planet, a world with significantly weaker gravity than Earth. Because of this gravitational difference, Nobita and Doraemon discover they have Superman-like strength and agility when visiting. However, the peaceful Koya Koya Planet is under attack by the ruthless Gargantua Mining Corporation, an evil enterprise seeking to violently strip-mine the planet's valuable resource, Gargantite. Nobita, Doraemon, and their friends must step up as planetary heroes to defend Roppuru's home from the corporate invaders and their lethal mercenary, Guillermin.",
    characters: [
      { name: "Doraemon", role: "Main Character" },
      { name: "Nobita", role: "Main Character" },
      { name: "Shizuka", role: "Supporting Character" },
      { name: "Gian", role: "Supporting Character" },
      { name: "Suneo", role: "Supporting Character" },
      { name: "Roppuru", role: "Key Ally / Resident of Koya Koya" },
      { name: "Chami", role: "Ally / Roppuru's Pet" },
      { name: "Morina", role: "Key Ally" },
      { name: "Guillermin", role: "Primary Antagonist" },
    ],
    gallery: ["", "", "", ""],
    comments: [],
  },
];

/** Full detail rows (detail page lookup) */
export function getMovieById(id) {
  return MOVIE_DETAILS.find((m) => m.id === id) ?? null;
}

/**
 * Randomly pick 12-15 movies of the same cartoon (default: doraemon),
 * excluding the movie currently being viewed.
 */
export function getRecommendedMovies(excludeId, cartoonId = "doraemon") {
  const pool = MOVIE_DETAILS.filter(
    (m) => m.cartoonId === cartoonId && m.id !== excludeId
  );

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const count = Math.min(pool.length, 12 + Math.floor(Math.random() * 4)); // 12–15

  return shuffled.slice(0, count).map((m) => ({
    ...m,
    gradient: m.gradient ?? DORAEMON_GRADIENT,
    thumbnail: m.thumbnail?.trim() ? m.thumbnail : REC_THUMBNAIL,
  }));
}

// Per-movie likes & comment counts shown on the grid cards
const MOVIE_STATS = {
  "d-steel-troops":                          { likes: 248, commentsCount: 13 },
  "d-parallel-visit-to-the-west":            { likes: 87,  commentsCount: 6  },
  "d-tin-labyrinth":                         { likes: 156, commentsCount: 8  },
  "d-three-visionary-swordsmen":             { likes: 203, commentsCount: 11 },
  "d-adventure-in-south-seas":               { likes: 178, commentsCount: 7  },
  "d-legend-of-the-sun-king":                { likes: 215, commentsCount: 9  },
  "d-stand-by-me":                           { likes: 512, commentsCount: 34 },
  "d-nobitas-treasure-island":               { likes: 342, commentsCount: 21 },
  "d-little-space-war":                      { likes: 167, commentsCount: 10 },
  "d-stand-by-me-2":                         { likes: 423, commentsCount: 28 },
  "d-nobitas-new-dinosaur":                  { likes: 289, commentsCount: 15 },
  "d-nobitas-chronicle-of-the-moon-exploration": { likes: 198, commentsCount: 12 },
  "d-nobitas-space-heroes":                  { likes: 134, commentsCount: 7  },
  "d-nobitas-great-demon-peko":              { likes: 176, commentsCount: 9  },
  "d-secret-gadget-museum":                  { likes: 231, commentsCount: 14 },
  "d-adventure-of-koya-koya-planet":         { likes: 145, commentsCount: 8  },
};

MOVIE_DETAILS.forEach((m) => {
  const stats = MOVIE_STATS[m.id] ?? { likes: 0, commentsCount: 0 };
  m.likes = stats.likes;
  m.commentsCount = stats.commentsCount;
});

/** Grid/catalog — same rows as MOVIE_DETAILS (add films to MOVIE_DETAILS to grow the grid) */
export const ALL_MOVIES = MOVIE_DETAILS;

/** Returns the primary display title, handling both string and array formats */
export function getMovieTitle(movie) {
  if (!movie) return '';
  return Array.isArray(movie.title) ? movie.title[0] : (movie.title ?? '');
}

export const CONTINUE_WATCHING = MOVIE_DETAILS.filter(
  (m) => m.progress != null
);

export const WATCH_HISTORY = MOVIE_DETAILS.filter(
  (m) => m.progress != null && m.progress >= 80
);

export const PARTY_MOVIE_OPTIONS = ALL_MOVIES;

/** Unique cartoons derived from ALL_MOVIES */
export const CARTOON_OPTIONS = Array.from(
  new Map(
    ALL_MOVIES.map((m) => [
      m.cartoonId,
      {
        id: m.cartoonId,
        label: m.cartoonId.charAt(0).toUpperCase() + m.cartoonId.slice(1),
      },
    ])
  ).values()
);
