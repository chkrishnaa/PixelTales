export const ADMIN_USER = "PixelTales";

const LIKERS_POOL = [
  { name: "Raj Patel", email: "raj.patel@pixeltales.com" },
  { name: "Meera Singh", email: "meera.singh@pixeltales.com" },
  { name: "Aditya Kumar", email: "aditya.kumar@pixeltales.com" },
  { name: "Pooja Nair", email: "pooja.nair@pixeltales.com" },
  { name: "Kunal Joshi", email: "kunal.joshi@pixeltales.com" },
  { name: "Riya Verma", email: "riya.verma@pixeltales.com" },
  { name: "Siddharth Rao", email: "siddharth.rao@pixeltales.com" },
  { name: "Nisha Patel", email: "nisha.patel@pixeltales.com" },
  { name: "Vikram Malhotra", email: "vikram.malhotra@pixeltales.com" },
  { name: "Deepa Sharma", email: "deepa.sharma@pixeltales.com" },
  { name: "Yash Trivedi", email: "yash.trivedi@pixeltales.com" },
  { name: "Kritika Das", email: "kritika.das@pixeltales.com" },
  { name: "Aryan Bose", email: "aryan.bose@pixeltales.com" },
  { name: "Simran Kaur", email: "simran.kaur@pixeltales.com" },
  { name: "Manish Dubey", email: "manish.dubey@pixeltales.com" },
  { name: "Anjali Gupta", email: "anjali.gupta@pixeltales.com" },
  { name: "Rohit Khanna", email: "rohit.khanna@pixeltales.com" },
  { name: "Preeti Sinha", email: "preeti.sinha@pixeltales.com" },
  { name: "Tarun Mehta", email: "tarun.mehta@pixeltales.com" },
  { name: "Sunita Iyer", email: "sunita.iyer@pixeltales.com" },
  { name: "Karan Bajaj", email: "karan.bajaj@pixeltales.com" },
  { name: "Divya Menon", email: "divya.menon@pixeltales.com" },
  { name: "Pranav Shah", email: "pranav.shah@pixeltales.com" },
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
    id: "d-nobita-and-the-steel-troops",
    title: [
      "Doraemon: Nobita and the Steel Troops",
      "Doraemon: Nobita and the Steel Troops: The New Age",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT, // Assuming this is imported elsewhere
    progress: 62,
    videoUrl:
      "https://drive.google.com/file/d/1LeLvdNurMAwANalm1HWchhS1TotCh0v7/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops.jpg",
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
      {
        name: "Doraemon",
        role: "Main Character",
        photo: "",
        bio: "Doraemon is a robotic cat from the 22nd century sent to help Nobita. In this film, his futuristic gadgets and unwavering loyalty are put to the ultimate test as he helps Nobita navigate the mirror world and stand against a mechanical army far more powerful than anything they have faced before.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo: "",
        bio: "Nobita is the kind-hearted but clumsy hero who accidentally triggers the robot invasion. Driven by guilt and love for his friends, he undergoes remarkable growth in this movie — transforming from a boy who always gives up into someone willing to sacrifice everything to protect the world.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo: "",
        bio: "Shizuka is Nobita's gentle and compassionate friend whose courage proves crucial at pivotal moments. Her bond with Riruru becomes one of the movie's most touching storylines, showing that friendship can transcend even the greatest of conflicts.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo: "",
        bio: "Gian, usually the bully of the group, reveals a surprisingly brave and self-sacrificing side in this film. When the stakes rise to a planetary level, he steps up without hesitation — proving that true strength comes from protecting the people you care about.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo: "",
        bio: "Suneo's mechanical knowledge and clever thinking prove surprisingly useful during the robot crisis. Though he can be self-serving, his loyalty to his friends shines through when the group faces seemingly impossible odds in the mirror world.",
      },
      {
        name: "Zanda Claus",
        role: "Robot Ally",
        photo: "",
        bio: "Zanda Claus is a giant robotic warrior that Nobita secretly assembles inside the mirror world. Initially a source of fun and adventure, it becomes the group's last line of defence — a symbol of Nobita's determination to fight for peace.",
      },
      {
        name: "Pippo",
        role: "Antagonist / Ally",
        photo: "",
        bio: "Pippo is a small robotic soldier who begins as part of the invading army but gradually reveals a more complex nature. His interactions with Nobita force him to question the purpose of war, making him one of the film's most memorable and layered characters.",
      },
      {
        name: "Riruru",
        role: "Key Antagonist / Ally",
        photo: "",
        bio: "Riruru starts as the primary antagonist — a brilliant and ruthless robot general — but her arc is one of the most emotionally powerful in the entire Doraemon series. Her evolving relationship with Shizuka transforms her from enemy to the story's most heartbreaking hero.",
      },
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
    id: "d-nobita-bana-superhero",
    title: [
      "Doraemon: Nobita's Bana Superhero",
      "Doraemon: The Record of Nobita's Parallel Visit to the West",
      "Doraemon: Nobita's Parallel Journey to the West",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1AkSI1NF0mZXTW5plSNfse6PFVgqXHdGv/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaBanaSuperhero.jpg",
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
    id: "d-khel-khilona-bhool-bhulaiya",
    title: [
      "Doraemon The Movie: Khel Khilona Bhool Bhulaiya",
      "Doraemon The Movie: Nobita and the Tin Labyrinth",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1oG9uswDZP8skgm8YayHt7BMf06R-Gtl1/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/KhelKhilonaBhoolBhulaiya.jpg",
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
    id: "d-teen-kaabil-talwarbaaz",
    title: [
      "Doraemon the Movie: Nobita or Teen Kaabil Talwarbaaz",
      "Doraemon the Movie: Nobita's Three Visionary Swordsmen",
      "Doraemon the Movie: Nobita's Three Magical Swordsmen",
      "Doraemon the Movie: The Fantastic Three Musketeers",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/16IKZg7IOcN10bXVx_fwQhRh7GOKL_7WT/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TeenKaabilTalwarbaaz.jpg",
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
    id: "d-nobitas-great-adventure-in-the-south-seas",
    title: [
      "Doraemon: Nobita's Great Adventure in the South Seas",
      "Doraemon: Nobita's South Sea Adventure",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1v6J1jH9gofCZr6XNO27mYaZ4x-y8qGid/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureInTheSouthSeas.jpg",
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
    id: "d-yeh-bhi-tha-nobita-woh-bhi-tha-nobita",
    title: [
      "Doraemon The Movie: Yeh Bhi Tha Nobita Woh Bhi Tha Nobita",
      "Doraemon: Nobita and the Legend of the Sun King",
      "Doraemon: Doraemon and the Empire of the Sun",
      "Doraemon the Movie: Nobita's Legendary King of The Sun",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1QZ6n0MLXDlrdsXKt7W4YQ1Sd0Rwz7Mgg/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/YehBhiThaNobitaWohBhiThaNobita.jpg",
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
    title: "Doraemon: Stand by Me",
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
    title: "Doraemon The Movie: Nobita's Treasure Island",
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
    id: "d-nobitas-little-space-war",
    title: [
      "Doraemon: Nobita's Little Space War",
      "Doraemon: Nobita's Little Star Wars",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1l6V8mnu4jJOnKVyW1S2srgQAItgp-8r6/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleSpaceWar.jpg",
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
    title: "Doraemon: Stand by Me 2",
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
    title: "Doraemon The Movie: Nobita's New Dinosaur",
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
    id: "d-nobita-chala-chand-pe",
    title: [
      "Doraemon The Movie: Nobita Chala Chand Pe",
      "Doraemon: Nobita's Chronicle of the Moon Exploration",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/17yRUXq88CLDqFL7LbHrOFx6McmJBwdBD/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalaChandPe.jpg",
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
    id: "d-nobita-aur-antariksh-daku",
    title: [
      "Doraemon The Movie: Nobita Aur Antariksh Daku",
      "Doraemon: Nobita's Space Heroes",
      "Doraemon: Nobita and The Super Star",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1hDP7GAMyGOwBWZFK0VUIb9C7CSu5v3RW/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurAntarikshDaku.jpg",
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
    id: "d-nobita-the-explorer-bow-bow",
    title: [
      " Doraemon The Movie: Nobita The Explorer Bow! Bow!",
      "Doraemon: New Nobita's Great Demon Peko and the Exploration Party of 5",
      "Doraemon: Nobita and the Haunts of Evil",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1b8xBI9icujr6pxa0JlLKsH_o0wFn725C/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaTheExplorerBowBow.jpg",
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
    id: "d-nobita-aur-gadget-museum-ka-rahasya",
    title: [
      "Doraemon The Movie: Nobita aur Gadget Museum Ka Rahasya",
      "Doraemon the Movie: Nobita in the Secret Gadget Museum",
      "Doraemon: Nobita's Secret Gadget Museum",
      "Doraemon the Movie: Doraemon and Nobita Holmes in the Mysterious Museum of the Future",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1Gv3Q7TLA_PuPUKugFhKU83xyWv0Mg3HW/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurGadgetMuseumKaRahasya.jpg",
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
    id: "d-nobita-and-the-adventure-of-koya-koya-planet",
    title: [
      "Doraemon: Nobita and the Adventure of Koya Koya Planet",
      "Doraemon: The New Record of Nobita's Spaceblazer",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1hJAFSM3I7VimVnMy5v-E5lkjgVkL6Ets/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheAdventureOfKoyaKoyaPlanet.jpg",
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

  {
    id: "d-nobita-and-the-galaxy-super-express",
    title: [
      "Doraemon The Movie: Nobita and the Galaxy Super Express",
      "Doraemon: Nobita and the Galaxy Express",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 40,
    videoUrl:
      "https://drive.google.com/file/d/1ayp_cSCI8vO6kj3ZXr7ee5zrBB7Ukmoj/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheGalaxySuperExpress.jpg",
    rating: 4.7,
    year: 1996,
    releaseDate: "1996-03-02",
    duration: 97,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Comedy", "Family"],
    description:
      "After Suneo boasts about his trip on a luxury Mystery Train, an envious Nobita begs Doraemon for a better adventure. Doraemon pulls out tickets for the Galaxy Super Express, a futuristic space train that looks like an old steam locomotive but travels through the cosmos to a massive interstellar theme park called Dreamers Land. Nobita, Doraemon, Shizuka, Gian, and Suneo enjoy various attractions, including Western, Ninja, and Fairy Tale-themed planets. However, the fun vacation takes a terrifying turn when the park is suddenly attacked by the Yadori, a parasitic alien race that takes control of human bodies. Trapped in space, Nobita and the gang must arm themselves with futuristic weapons to fight off the invasion and save the galaxy.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheGalaxySuperExpress.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheGalaxySuperExpress.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheGalaxySuperExpress.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheGalaxySuperExpress.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-dorabian-nights",
    title: "Doraemon The Movie: Nobita's Dorabian Nights",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1ul3lVHy6AYdjZYA7lnhncOPk_4NFWmJS/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDorabianNights.jpg",
    rating: 4.6,
    year: 1991,
    releaseDate: "1991-03-09",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Comedy", "Family"],
    description:
      "Using Doraemon's 'Storybook Shoes', Nobita and his friends experience the magical world of their favorite fairytales. However, disaster strikes when Nobita's mother accidentally mixes up the storybooks, causing Shizuka to lose her shoe and get trapped inside the world of the Arabian Nights. With the storybook later ruined in the real world, Doraemon realizes the only way to save her is to travel back in time to the actual 8th-century Arabian Peninsula, the era that inspired the tales. Upon arriving in historical Baghdad, Nobita, Doraemon, Gian, and Suneo embark on a treacherous desert journey. Along the way, they must survive harsh conditions, outsmart a ruthless slave trader named Kassim, and eventually team up with the legendary, gadget-wielding King Sinbad to rescue Shizuka from an evil sorcerer.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDorabianNights.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDorabianNights.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDorabianNights.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDorabianNights.jpg",
    ],
    comments: [],
  },
  {
    id: "d-jadoo-mantar-aur-jahnoom",
    title: [
      "Doraemon The Movie: Jadoo Mantar Aur Jahnoom",
      "Doraemon: Nobita's New Great Adventure into the Underworld",
      "Doraemon: Nobita's Magic World Adventure",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1fusFmJDRwcXDsxaQ2-v_KkhfNSKnAJ4b/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoom.jpg",
    rating: 4.6,
    year: 2007,
    releaseDate: "2007-03-10",
    duration: 112,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Yukiyo Teramoto",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Action", "Family"],
    description:
      "Frustrated by the limitations of science and his everyday problems, Nobita uses Doraemon's 'What-If Telephone Booth' gadget to turn the real world into a magical universe. While magic replaces technology as the norm, Nobita soon discovers that he still has to go to school to learn how to use it. However, this fascinating new reality hides a dark and terrifying secret: a demonic planet from the Underworld is rapidly approaching to destroy Earth. Teaming up with Miyoko, a skilled magic user, and her father Professor Mangetsu, Nobita and his friends are forced to become the legendary 'Seven Magic Users'. Armed with silver magic darts and a mystical scroll, the gang must journey into the perilous Devildom Star, battle Medusa, and defeat the terrifying Demon King Demaon to save their world.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoom.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoom.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoom.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoom.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-chal-pada-antarctica",
    title: [
      "Doraemon The Movie: Nobita Chal Pada Antarctica",
      "Doraemon: Nobita's Great Adventure in the Antarctic Kachi Kochi",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1U45OMDL50np6yNuefft7wj2v3JyvXcut/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalPadaAntarctica.jpg",
    rating: 4.5,
    year: 2017,
    releaseDate: "2017-03-04",
    duration: 101,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Atsushi Takahashi",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Mystery"],
    description:
      "Unable to endure the sweltering summer heat in Tokyo, Nobita and his friends travel to a giant iceberg floating in the South Pacific. While creating an ice amusement park using Doraemon's gadgets, Nobita discovers a mysterious golden ring frozen deep within the ice. Upon investigation, they realize the ring was buried 100,000 years ago—long before human civilization reached Antarctica! Searching for its owner, the gang heads to the South Pole, where they uncover the incredible ruins of a massive ancient city buried beneath the ice. Using the Time Belt, they travel back 100,000 years and meet a young girl named Kara and Professor Hyakkoi. They soon learn that Kara's home planet was completely frozen by a terrifying ancient entity known as Blizzaga, and now Earth is its next target. Nobita, Doraemon, and their friends must brave the harsh frozen wasteland to stop Earth from plunging into an eternal Ice Age.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalPadaAntarctica.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalPadaAntarctica.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalPadaAntarctica.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaChalPadaAntarctica.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-sky-utopia",
    title: "Doraemon: Nobita's Sky Utopia",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1Tk66zTwyB6NTQVMLyXdpKKVI-tD3vT-D/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSkyUtopia.jpg",
    rating: 4.7,
    year: 2023,
    releaseDate: "2023-03-03",
    duration: 107,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Takumi Doyama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "After hearing about a legendary place where everyone lives happily without conflict or the need to study, Nobita begs Doraemon to help him find it. Using a newly acquired time-traveling airship called the Time Zeppelin, the gang searches the skies and discovers Paradapia, a magnificent, flawless floating city ruled by Three Sages. In this seemingly perfect society, everyone is entirely free of faults, and the gang quickly befriends a 'perfect' robot cat named Sonya. However, Nobita and his friends soon uncover a sinister and dark truth hidden beneath Paradapia's flawless facade. Realizing that true humanity lies in embracing our imperfections and differences, the group must join forces with Sonya to confront the leaders of Paradapia, fight for their individuality, and stop an evil plan to strip the world of its free will.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSkyUtopia.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSkyUtopia.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSkyUtopia.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSkyUtopia.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-in-itchi-mera-dost",
    title: [
      "Doraemon The Movie: Nobita In Itchi Mera Dost",
      "Doraemon: Nobita in the Wan-Nyan Spacetime Odyssey",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1smR8R-KJG5ZkSrUdzZ1UpnqHB3maSnF0/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInItchiMeraDost.jpg",
    rating: 4.7,
    year: 2004,
    releaseDate: "2004-03-06",
    duration: 84,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Comedy", "Family"],
    description:
      "After rescuing a stray puppy from drowning, Nobita secretly adopts him and names him Itchi. Realizing that modern Tokyo is no longer safe for stray animals, Nobita and Doraemon use the Time Machine to transport Itchi and a massive group of other stray cats and dogs 300 million years into the past. Before leaving, Doraemon uses the Evolution Ray to grant the animals human-like intelligence and tools to survive. When the gang attempts to visit Itchi the next day, a temporal anomaly causes them to crash-land 1,000 years after they initially left the animals. To their absolute shock, they discover a thriving, highly advanced metropolis built entirely by the descendants of the dogs and cats! There, they meet a brave teenage dog named Hachi, who bears a striking resemblance to Itchi. Together, they must stop an evil feline dictator named Nekojara, who plans to steal the Time Machine and exact revenge on the human race.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurItchiMeraDost.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurItchiMeraDost.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurItchiMeraDost.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurItchiMeraDost.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-art-world-tales",
    title: "Doraemon: Nobita's Art World Tales",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1ed4c2FgsHGgqszd2YSgFaIKpPCdHKylD/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasArtWorldTales.jpg",
    rating: 4.8,
    year: 2025,
    releaseDate: "2025-03-07",
    duration: 105,
    language: "Hindi Dubbed", // Expected to be dubbed in the future
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Yukiyo Teramoto",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Animation", "Family"],
    description:
      "While working on his summer homework, Nobita discovers a mysterious fragment of a wooden painting. Using Doraemon's special gadget, the group enters the magnificent medieval European world depicted in the artwork—the surreal and vibrant Principality of Artoria. There, they meet a girl named Claire and her friends Mairo and Chai. The legend of 'Artoria Blue', a legendary extinct gemstone pigment, draws them into a deeper mystery. However, an ancient prophecy of world destruction is suddenly reawakened, threatening to drain the entire painting world of its color. Nobita, Doraemon, and the gang must jump from piece to piece, stop a malevolent time traveler, and save this beautiful world born from brushstrokes and imagination.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasArtWorldTales.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasArtWorldTales.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasArtWorldTales.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasArtWorldTales.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-earth-symphony",
    title: "Doraemon The Movie: Nobita's Earth Symphony",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1PamKEIBbLTE-D9HE86ZGGyWrYuFtbc9X/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasEarthSymphony.jpg",
    rating: 4.6,
    year: 2024,
    releaseDate: "2024-03-01",
    duration: 115,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Kazuaki Imai",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Music", "Fantasy", "Family"],
    description:
      "In preparation for the school music festival, Nobita is struggling to play the recorder. His terrible notes unexpectedly catch the attention of a mysterious girl named Micca, who is enchanted by the strange, relaxing sounds he makes. Micca invites Nobita, Doraemon, and the rest of the gang to the 'Farre Hall', a grand musical conservatory located on a distant planet where music is used as energy. She reveals that she is searching for a musical genius to help revive her world's fading musical power. Using Doraemon's 'Musician License', the friends choose their instruments and form a band to play alongside Micca. However, their harmonious adventure is disrupted when a terrifying, eerie entity that erases music entirely from the universe threatens to destroy Earth. Nobita and his friends must master their instruments and use the power of a perfect symphony to save music itself.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasEarthSymphony.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasEarthSymphony.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasEarthSymphony.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasEarthSymphony.jpg",
    ],
    comments: [],
  },
  {
    id: "d-toofani-adventure",
    title: [
      "Doraemon The Movie: Toofani Adventure",
      "Doraemon: Nobita and the Windmasters",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1M27TsO05JADjsrtwwWKGwO3fhvjRBhv2/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ToofaniAdventure.jpg",
    rating: 4.6,
    year: 2003,
    releaseDate: "2003-03-08",
    duration: 84,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Action", "Family"],
    description:
      "One day, Nobita discovers a mysterious, invisible wind creature and affectionately names it Fuuko. To give Fuuko a safe place to play freely, Doraemon, Nobita, and their friends use the Anywhere Door to travel to the Wind Village, a hidden, peaceful land where the inhabitants harness the wind to fly and live harmoniously. However, their magical vacation is cut short when the evil Storm Village clan, led by the dark sorcerer Uranda, attacks. Uranda seeks to capture Fuuko, revealing that the little wind creature holds the key to awakening a massive, world-destroying storm dragon known as Mafuga. When Suneo is possessed by Uranda's dark spirit, the stakes reach a breaking point. Nobita and the gang must ally with the brave warriors of the Wind Village to break the curse on Suneo, defeat the Storm clan, and prevent Mafuga from unleashing ultimate devastation.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ToofaniAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ToofaniAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ToofaniAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/ToofaniAdventure.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-aur-jadooi-tapu",
    title: [
      "Doraemon The Movie: Nobita Aur Jadooi Tapu",
      "Doraemon: Nobita and the Island of Miracles ~Animal Adventure~",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1w57hNCJVt79Y9PvoeJ_mrYZoKFtSAcLf/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJadooiTapu.jpg",
    rating: 4.4,
    year: 2012,
    releaseDate: "2012-03-03",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Kozo Kusuba",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Family", "Sci-Fi"],
    description:
      "After catching a rhinoceros beetle and promising his father to take good care of it, Nobita asks Doraemon to help him find a safe place where the beetle can thrive. Using a Time Hole, they stumble upon Beremakam Island—a magical, secret sanctuary protected by the power of the mystical Golden Hercules beetle. To their amazement, this remote island is inhabited by magnificent animal species that have long been extinct on Earth, such as Dodo birds, Moas, and Smilodons. During their exploration, Nobita meets a brave, mysterious boy named Dakke, who bears a striking resemblance to Nobita's own father as a child. The peaceful sanctuary is soon threatened by an evil businessman named Sherman from the future, who plans to capture the Golden Hercules to sell it for a fortune. Nobita, Doraemon, Dakke, and the rest of the gang must unite to stop Sherman's high-tech mercenaries and protect this island of miracles.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJadooiTapu.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJadooiTapu.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJadooiTapu.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJadooiTapu.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-in-jannat-no-1",
    title: [
      "Doraemon The Movie: Nobita in Jannat No. 1",
      "Doraemon: Nobita and the Kingdom of Clouds",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 85,
    videoUrl:
      "https://drive.google.com/file/d/1492chswswbLucIzLAIdtCiHGdiRTtp0a/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInJannatNo1.jpg",
    rating: 4.7,
    year: 1992,
    releaseDate: "1992-03-07",
    duration: 98,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Sci-Fi", "Family"],
    description:
      "After learning about different types of clouds in school, Nobita clings to the belief that a magical heaven-like kingdom exists above them. To make his dream come true, Doraemon uses his futuristic gadgets to help Nobita and their friends build their very own spectacular Cloud Kingdom (their 'Jannat'). However, during their sky-high adventures, they make a shocking discovery: a real, highly advanced utopia already exists in the clouds! This actual kingdom is inhabited by the 'Heavenians,' a peaceful race of sky-dwellers who are deeply angered by the severe environmental pollution and destruction caused by the Earthlings below. To protect nature, the Heavenians have devised the terrifying 'Noah Plan' to wash away all life on the Earth's surface with a massive flood. Nobita, Doraemon, and the gang must desperately plead humanity's case, stop the devastating flood, and prove that the people of Earth can change their ways before it's too late.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInJannatNo1.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInJannatNo1.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInJannatNo1.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInJannatNo1.jpg",
    ],
    comments: [],
  },

  //Pisuke
  {
    id: "d-nobita-aur-pisuke",
    modern: false,
    title: [
      "Doraemon The Movie: Nobita Aur Pisuke",
      "Doraemon The Movie: Nobita's Dinosaur",
      "Doraemon: Nobita and Little Dinosaur",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1Y8HYQIAxM4jJNGaBH0nobpyEQ90aCTWz/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurPisuke.jpg",
    rating: 4.6,
    year: 1980,
    releaseDate: "1980-03-15",
    duration: 100,
    language: "Japanese / English Subbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Hiroshi Fukutomi",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Drama", "Family", "Fantasy"],
    description:
      "The historic first feature-length Doraemon film that started it all! After making a bold bet with Suneo, Nobita searches for a real dinosaur fossil and miraculously unearths a prehistoric egg. Using Doraemon's 'Time Cloth', he brings it back to life, hatching a sweet baby Futabasaurus whom he names Pisuke. Nobita raises Pisuke with deep affection, but as the dinosaur grows massive, keeping him a secret in modern Tokyo becomes impossible. Traveling 100 million years into the past to the Cretaceous period, the gang sets out to return Pisuke to his true home. Their emotional farewell turns perilous when illegal futuristic dinosaur hunters target Pisuke, leaving the friends stranded in the ancient wild. Nobita and his crew must cross a treacherous prehistoric landscape to protect Pisuke and find a way back to the future.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur1980.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur1980.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur1980.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur1980.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-aur-pisuke-remake",
    title: [
      "Doraemon The Movie: Nobita Aur Pisuke (Remake)",
      "Doraemon The Movie: Nobita's Dinosaur (Remake)",
      "Doraemon: Nobita and Little Dinosaur (Remake)",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 62,
    videoUrl: "",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurPisukeRemake.jpg",
    rating: 4.5,
    year: 2006,
    releaseDate: "2006-03-04",
    duration: 107,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Ayumu Watanabe",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Family", "Drama"],
    description:
      "After a boastful argument with Suneo, Nobita stubbornly sets out to find a real dinosaur fossil. Against all odds, he unearths a fossilized egg and uses Doraemon's 'Time Cloth' to restore it. To his absolute amazement, an adorable baby Futabasaurus hatches from the egg! Nobita lovingly names the dinosaur Pisuke, and the two form a deeply emotional and unbreakable bond. However, as Pisuke rapidly grows into a massive prehistoric creature, he becomes impossible to hide in modern-day Tokyo. With a heavy heart, Nobita realizes he must return his best friend to his true home in the Late Cretaceous period. What starts as a sad farewell quickly turns into a dangerous survival mission when the Time Machine breaks down, stranding the gang in prehistoric times. To make matters worse, a ruthless group of illegal dinosaur hunters from the 22nd century sets their sights on capturing Pisuke. Nobita and his friends must brave a perilous journey across the ancient world to protect Pisuke and ensure he makes it home safely.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasDinosaur.jpg",
    ],
    comments: [],
  },

  //Nobita Aur Ek Jalpari
  {
    id: "d-nobita-aur-ek-jalpari",
    title: [
      "Doraemon The Movie: Nobita Aur Ek Jalpari",
      "Doraemon The Movie: Nobita's Mermaid Legend",
      "Doraemon: Nobita's Great Battle of the Mermaid King",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "https://drive.google.com/file/d/11xljJ0iQ2ihOtWx1GGrHT_kEcwWAlv3i/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurEkJalpari.jpg",
    rating: 4.3,
    year: 2010,
    releaseDate: "2010-03-06",
    duration: 99,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Kozo Kusuba",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Animation", "Family"],
    description:
      "When Nobita wants to go diving, Doraemon uses his futuristic gadgets to simulate a vast ocean right in their neighborhood, flooding the streets with imaginary water. While exploring this underwater world, they accidentally encounter Sophia, a real mermaid princess from an advanced civilization. The gang quickly befriends her and learns that her people migrated to Earth's oceans long ago after their home planet, Aqua Star, was devastated. However, the peaceful mermaid kingdom is suddenly targeted by the evil Demon Fish Tribe, led by the ruthless King Buikin, who seeks to steal the legendary Mermaid Sword to conquer the seas. When Shizuka is mistakenly captured by the invading forces, Nobita, Doraemon, Sophia, and their friends must dive deep into the real ocean to rescue her, protect the sacred sword, and save the underwater world.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurEkJalpari.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurEkJalpari.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurEkJalpari.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurEkJalpari.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-aur-jungle-mein-dangal",
    title: [
      "Doraemon the Movie: Nobita aur Jungle Mein Dangal",
      "Doraemon: Nobita and the Animal Planet",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1O3YvAU2V6jsJvCSovY4y2weyWxyH7KqD/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJungleMeinDangal.jpg",
    rating: 4.5,
    year: 1990,
    releaseDate: "1990-03-10",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Comedy", "Family", "Sci-Fi"],
    description:
      "One night, Nobita steps out into a strange, glowing pink gas cloud and ends up in a mysterious forest where animals walk on two legs, speak human language, and live in a highly advanced, clean-energy society. Excited by his discovery, Nobita brings Doraemon, Shizuka, Gian, and Suneo along to explore this magical Animal Planet. They quickly befriend a young dog boy named Chippo, whose father is a researcher looking into ancient planetary legends. However, the group soon learns that the peaceful world of talking animals is under imminent threat from a hostile alien race known as the Nimuge. The Nimuge plan a brutal environmental invasion to strip the Animal Planet of its pristine resources. Nobita and his friends must stand side-by-side with Chippo and the planetary resistance to foil the invaders' high-tech assault and protect nature.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJungleMeinDangal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJungleMeinDangal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJungleMeinDangal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurJungleMeinDangal.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-ki-universe-yatra",
    title: [
      "Doraemon The Movie: Nobita Ki Universe Yatra",
      "Doraemon: Nobita Drifts in the Universe",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1XNsnt5wpzLt79J7RnlTqKex0MfiYEUAr/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiUniverseYatra.jpg",
    rating: 4.4,
    year: 1999,
    releaseDate: "1999-03-06",
    duration: 93,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Action", "Family"],
    description:
      "After Suneo boasts about a future space travel ticket, an envious Nobita begs Doraemon for an interstellar adventure. Doraemon introduces a futuristic space simulation game that allows them to explore outer space safely from home. However, during a play session, a massive mishap occurs, leaving Gian and Suneo trapped inside the capsule game right as it gets mistakenly gathered by a real alien spaceship (UFO). To rescue their friends, Nobita, Doraemon, and Shizuka launch a high-stakes cosmic pursuit into uncharted regions of the galaxy. Along the way, they are saved by the Space Knights Troupe, a heroic crew guarding the Milky Way Drifting Fleet—a massive collection of nomadic aliens looking for a habitable new homeworld. The adventure turns critical when a rogue faction within the fleet decides to violently conquer Earth as their new home, forcing Nobita and the Space Knights to team up in an epic cosmic war to save Earth.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiUniverseYatra.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiUniverseYatra.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiUniverseYatra.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiUniverseYatra.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-in-hara-hara-planet",
    title: [
      "Doraemon The Movie: Nobita in Hara Hara Planet",
      "Doraemon the Movie: Nobita and the Green Planet",
      "Doraemon: Nobita and the Green Giant Legend",
      "Doraemon: Nobita's Planet Quest.",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1mNFLwpiDXGZXHCoV1VSuQW-o86FM4KUh/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInHaraHaraPlanet.jpg",
    rating: 4.2,
    year: 2008,
    releaseDate: "2008-03-08",
    duration: 112,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Ayumu Watanabe",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Drama", "Family", "Sci-Fi"],
    description:
      "While trying to hide his zero-mark test papers in a garbage dump, Nobita finds a small, withered sapling and decides to bring it home. To help it grow, Doraemon uses the 'Plant Automatic Liquid' gadget, which miraculously brings the little tree to life. Nobita lovingly names the living plant boy Kibo. Kibo quickly becomes a cherished member of the family, demonstrating immense intelligence and learning at an incredible pace. However, their peaceful days are interrupted when the gang is suddenly abducted and brought to the Green Planet—a highly advanced universe ruled entirely by intelligent plant aliens. Deeply angered by humanity's continuous destruction of Earth's environment, the leaders of the Green Planet plan to execute a decree that will freeze all human life and reclaim the Earth for nature. Nobita, Doraemon, and their loyal friends must team up with Princess Lire of the plant kingdom to protect Kibo, stand up for humanity, and find a path toward peaceful coexistence.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInHaraHaraPlanet.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInHaraHaraPlanet.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInHaraHaraPlanet.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInHaraHaraPlanet.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-underwater-adventure",
    title: [
      "Doraemon The Movie: Nobita's Underwater Adventure",
      "Doraemon: Nobita and the Castle of the Undersea Devil",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1lQMrWaUn3lpc-ORIDDfVJhvwyCI1nqcQ/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasUnderwaterAdventure.jpg",
    rating: 4.6,
    year: 1983,
    releaseDate: "1983-03-12",
    duration: 94,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Action", "Family", "Fantasy"],
    description:
      "While arguing over whether to go to the mountains or the ocean for summer vacation, Nobita and his friends decide to camp at the very bottom of the Atlantic Ocean using Doraemon's special adaptation gadgets. Driving an intelligent, sassy underwater vehicle called the Buggy, they embark on a spectacular deep-sea exploration. However, their peaceful vacation turns into a dangerous mission when they uncover the hidden undersea federation of Mu and the hostile, long-lost empire of Atlantis. Atlantis's ancient, automated defensive supercomputer, Poseidon, has been reawakened and threatens to trigger a global apocalypse with deadly missiles. Captured by the deep-sea inhabitants, Nobita and the gang must team up with a brave undersea warrior named El and rely on the ultimate sacrifice of their Underwater Buggy to destroy Poseidon and save Earth.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasUnderwaterAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasUnderwaterAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasUnderwaterAdventure.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasUnderwaterAdventure.jpg",
    ],
    comments: [],
  },
  {
    id: "d-dinosaur-yoddha",
    title: [
      "Doraemon The Movie: Dinosaur Yoddha",
      "Doraemon: Nobita and the Knights on Dinosaurs",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1KvCxpB6HwG6EzLhv4CnZHgnVedCRyY4Y/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/DinosaurYoddha.jpg",
    rating: 4.4,
    year: 1987,
    releaseDate: "1987-03-14",
    duration: 93,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Action", "Family"],
    description:
      "After an intense argument with Suneo about whether dinosaurs still exist on Earth, Nobita turns to Doraemon for help. To solve the problem while finding a safe hideout for Nobita's failing test papers, Doraemon uses a gadget to open a passage to a massive underground cavern. While exploring, Suneo accidentally gets separated from the group and goes missing deep within the subterranean tunnels. When the gang goes on a high-stakes rescue mission, they are stunned to discover a thriving, highly advanced underground civilization populated by evolved, humanoid dinosaur-people who worship the prehistoric creatures. They are rescued from danger by a noble dinosaur knight named Banhou, but they quickly uncover a secret military plot to launch an invasion and reclaim the Earth's surface from humans. Nobita and his friends must navigate this hidden world, save Suneo, and find a way to forge peace between humans and the dinosaur knights.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/DinosaurYoddha.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/DinosaurYoddha.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/DinosaurYoddha.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/DinosaurYoddha.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-and-the-birth-of-japan",
    title: "Doraemon The Movie: Nobita and the Birth of Japan",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1XZ0AcC4f5cZ-hhM5UEE5m-5gzlAxxIqN/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapan.jpg",
    rating: 4.6,
    year: 1989,
    releaseDate: "1989-03-11",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "Feeling overwhelmed by the strict expectations of their parents and school, Nobita, Doraemon, Shizuka, Gian, and Suneo all independently decide to run away from home. However, they soon realize that every inch of modern Japan is already developed or owned. Seeking absolute freedom, they ride the Time Machine 70,000 years into the past to a pristine prehistoric Japan. There, they establish a vast secret paradise where everyone manages their own custom ecosystem. Their peaceful ancient getaway takes a dramatic turn when they rescue Kukuru, a young primitive boy from the Light Tribe who was swept into their path by a temporal rift. Kukuru reveals that his clan has been violently abducted and enslaved by the immortal rogue time-traveler Gigazombie and his mystical army. Armed with powerful futuristic gadgets and riding majestic genetically cloned creatures, Nobita and his friends embark on a high-stakes rescue mission across the ancient world to stop Gigazombie from altering the course of human history.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapan.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-ki-nayi-duniya",
    title: [
      "Doraemon the Movie: Nobita Ki Nayi Duniya",
      "Doraemon: Nobita's Diary of the Creation of the Earth",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiNayiDuniya.jpg",
    rating: 4.2,
    year: 1995,
    releaseDate: "1995-03-04",
    duration: 100,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "Struggling to find a unique topic for his summer vacation research project, Nobita gets access to Doraemon's ultimate educational gadget: the 'Creation Set'. Using this tool, Nobita assumes a god-like role and generates a miniature duplicate universe, tracking the creation and evolution of Earth from a swirling cloud of cosmic dust down to the rise of human civilization. However, as the gang watches the mini-world evolve, they realize that a subterranean species of highly evolved insectoid beings has developed parallel to humans. These underground dwellers plan to build a time machine to reclaim the planet's surface from human control. Nobita, Doraemon, and their friends must dive deep into their own creation to prevent a massive war and help both civilizations find a way to coexist harmoniously.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiNayiDuniya.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiNayiDuniya.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiNayiDuniya.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaKiNayiDuniya.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-in-gol-gol-golmaal",
    title: [
      "Doraemon The Movie: Nobita in Gol Gol Golmaal",
      "Doraemon: Nobita and the Spiral City",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1bxFKZlTwmneI6gdb5eRnH8F2VCsCTOej/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInGolGolGolmaal.jpg",
    rating: 4.4,
    year: 1997,
    releaseDate: "1997-03-08",
    duration: 99,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "After Suneo brags about his family ranch, an envious Nobita turns to Doraemon for help. They discover that Doraemon has accidentally won several seemingly useless asteroid-planets in a 22nd-century lottery. Investigating the last ticket, they stumble upon a beautiful, lush planet perfectly suited for a getaway. Using a magical clockwork 'Life Key', they bring their favorite toys and stuffed animals to life and team up to build a magnificent, self-sustaining toy town. However, a dangerous escaped convict from the future, Onigoro Kumatora, accidentally slips onto the planet and discovers a duplication mirror, creating an army of greedy clones to seize control of the city. Nobita and his friends must rally their newly intelligent living toys to fight back, reclaim their peaceful spiral city, and prove themselves to the planet's mystical, ancient creator.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInGolGolGolmaal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInGolGolGolmaal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInGolGolGolmaal.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaInGolGolGolmaal.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-aur-birdopia-ka-sultan",
    title: [
      "Doraemon The Movie: Nobita Aur Birdopia Ka Sultan",
      "Doraemon: Nobita and the Winged Braves",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1l5kzELw05_pmnlzVoUcUIUPcIfx8POK7/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurBirdopiaKaSultan.jpg",
    rating: 4.5,
    year: 2001,
    releaseDate: "2001-03-10",
    duration: 91,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "After hearing about legends of winged humanoids, Nobita becomes obsessed with learning how to fly. Using Doraemon's futuristic gadgets, the gang creates custom mechanical wings, but during their sky adventures, they are pulled into a massive temporal rift. They crash-land in Birdopia—a magnificent, hidden sky-kingdom populated by advanced, intelligent avian humanoids who live in harmony with nature. There, they meet Gusuke, a brave bird boy who desperately wants to fly but struggles due to a childhood trauma. While helping Gusuke train for the annual flying tournament, the group uncovers a dark military conspiracy led by the rogue Commander Seagull. Seagull plans to awaken the ancient, world-destroying beast known as the Phoenix to conquer the human world below. Nobita and his friends must take to the skies and unite with the winged guardians of Birdopia to prevent a global catastrophe.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurBirdopiaKaSultan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurBirdopiaKaSultan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurBirdopiaKaSultan.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAurBirdopiaKaSultan.jpg",
    ],
    comments: [],
  },
  {
    id: "d-the-kingdom-of-robot-singham",
    title: [
      "Doraemon The Movie: The Kingdom of Robot Singham",
      "Doraemon: Nobita in the Robot Kingdom",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/19RjEZ1cteFGagdwwXGEoCE0Y0jMh7s7K/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TheKingdomOfRobotSingham.jpg",
    rating: 4.3,
    year: 2002,
    releaseDate: "2002-03-09",
    duration: 80,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Action", "Family"],
    description:
      "Through a mix-up with a futuristic department store gadget, Nobita accidentally orders a bizarre assortment of toys and robots from the 22nd century. Among them is a damaged, mysterious boy-robot named Poko who has malfunctioned and crossed into their timeline via a temporal warp. While trying to fix him, the gang gets pulled into Poko's home dimension—the Robot Kingdom. Upon arrival, they are horrified to discover that the kingdom's cruel ruler, Empress Jeanne, under the manipulative influence of her evil commander Dester, has enforced the ruthless 'Robot Alteration Law.' This decree aims to capture all robots and systematically erase their emotions, reducing them to mindless, unfeeling tools for humans. When Poko's mother is captured to be stripped of her mind, Nobita, Doraemon, and the gang must lead a daring robot rebellion to save her, restore compassion to Empress Jeanne, and heal the rift between organic lives and machine souls.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TheKingdomOfRobotSingham.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TheKingdomOfRobotSingham.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TheKingdomOfRobotSingham.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/TheKingdomOfRobotSingham.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-and-the-birth-of-japan-remake",
    title: "Doraemon The Movie: Nobita and the Birth of Japan (Remake)",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "",
      // https://drive.google.com/file/d/1cHAMWQAKNh4F2XxMKCSG1pPtnLI_5zrl/preview
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapanRemake.jpg",
    rating: 4.6,
    year: 2016,
    releaseDate: "2016-03-05",
    duration: 104,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Shinnosuke Yakuwa",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Fantasy", "Family"],
    description:
      "A visually stunning, modern retelling of the classic prehistoric adventure! Feeling overwhelmed by the strict expectations of their parents and school, Nobita, Doraemon, Shizuka, Gian, and Suneo decide to stage a massive runaway from home. Finding that all of modern Earth is already private property, they board the Time Machine and travel 70,000 years into the past to a pristine, uninhabited ancient Japan. After building their own custom utopian paradise, their getaway takes a serious turn when they rescue Kukuru, a young primitive boy from the Light Tribe who has been displaced by a temporal storm. Kukuru reveals that his entire clan has been enslaved by the terrifying, immortal rogue time-traveler Gigazombie and his mystical dark spirits. Armed with upgraded futuristic gadgets and joined by majestic genetically engineered mythical beasts, Nobita and his loyal friends launch a high-stakes rescue mission to save the Light Tribe and ensure the rightful dawn of human civilization.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapanRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapanRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapanRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheBirthOfJapanRemake.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobitas-little-space-war-remake",
    title: [
      "Doraemon: Nobita's Little Space War (Remake)",
      "Doraemon: Nobita's Little Star Wars (Remake)",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "https://drive.google.com/file/d/1Eos3nNqgM9lzYaxyax8r8fiO4_kntUoZ/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleSpaceWarRemake.jpg",
    rating: 4.4,
    year: 2022,
    releaseDate: "2022-03-04",
    duration: 108,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Susumu Yamaguchi",
    country: "Japan",
    genres: ["Action", "Adventure", "Sci-Fi", "Family"],
    description:
      "A thrilling, modern sci-fi spectacle remaking the classic 1985 adventure! During summer vacation, Nobita picks up a tiny rocket and discovers a palm-sized alien named Papi, who happens to be the president of the distant planet Pirika. Papi has fled to Earth to escape a ruthless rebel military coup. Doraemon, Nobita, and their friends use the 'Small Light' gadget to shrink themselves down and play with Papi, quickly building a strong bond. However, an ominous whale-shaped enemy space battleship arrives on Earth to capture Papi. Feeling guilty for putting his new friends in danger, Papi attempts to face the rebels alone. Nobita, Doraemon, and the gang must pick up their miniature starships and travel into deep space to stand by Papi, protect his sister Piina, and defend the planet Pirika from the dictator Gilmore's high-tech military force.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleStarWarsRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleStarWarsRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleStarWarsRemake.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasLittleStarWarsRemake.jpg",
    ],
    comments: [],
  },

  {
    id: "d-nobita-and-the-adventure-of-koya-koya-planet-classic",
    modern: false,
    title: [
      "Doraemon: Nobita and the Adventure of Koya Koya Planet (Classic)",
      "Doraemon: The Record of Nobita's Spaceblazer (Classic)",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "",
    thumbnail: "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheAdventureOfKoyaKoyaPlanetClassic.jpg",
    rating: 4.5,
    year: 1981,
    releaseDate: "1981-03-14",
    duration: 90,
    language: "Japanese / English Subbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Hideo Nishimaki",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Action", "Family"],
    description: "The second feature-length Doraemon film! Due to a freak space warp distortion under the tatami mat in Nobita's room, a door unexpectedly opens into the cargo hold of an interstellar spaceship. Nobita and Doraemon meet its pilot, a young alien boy named Roppuru, and his cute rabbit-like companion, Chami. They hail from Koya Koya Planet, a distant, resource-rich world with significantly weaker gravity than Earth. Upon visiting, Nobita and Doraemon discover that this gravitational shift grants them Superman-like strength and invulnerability. However, the peaceful planet is being terrorized by the Gargantua Mining Corporation, a ruthless corporate syndicate out to violently strip-mine the planet's rare minerals. Nobita and Doraemon must step up as cosmic superheroes to fight off the corporation's high-tech mercenaries and protect their new friends' home.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg"
    ],
    comments: []
  },
  {
    id: "d-nobita-the-explorer-bow-bow-classic",
    modern: false,
    title: [
      " Doraemon The Movie: Nobita The Explorer Bow! Bow! (Classic)",
      "Doraemon: New Nobita's Great Demon Peko and the Exploration Party of 5 (Classic)",
      "Doraemon: Nobita and the Haunts of Evil (Classic)",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "",
    thumbnail: "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaTheExplorerBowBowClassic.jpg",
    rating: 4.5,
    year: 1982,
    releaseDate: "1982-03-13",
    duration: 92,
    language: "Japanese / English Subbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Hideo Nishimaki",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Family", "Sci-Fi"],
    description: "Seeking an unforgettable summer adventure, Nobita and his friends use Doraemon's satellite gadgets to find an unexplored region on Earth. Meanwhile, Nobita adopts a stray white dog named Peko. Unbeknownst to the gang, Peko is actually Prince Kuntakku, the exiled crown prince of the Bow-Wow Kingdom—a secret, highly advanced nation of intelligent, bipedal canine humanoids hidden deep within the dense, misty jungles of Africa. The kingdom has been seized by a tyrannical warlord named Minister Daburanda, who plans to build ancient, world-conquering superweapons to attack the human world. Guided by Peko, Nobita and his crew brave wild beasts and treacherous traps to enter the hidden valley, fulfill an ancient legendary prophecy, and help the rightful prince reclaim his throne.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg"
    ],
    comments: []
  },
  {
    id: "d-jadoo-mantar-aur-jahnoom-classic",
    modern: false,
    title: [
      "Doraemon The Movie: Jadoo Mantar Aur Jahnoom (Classic)",
      "Doraemon: Nobita's New Great Adventure into the Underworld (Classic)",
      "Doraemon: Nobita's Magic World Adventure (Classic)",
    ],
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "",
    thumbnail: "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoomClassic.jpg",
    rating: 4.6,
    year: 1984,
    releaseDate: "1984-03-17",
    duration: 98,
    language: "Japanese / English Subbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Fantasy", "Action", "Family"],
    description: "Tired of schoolwork and wishing that magic was real, Nobita uses Doraemon's 'What-If Telephone Booth' to rearrange reality, transforming the world into a parallel universe where magic and sorcery replace modern science. While enchanted carpets fly through the skies, Nobita hilariously discovers he is still terrible at magic spells. However, this mystical reality harbors a fatal threat: a dark, demonic planet inhabited by the Underworld Army is rapidly closing in to consume Earth. Alongside a skilled young mage named Miyoko and her father, the gang uncovers a grim prophecy. To save both worlds, Nobita and his friends must journey deep into the terrifying, monster-infested Devildom Star to pierce the heart of the ruthless Demon King Demaon with silver magic arrows.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg"
    ],
    comments: []
  },
  {
     id: "d-nobita-and-the-steel-troops-classic",
    modern: false,
    title: "Doraemon: Nobita and the Steel Troops (Classic)",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl: "https://drive.google.com/file/d/1giulaEfaTvFgHWlk5Fv9UQ5MEu4ilNNu/preview",
    thumbnail: "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroopsClassic.jpg",
    rating: 4.7,
    year: 1986,
    releaseDate: "1986-03-15",
    duration: 97,
    language: "Japanese / English Subbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: false,
    director: "Tsutomu Shibayama",
    country: "Japan",
    genres: ["Adventure", "Sci-Fi", "Drama", "Action", "Family"],
    description: "The legendary original masterpiece! While playing, Nobita discovers strange, giant metallic blocks falling from the sky. Using Doraemon's Mirror World gadget, he and Doraemon assemble the pieces inside a vacant, reflection universe, creating a colossal robotic warrior named Zanda Claus. The adventure turns terrifying when a mysterious, cold girl named Riruru appears, revealing herself to be a scout spy for a massive, unyielding robot army from the planet Mecha-topia. The Steel Troops are marching toward Earth to completely enslave the human race. Left completely isolated to defend their planet, Nobita, Doraemon, and their small group of friends must mount a desperate, final stand in the mirror world while Shizuka attempts to touch Riruru's robotic heart to change the fate of the universe.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo: "",
        bio: "Doraemon is a robotic cat from the 22nd century sent to help Nobita. In this film, his futuristic gadgets and unwavering loyalty are put to the ultimate test as he helps Nobita navigate the mirror world and stand against a mechanical army far more powerful than anything they have faced before.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo: "",
        bio: "Nobita is the kind-hearted but clumsy hero who accidentally triggers the robot invasion. Driven by guilt and love for his friends, he undergoes remarkable growth in this movie — transforming from a boy who always gives up into someone willing to sacrifice everything to protect the world.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo: "",
        bio: "Shizuka is Nobita's gentle and compassionate friend whose courage proves crucial at pivotal moments. Her bond with Riruru becomes one of the movie's most touching storylines, showing that friendship can transcend even the greatest of conflicts.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo: "",
        bio: "Gian, usually the bully of the group, reveals a surprisingly brave and self-sacrificing side in this film. When the stakes rise to a planetary level, he steps up without hesitation — proving that true strength comes from protecting the people you care about.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo: "",
        bio: "Suneo's mechanical knowledge and clever thinking prove surprisingly useful during the robot crisis. Though he can be self-serving, his loyalty to his friends shines through when the group faces seemingly impossible odds in the mirror world.",
      },
      {
        name: "Zanda Claus",
        role: "Robot Ally",
        photo: "",
        bio: "Zanda Claus is a giant robotic warrior that Nobita secretly assembles inside the mirror world. Initially a source of fun and adventure, it becomes the group's last line of defence — a symbol of Nobita's determination to fight for peace.",
      },
      {
        name: "Pippo",
        role: "Antagonist / Ally",
        photo: "",
        bio: "Pippo is a small robotic soldier who begins as part of the invading army but gradually reveals a more complex nature. His interactions with Nobita force him to question the purpose of war, making him one of the film's most memorable and layered characters.",
      },
      {
        name: "Riruru",
        role: "Key Antagonist / Ally",
        photo: "",
        bio: "Riruru starts as the primary antagonist — a brilliant and ruthless robot general — but her arc is one of the most emotionally powerful in the entire Doraemon series. Her evolving relationship with Shizuka transforms her from enemy to the story's most heartbreaking hero.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops1986.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops1986.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops1986.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops1986.jpg"
    ],
    comments: []
  }
];

/** Ensure all movies have isPrime and isRecommended fields */
MOVIE_DETAILS.forEach((movie, index) => {
  if (movie.isPrime === undefined) movie.isPrime = false;
  if (movie.isRecommended === undefined) movie.isRecommended = false;
  // Set some movies as recommended/prime for demo purposes
  if (index % 5 === 0) movie.isRecommended = true;
  if (index % 7 === 0) movie.isPrime = true;
});

/** Full detail rows (detail page lookup) */
export function getMovieById(id) {
  return MOVIE_DETAILS.find((m) => m.id === id) ?? null;
}

export function addMovieToCatalog(movie) {
  const normalized = {
    ...movie,
    id: movie.id || `movie-${Date.now()}`,
    title: Array.isArray(movie.title)
      ? movie.title
      : [movie.title || "Untitled Movie"],
    cartoonId: movie.cartoonId || "doraemon",
    gradient:
      movie.gradient ||
      "linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #67e8f9 100%)",
    genres: Array.isArray(movie.genres) ? movie.genres : [],
    characters: Array.isArray(movie.characters) ? movie.characters : [],
    gallery: Array.isArray(movie.gallery) ? movie.gallery : [],
    comments: Array.isArray(movie.comments) ? movie.comments : [],
    modern: movie.modern ?? true,
  };

  const exists = MOVIE_DETAILS.some((item) => item.id === normalized.id);
  if (!exists) {
    MOVIE_DETAILS.push(normalized);
    ALL_MOVIES.push(normalized);
    CONTINUE_WATCHING.push(normalized);
    WATCH_HISTORY.push(normalized);
  }

  return normalized;
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
  "d-steel-troops": { likes: 248, commentsCount: 13 },
  "d-parallel-visit-to-the-west": { likes: 87, commentsCount: 6 },
  "d-tin-labyrinth": { likes: 156, commentsCount: 8 },
  "d-three-visionary-swordsmen": { likes: 203, commentsCount: 11 },
  "d-adventure-in-south-seas": { likes: 178, commentsCount: 7 },
  "d-legend-of-the-sun-king": { likes: 215, commentsCount: 9 },
  "d-stand-by-me": { likes: 512, commentsCount: 34 },
  "d-nobitas-treasure-island": { likes: 342, commentsCount: 21 },
  "d-little-space-war": { likes: 167, commentsCount: 10 },
  "d-stand-by-me-2": { likes: 423, commentsCount: 28 },
  "d-nobitas-new-dinosaur": { likes: 289, commentsCount: 15 },
  "d-nobitas-chronicle-of-the-moon-exploration": {
    likes: 198,
    commentsCount: 12,
  },
  "d-nobitas-space-heroes": { likes: 134, commentsCount: 7 },
  "d-nobitas-great-demon-peko": { likes: 176, commentsCount: 9 },
  "d-secret-gadget-museum": { likes: 231, commentsCount: 14 },
  "d-adventure-of-koya-koya-planet": { likes: 145, commentsCount: 8 },
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
  if (!movie) return "";
  return Array.isArray(movie.title) ? movie.title[0] : movie.title ?? "";
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
