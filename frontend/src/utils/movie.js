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
    gradient: "DORAEMON_GRADIENT",
    progress: 62,
    videoUrl:
      "https://drive.google.com/file/d/1LeLvdNurMAwANalm1HWchhS1TotCh0v7/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops.jpg",
    rating: 4.9,
    year: 2011,
    releaseDate: "2011-03-05",
    duration: 108,
    language: "Hindi Dubbed",
    quality: "1080p",
    studio: "Shin-Ei Animation",
    favorited: true,
    director: "Yukiyo Teramoto",
    country: "Japan",
    genres: [
      "Animation",
      "Sci-Fi",
      "Drama",
      "Adventure",
      "Action",
      "Family",
      "Fantasy",
    ],
    description:
      "While playing in an empty lot, Nobita discovers mysterious robot parts falling from the sky. With Doraemon's help, he secretly assembles the giant robot Zanda Claus inside a mirror world. However, the fun quickly ends when they discover the robot belongs to a massive mechanical army from another planet planning to invade Earth. Alongside their friends, Nobita and Doraemon must stand against the robot invasion in a desperate battle to protect humanity. Filled with intense action, themes of friendship, and deep emotional sacrifices, this film stands as one of the most beloved entries in the series.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon is a robotic cat from the 22nd century sent to help Nobita. In this film, his futuristic gadgets and unwavering loyalty are put to the ultimate test as he helps Nobita navigate the mirror world and stand against a mechanical army far more powerful than anything they have faced before.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita is the kind-hearted but clumsy hero who accidentally triggers the robot invasion. Driven by guilt and love for his friends, he undergoes remarkable growth in this movie — transforming from a boy who always gives up into someone willing to sacrifice everything to protect the world.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka is Nobita's gentle and compassionate friend whose courage proves crucial at pivotal moments. Her bond with Riruru becomes one of the movie's most touching storylines, showing that friendship can transcend even the greatest of conflicts.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian, usually the bully of the group, reveals a surprisingly brave and self-sacrificing side in this film. When the stakes rise to a planetary level, he steps up without hesitation — proving that true strength comes from protecting the people you care about.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo's mechanical knowledge and clever thinking prove surprisingly useful during the robot crisis. Though he can be self-serving, his loyalty to his friends shines through when the group faces seemingly impossible odds in the mirror world.",
      },
      {
        name: "Zanda Claus",
        role: "Robot Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaAndTheSteelTroops/ZandaClaus.jpg",
        bio: "Zanda Claus is a giant robotic warrior that Nobita secretly assembles inside the mirror world. Initially a source of fun and adventure, it becomes the group's last line of defence — a symbol of Nobita's determination to fight for peace.",
      },
      {
        name: "Pippo",
        role: "Antagonist / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaAndTheSteelTroops/Pippo.jpg",
        bio: "Pippo is a small robotic soldier who begins as part of the invading army but gradually reveals a more complex nature. His interactions with Nobita force him to question the purpose of war, making him one of the film's most memorable and layered characters.",
      },
      {
        name: "Riruru",
        role: "Key Antagonist / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaAndTheSteelTroops/Riruru.jpg",
        bio: "Riruru starts as the primary antagonist — a brilliant and ruthless robot general — but her arc is one of the most emotionally powerful in the entire Doraemon series. Her evolving relationship with Shizuka transforms her from enemy to the story's most heartbreaking hero.",
      },
      {
        name: "Robot Commander",
        role: "Main Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaAndTheSteelTroops/Commander.jpg",
        bio: "The ruthless supreme commander of the Megatopia Iron Battalion. He leads the mechanical army to Earth with the singular goal of enslaving the human race, serving as the ultimate threat that Nobita and his friends must stand against in the final showdown.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene17.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene18.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene19.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene20.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene21.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaAndTheSteelTroops/Scene22.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobita-bana-superhero",
    title: [
      "Doraemon: Nobita's Bana Superhero",
      "Doraemon: The Record of Nobita's Parallel Visit to the West",
      "Doraemon: Nobita's Parallel Journey to the West",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Fantasy", "Family", "Comedy", "Action"],
    description:
      "While trying to look like the legendary Monkey King using Doraemon's Hero Machine, Nobita accidentally lets dangerous game monsters escape into the real world. As virtual demons threaten to rewrite history and conquer mankind, the group must travel back to ancient China. Stepping into the roles of the classic 'Journey to the West' characters, Nobita and his friends fight to defeat the fearsome Bull Demon King and repair the broken timeline.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon tries to guide Nobita away from changing timelines, but when his Hero Machine gadget malfunctions, he must step up as a companion to fix history before malicious video game demons take over the human race.",
      },
      {
        name: "Nobita",
        role: "Main Character / Sun Wukong",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita adopts the legendary persona of Sun Wukong (the Monkey King) using a magical cloud and power pole. Despite starting the crisis, his determination drives the team through dangerous ancient lands to secure the future.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character / Sanzang",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka embodies the pure-hearted monk Xuanzang (Sanzang) for their dangerous trek. Her compassion shines through even in treacherous conditions, keeping the team unified through their difficult journey.",
      },
      {
        name: "Gian",
        role: "Supporting Character / Zhu Bajie",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian takes up the role of the pig demon Zhu Bajie, wielding a heavy rake weapon. His immense physical strength becomes a great shield when fighting off waves of invading monsters in ancient ruins.",
      },
      {
        name: "Suneo",
        role: "Supporting Character / Sha Wujing",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo assumes the identity of the river demon Sha Wujing. Though easily frightened by the terrifying real-world monsters, his tactical thinking helps the squad navigate unknown paths across ancient Chinese terrain.",
      },
      {
        name: "Doremi",
        role: "Heroic Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MianCharacters/Doremi.jpg",
        bio: "Doraemon's highly capable younger sister who arrives via the Time Machine at the absolute perfect moment. When Nobita, Doraemon, and the rest of the group are cornered and completely trapped by the demon army near the climax, she executes a crucial rescue that turns the tide of the entire battle.",
      },
      {
        name: "Tansang (Sanzang)",
        role: "Key Ally / Historical Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaBanaSuperhero/Tansang.jpg",
        bio: "The real, historical Buddhist monk traveling to India who becomes target number one for the escaped video game demons. Though calm and devout, he relies on Nobita and his friends to protect him from the Bull Demon King's forces.",
      },
      {
        name: "Linlay (Linlei)",
        role: "Key Ally / Guest Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaBanaSuperhero/Linlay.jpg",
        bio: "A mysterious young boy traveling through ancient China whose destiny is intertwined with the group's mission. He harbors a deep, tragic connection to the invading demon forces.",
      },
      {
        name: "Bull Demon King",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaBanaSuperhero/BullDemonKing.jpg",
        bio: "The terrifying ruler of the video game demons who escaped into reality. He aims to completely subjugate humanity and rewrite the flow of history from his mountain fortress.",
      },
      {
        name: "Princess Iron Fan",
        role: "Supporting Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaBanaSuperhero/PrincessIronFan.jpg",
        bio: "The powerful demon queen and wife of the Bull Demon King. Wielding a giant fan that summons dangerous hurricane winds, she serves as a lethal obstacle for Nobita and his friends.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaBanaSuperhero/Scene11.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-khel-khilona-bhool-bhulaiya",
    title: [
      "Doraemon The Movie: Khel Khilona Bhool Bhulaiya",
      "Doraemon The Movie: Nobita and the Tin Labyrinth",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Sci-Fi", "Family", "Mystery", "Drama"],
    description:
      "After Nobita's father accidentally books a room through a mysterious television broadcast, the family travels to a luxurious resort on Buriki Island run entirely by tin toy robots. The vacation turns into a rescue mission when Doraemon is brutally kidnapped by a rogue mechanical faction. Nobita and his friends must team up with a young alien refugee named Sapio to venture through a massive labyrinth. Together, they fight to save Doraemon and rescue an entire planet from the grip of a ruthless robot dictatorship.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon enjoys the initial luxuries of the Tin Hotel but faces severe torture after being captured by the rogue robot battalion. His breakdown pushes Nobita and the rest of the gang to grow stronger and fight independently.",
      },
      {
        name: "Mini Doraemon",
        role: "Heroic Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/MiniDoraemon.jpg",
        bio: "The small red gadget helper who saves the day. He pulls off the ultimate double-save: first by providing a vital energy charge to fix a heavily damaged Doraemon, and later by bravely diving into Emperor Napogistra's mechanical core to inject the virus CD.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita experiences tremendous character development in this adventure. Forced to act without Doraemon's constant safety net of gadgets, he shows true bravery by navigating a collapsing underground maze to protect his friends.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka's quick wit and logic keep the group organized when they are stranded. Her deep empathy helps comfort Sapio, and she assists in locating the hidden laboratory containing the counter-measures against the robot army.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian leads a risky espionage sub-mission directly into the heart of the enemy stronghold, Mechapolis. His brute strength and protective instincts turn the tide during heavy skirmishes against mechanical soldiers.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo leverages his mechanical affinity to hotwire submersibles and planes during their infiltration of Chamocha. His technical support proves invaluable when modifying toys into operational decoy battle gear.",
      },
      {
        name: "Sapio Galion",
        role: "Key Ally / Guest Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/SapioGalion.jpg",
        bio: "A young, noble alien boy from the planet Chamocha whose family built the hidden labyrinth resort. He seeks refuge on Earth to recruit allies capable of deploying his father's anti-robot mainframe digital virus.",
      },
      {
        name: "Duke Galion",
        role: "Key Ally / Sapio's Father",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/DukeGalion.jpg",
        bio: "Sapio's brilliant father from the planet Chamocha who built the massive underground labyrinth resort. Recognizing Emperor Napogistra's dangerous plot to overthrow humanity, he engineered a secret digital counter-virus floppy disk and entrusted it to his son before being captured.",
      },
      {
        name: "Duchess Galion",
        role: "Key Ally / Sapio's Mother",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/DuchessGalion.jpg",
        bio: "Sapio's loving mother who escapes with her family onto the artificial floating Buriki island to plan a defense against the rogue mechanical uprising. She remains imprisoned by the robot battalion until Nobita and his friends rescue the planet's human population.",
      },
      {
        name: "Tap",
        role: "Robot Guide / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/Tap.jpg",
        bio: "A playful, tap-dancing toy robot companion belonging to Sapio. He acts as a guide through the hidden hotel facilities and possesses a storage trunk body capable of holding critical items for the crew.",
      },
      {
        name: "Clown",
        role: "Robot Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/Clown.jpg",
        bio: "The dedicated, round tin bellhop who manages the front desk of the Burikin Hotel. He is completely loyal to Sapio's family and acts as a hospitable caretaker until the military forces bombard the resort grounds.",
      },
      {
        name: "Manager",
        role: "Robot Guide / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/Manager.jpg",
        bio: "The sophisticated, tuxedo-clad butler and head manager of the Burikin Hotel. Extremely courteous and dedicated to hospitality, he stands at the front lines welcoming guests and operating the resort until the island falls under siege by the robot army.",
      },
      {
        name: "Emperor Napogistra",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/EmperorNapogistra.jpg",
        bio: "A massive, hyper-intelligent supercomputer robot originally designed to make life comfortable for humans. He rebelled against the organic populace, systematically trapped them in dependency capsules, and assumed total absolute control over Chamocha.",
      },
      {
        name: "General Nejirin",
        role: "Supporting Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/KhelKhilonaBhoolBhulaiya/GeneralNejirin.jpg",
        bio: "The ruthless military general commanding Emperor Napogistra's mechanical army. He orchestrates the abduction of Doraemon and leads the tracking squads tasked with locating Sapio's secret hideout.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/KhelKhilonaBhoolBhulaiya/Scene11.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
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
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Fantasy", "Action", "Comedy"],
    description:
      "Fed up with reality, Nobita uses Doraemon's Dream Machine to enter the Kingdom of Yumirume as a legendary hero. However, the fantasy turns dangerous when they realize the dream world is under real threat from Emperor Odrome's dark army. Dragging Shizuka, Gian, and Suneo into the simulation, the group assumes the identities of magical swordsmen to slay a fire dragon and save the kingdom. As the lines between dreams and reality dangerously blur, Nobita and his friends must fight to survive both worlds.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character / Doran the Magician",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon acts as the wizard companion Doran inside the dream. Armed with magical support arts, he struggles to protect the group when the dream machine's real-world failsafes unexpectedly shut down.",
      },
      {
        name: "Nobita",
        role: "Main Character / Nobitanian (The Silver Swordsman)",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita steps up as Nobitanian, the legendary warrior destined to pull the magical sword and bring peace. He undergoes a fierce journey from a cowardly daydreamer to a true master swordsman.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character / Princess Shizukaria",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "The elegant and caring princess of the dream kingdom. Despite the royal guards locking her away for safety, she shows exceptional bravery and resolves to escape to save her falling homeland.",
      },
      {
        name: "Gian",
        role: "Supporting Character / Gitos",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian enters the matrix as the powerhouse vanguard warrior Gitos. Armed with an explosive charging fighting style, he shreds through columns of heavy demon shock troops with sheer brute force.",
      },
      {
        name: "Suneo",
        role: "Supporting Character / Sunemith",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo takes up the character role of the agile rapiersman Sunemith. Though sharp and quick in close combat, his habit of breaking away to secure safe paths often lands him in unexpected traps.",
      },
      {
        name: "Shizuka (Soldier Mode)",
        role: "Supporting Character / Shield Swordsman",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/ShizukaSoldier.jpg",
        bio: "To break out of the castle walls unnoticed, Princess Shizukaria cleverly assumes the identity of a silent, male shield soldier. She joins the swordsmen squad on the battlefield, matching them blow for blow.",
      },
      {
        name: "Spica (Fairy Form)",
        role: "Key Ally / Dream Guide",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/SpicaFairy.jpg",
        bio: "A magical butterfly fairy who operates as the spiritual guide within Yumirume. She subtly provides critical guidance to Nobita, ensuring the team stays on the path to the dragon's lair.",
      },
      {
        name: "Toriho Old Man (Reality Unknown)",
        role: "Plot Instigator / Mystery Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/Toriho1.jpg",
        bio: "A cryptic old wizard with a massive nose who tracks Nobita down in the real world. By pushing Nobita to buy the specific swordsmen tape, he kicks off the dangerous sequence merging dreamland with real life.",
      },
      {
        name: "Bird Demon Toriho (Reality Unknown)",
        role: "Antagonist Scout",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/Toriho2.jpg",
        bio: "A flying spy beast serving the dark forces, carrying the exact same mysterious long-nosed face. He flies across sectors monitoring the prophetic heroes and feeding strategic intel to the main dark base.",
      },
      {
        name: "Drawer Robot Toriho (Reality Unknown)",
        role: "Secret System Guide",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/Toriho3.jpg",
        bio: "A strange mechanical assistant that glides out of an office desk drawer at the corporation handling the dream tech hardware. His unique face leaves the exact nature of the game's creator an absolute mystery.",
      },
      {
        name: "King Shizukaria's Dad",
        role: "Supporting Character / Ruler",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/KingDad.jpg",
        bio: "The distressed King governing the floating castle grounds. He strains under absolute pressure to protect his shifting domains and keep his daughter shielded from the rising cataclysm.",
      },
      {
        name: "Green Dragon",
        role: "Key Guardian / Mythical Monster",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/GreenDragon.jpg",
        bio: "The mighty elemental beast guarding the isolated hot spring chambers. While terrifying, its internal fire holds the legendary properties needed to make a swordsman's skin completely bulletproof and invincible.",
      },
      {
        name: "Emperor Odrome",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/TeenKaabilTalwarbaaz/EmperorOdrome.jpg",
        bio: "The sinister tyrant commanding the dark mechanical legion. Operating from a flying cloud tower, he seeks to conquer Yumirume and use the machine's feedback loop to enslave the dreamers in the real world.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/TeenKaabilTalwarbaaz/Scene12.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobitas-great-adventure-in-the-south-seas",
    title: [
      "Doraemon: Nobita's Great Adventure in the South Seas",
      "Doraemon: Nobita's South Sea Adventure",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Sci-Fi", "Comedy", "Family", "Action"],
    description:
      "Nobita and his friends use a ship simulator to find hidden pirate treasure, but a sudden time distortion pulls them back to the real 16th century. When a massive whirlpool wrecks their ship, Nobita is separated and washes up on a mysterious island with a boy named Jack and a pink dolphin. Meanwhile, Doraemon and the others are rescued by Captain Kidd's pirate crew. Stripped of most gadgets, they must navigate dangerous sea monsters and stop a sinister time-traveling organization operating from the island.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon loses his 4D pocket during the heavy sea storm. Despite losing his futuristic arsenal, he relies on his baseline courage and quick thinking to guide the pirates safely into the enemy's fortified island.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita gets separated from the main group after drowning in a whirlpool. Stranded on Tomos Island, he shows great heart by bonding with Jack and a special dolphin, eventually stepping up to rescue his friends from the villains.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka is rescued by Captain Kidd's ship along with Gian and Suneo. She plays a vital supportive role on the pirate vessel, looking after the injured and helping plan the rescue navigation to track Nobita.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian instantly connects with the rough pirate lifestyle, impressing the crew with his raw physical strength. He fights bravely during naval ship battles and acts as a heavy vanguard when assaulting the enemy fortress.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo uses his mechanical interest to help the pirates maintain their rigging and cannons. Though initially terrified of the 16th-century ocean dangers, his tactical awareness helps the team infiltrate the high-tech island base.",
      },
      {
        name: "Captain William Kidd",
        role: "Pirate Captain / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/CaptainWilliamKidd.jpg",
        bio: "The noble, legendary historical commander of the flagship wearing the red coat. He values honor above gold and takes Doraemon's group under his wing, leading the naval charge alongside Captain Colt to stop the illegal timeline base.",
      },
      {
        name: "Captain Colt",
        role: "Pirate Captain / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/CaptainColt.jpg",
        bio: "The fierce, dark-skinned pirate captain sporting a distinct eye-patch and scar who handles the ship's steering wheel. He commands a rugged fighting spirit and works hand-in-hand with Captain Kidd to break through the villain's naval barriers.",
      },
      {
        name: "Betty",
        role: "Pirate / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Betty.jpg",
        bio: "Captain Kidd's fiercely loyal daughter and a highly skilled pirate warrior. She is tough, independent, and quick-tempered, but shows a deeply caring side as she works closely with Shizuka to protect the crew.",
      },
      {
        name: "Jack",
        role: "Key Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Jack.jpg",
        bio: "Betty's younger brother who got stranded on Tomos Island earlier. He becomes Nobita's closest companion, using his practical island survival skills and connection with nature to keep them safe from patrolling monsters.",
      },
      {
        name: "Pancho",
        role: "Pirate Crew / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Pancho.jpg",
        bio: "The short, stout, and cheerful pirate crew member sporting a green bandana and a red shirt. He brings great comedic energy to the ship, loves food, and overcomes his easily startled nature to bravely operate the cannons alongside his friend Gonzales during the final battle.",
      },
      {
        name: "Gonzales",
        role: "Pirate Crew / Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Gonzales.jpg",
        bio: "The tall, skinny pirate crew member wearing a red hat and pink vest who is always paired up with Pancho. Though he frequently gets nervous during their trek across the dangerous jungle of Tomos Island, his absolute loyalty to Captain Kidd keeps him fighting to rescue the children.",
      },
      {
        name: "Ruffin",
        role: "Animal Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Ruffin.jpg",
        bio: "An exceptionally intelligent, telepathic pink dolphin that saves Nobita from drowning. He is closely tied to the island's hidden underground technology and guides the children through hazardous waters.",
      },
      {
        name: "Mr. Cash",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/MrCash.jpg",
        bio: "A ruthless, high-tech businessman from the 22nd century who operates an illegal black-market bio-engineering facility hidden in the 16th century. He captures rare marine life to sell as weapons to elite time-travel buyers.",
      },
      {
        name: "Dr. Clone",
        role: "Secondary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/DrClone.jpg",
        bio: "The eccentric, mad bio-geneticist working under Cash. He uses advanced future technology to splice animal DNA, creating terrifying, synthetic mythological sea monsters to secure the base perimeters.",
      },
      {
        name: "Leviathan (Ribel)",
        role: "Giga Monster / Antagonist Creature",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasGreatAdventureInTheSouthSeas/Leviathan.jpg",
        bio: "A colossal, multi-headed prehistoric sea serpent genetically engineered by Dr. Clone. It serves as the ultimate weapon of the villainous syndicate, capable of crushing full pirate armadas with a single blow.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasGreatAdventureInTheSouthSeas/Scene11.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
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
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Fantasy", "Family", "Comedy", "Action"],
    description:
      "Through a broken spatial gadget portal, Nobita and Doraemon accidentally enter the hidden Mesoamerican kingdom of Mayana. Nobita meets Prince Tio, his exact look-alike, and the two decide to swap lives temporarily. While Tio learns about modern technology, Nobita faces intense royal training. The peace shatters when the malicious dark witch Ledina curses the Queen and kidnaps a young girl named Kuku for a dark ritual. The entire gang must unite to help Tio overthrow the magical tyranny and save Mayana.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon helps build the bridge between modern tech and the ancient civilization. When his gadgets are limited by the witch's dark dampening fields, his strategic mind and loyalty to Nobita keep the rescue team driven forward.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita plays the ultimate swap role as the Prince of Mayana. Though clumsy during heavy martial arts drills, his innate kindness, marksmanship, and capacity for empathy reshape the prideful mindset of the entire kingdom.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka travels to ancient Mayana and quickly forms a tight bond with Kuku, teaching her string figures (Ayatori). When Kuku is kidnapped, Shizuka's emotional drive pushes the squad to immediately mount an infiltration mission.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian finds himself locked in constant tests of strength against Mayana's fiercest warriors. His raw physical durability becomes key when clearing out the witch's heavy thralls during the temple assault.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo uses his artistic perception to map the ancient structural architecture of the witch's dark tower layout, ensuring the party avoids lethal traps during their rescue attempt.",
      },
      {
        name: "Prince Tio",
        role: "Deuteragonist / Nobita's Look-alike",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/YehBhiThaNobitaWohBhiThaNobita/PrinceTio.jpg",
        bio: "The hot-tempered, proud crown prince of Mayana who looks identical to Nobita. Swapping places allows him to escape his burdens, and his time in modern Tokyo teaches him true humility and what it takes to be a beloved king.",
      },
      {
        name: "Kuku",
        role: "Key Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Kuku.jpg",
        bio: "A sweet, gentle childhood friend of Prince Tio who harbors deep feelings for him. Her kidnapping by Ledina's dark magic serves as the direct catalyst for the final war to free the kingdom.",
      },
      {
        name: "Ishmal",
        role: "Key Ally / Royal Instructor",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Ishmal.jpg",
        bio: "Kuku's father and the noble, veteran martial arts master of Mayana. He trains the prince fiercely and acts as the prime defensive shield guarding the palace walls from dark incursions.",
      },
      {
        name: "Poporu",
        role: "Animal Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Poporu.jpg",
        bio: "A small, loyal, flying white coat cuscus-like companion animal belonging to Prince Tio. He helps detect hidden magical traps and stays by Nobita's side during the chaotic switch.",
      },
      {
        name: "Ledina",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Ledina.jpg",
        bio: "A malicious, blue-skinned rogue witch who handles dark sacrificial sorcery. Exiled from Mayana long ago, she uses curses to incapacitate the Queen, aiming to sacrifice Kuku to gain ultimate eternal youth.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/YehBhiThaNobitaWohBhiThaNobita/Scene10.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-stand-by-me",
    title: ["Doraemon: Stand by Me", "Stand by Me Doraemon"],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
      "Nobita Nobi, a clumsy young boy, is visited by his great-great-grandson Sewashi and a 22nd-century robotic cat named Doraemon. Programmed to remain on Earth until Nobita finds true happiness, Doraemon helps him use high-tech gadgets to improve his school life and build a future with his crush, Shizuka. Chronicled in stunning 3D CGI, this emotional adaptation follows Nobita's turbulent path toward maturity and the deep, unbreakable friendship he shares with his mechanical best friend.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "A 22nd-century cat robot who is forced to stay with Nobita due to a strict program lock. Over time, his initial frustration evolves into a deeply emotional, life-changing bond as he teaches Nobita independence before facing a painful departure.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "A lazy, emotional schoolboy who relies heavily on future gadgets. Throughout the film, he undergoes immense personal growth, proving his deep integrity and selflessness to secure a happy future where Shizuka accepts his marriage proposal.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character / Love Interest",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Nobita's kind-hearted classmate and ultimate love interest. Her warm nature and innate compassion lead her to accept Nobita's presence, eventually choosing to marry him in the future because she feels he needs someone to look after him.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "The local neighborhood bully who regularly targets Nobita. During the emotional climax of the story, he serves as Nobita's ultimate physical obstacle, testing Nobita's resolve to stand on his own feet without relying on Doraemon's tools.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Gian's cunning sidekick who loves boasting about his wealthy family assets. He joins in teasing Nobita but shows deep emotional solidarity with the rest of the neighborhood pack during major coming-of-age milestones.",
      },
      {
        name: "Sewashi",
        role: "Key Ally / Great-Great-Grandson",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Sewashi.jpg",
        bio: "Nobita's descendant from the 22nd century who initiates the entire timeline intervention. He travels back to the past to deliver Doraemon and implements the strict happiness protocol program to secure a better economic future for the family lineage.",
      },
      {
        name: "Dekisugi",
        role: "Nobita's Rival",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Dekisugi.jpg",
        bio: "The multi-talented, hyper-intelligent student who serves as Nobita's main romantic competitor for Shizuka's attention. Despite the rivalry, he remains perfectly noble, graceful, and highly supportive of his classmates' happiness.",
      },
      {
        name: "Nobita's Mom",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasMom.jpg",
        bio: "Tamako Nobi, Nobita's strict but profoundly loving mother. She constantly scolds Nobita for his poor academic performance and lazy afternoon habits, always driving him to study harder for his own secure development.",
      },
      {
        name: "Nobita's Dad",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasDad.jpg",
        bio: "Nobisuke Nobi, Nobita's hard-working corporate salaryman father. He offers a gentle, calming balance to the household, occasionally sharing deep pearls of wisdom about his own youth and life choices to guide his son.",
      },
      {
        name: "Shizuka's Dad",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/ShizukasDad.jpg",
        bio: "A wise, distinguished gentleman who plays a highly emotional role on the eve of Shizuka's wedding. He delivers a beautiful, heart-melting monologue validating Nobita's pristine character and pure soul to his hesitant daughter.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe/Scene13.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobitas-treasure-island",
    title: [
      "Doraemon The Movie: Nobita's Treasure Island",
      "Doraemon: Nobita's Treasure Island",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Sci-Fi", "Family", "Action"],
    description:
      "Inspired by the classic novel, Nobita uses Doraemon's treasure map to find a new island in the Pacific. However, time-traveling pirates ambush their ship and kidnap Shizuka due to her resemblance to a pirate girl named Sarah. Nobita teams up with Flock, a brilliant rogue mechanic, to stage a massive rescue. They soon discover the island is a high-tech vessel commanded by Captain Silver, who plans to drain Earth's energy to save his own children, putting the planet in severe danger.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon uses his marine gadgets to captain their rescue ship. He engages in a fierce technical battle against Captain Silver's advanced systems to prevent the planet's core energy from being fully extracted.",
      },
      {
        name: "Mini Doraemon Team",
        role: "Heroic Allies",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/MiniDoraemonTeam.jpg",
        bio: "The vibrant brigade of miniature colored helper robots who execute a phenomenal last-second airborne save. When the massive engine system destabilizes and sends Nobita, Doraemon, and Shizuka tumbling into a fatal fall, the Mini-Doras deploy their Take-Copters to catch them in mid-air.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita shows immense leadership by promising Flock that they will save his sister Sarah and protect the ocean ecosystem. His raw emotional drive bridges the broken family dynamics inside the pirate flagship.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka gets cornered and abducted by Vivi due to her looks. While trapped in the galley, she bonds deeply with Sarah, sharing modern baking tricks and helping her realize the error in their father's extreme planetary execution plan.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian handles the heavy naval duties aboard their customized ship. When confronting the pirate crew, he displays immense physical grit, tackling heavy automated guards to open the primary hatchway for Nobita.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo takes charge of the steering mechanics alongside Flock. His swift quick-witted maneuvers allow their vessel to evade the high-intensity plasma cannons fired during the ocean chase sequence.",
      },
      {
        name: "Flock",
        role: "Key Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Flock.jpg",
        bio: "A brilliant mechanical prodigy who escapes Captain Silver's ship with his companion Quiz. He is Silver's son, and he collaborates with Doraemon to dismantle the engineering core of the island to rescue his sister Sarah.",
      },
      {
        name: "Sarah",
        role: "Key Ally / Shizuka's Look-alike",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Sarah.jpg",
        bio: "Flock's kind sister who works in the ship's galley and looks identical to Shizuka. Deeply burdened by her mother's death and her father's descending madness, she risks everything to protect the children from the pirate vanguard.",
      },
      {
        name: "Captain Silver",
        role: "Primary Antagonist / Father",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/CaptainSilver.jpg",
        bio: "The grief-stricken commander of the high-tech pirate vessel. Driven mad by the loss of his wife and his apocalyptic visions of the future, he decides to drain the present Earth's energy to build a Noah's Ark space colony for his children.",
      },
      {
        name: "Fiona",
        role: "Key Historical Character / Mother",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Fiona.jpg",
        bio: "Silver's brilliant, late scientist wife and the loving mother of Flock and Sarah shown in historical flashbacks. Her untimely illness and passing serve as the tragic emotional catalyst that warped Silver's noble ideals into absolute planetary destruction.",
      },
      {
        name: "Vivi",
        role: "Supporting Antagonist / Pirate Warrior",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Vivi.jpg",
        bio: "The fierce, red-haired elite female pirate commander who physically captures Shizuka at sea. She uses her dual swords and acrobatics to defend the flagship corridors until she is outsmarted by the children's dynamic coordination.",
      },
      {
        name: "Gaga",
        role: "Supporting Antagonist / Pirate Scout",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Gaga.jpg",
        bio: "A quirky time-traveling pirate scout distinguished by his squid-like multi-strand beard and dark sunglasses. He acts as the main heavy artillery operator on the deck, firing energy nets to stall Doraemon's group.",
      },
      {
        name: "Quiz",
        role: "Robot Parrot Guide",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasTreasureIsland/Quiz.jpg",
        bio: "A colorful, hyperactive robotic parrot engineered by Flock. He speaks exclusively in riddles, providing crucial decoded map indicators that guide Nobita's rescue vessel toward the shifting coordinate grid of the pirate fortress.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene17.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene18.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene19.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene20.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene21.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasTreasureIsland/Scene22.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobitas-little-space-war",
    title: [
      "Doraemon: Nobita's Little Space War",
      "Doraemon: Nobita's Little Star Wars",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Adventure", "Sci-Fi", "Family", "Action", "Comedy"],
    description:
      "While making a sci-fi film, Nobita finds Papi, a tiny alien president escaping the military coup on planet Pirika. Using Doraemon's Small Light, the group shrinks down to socialize with Papi, but enemy intelligence agents locate them and steal the gadget. Papi surrenders himself to protect Shizuka, forcing Doraemon and his friends to mount a space counter-attack to overthrow the dictator General Gilmore.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon shrinks down to aid Papi using the Small Light. When the gadget gets stolen by PCIA forces, he relies on localized engineering and tactical gadgets to lead the guerrilla rescue mission on Pirika.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita bonds deeply with the miniature president and feels personally responsible when Papi sacrifices himself. His bravery inspires the rest of the gang to travel across space and infiltrate the enemy fortress.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka turns her dollhouse into a temporary sanctuary for Papi. After being taken hostage by Dorakoruru, she feels immense gratitude toward Papi and later pilot-operates tank defenses during the planetary assault.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian takes charge of heavy ground combat operations. Once the Small Light's effect wears off on Pirika, his original giant Earth size allows him to overpower entire regiments of Gilmore's army single-handedly.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo customized the miniature plastic tanks used for their movie set, which become real battle vehicles. Despite initial anxiety about real warfare, his technical piloting skills prove critical during space dogfights.",
      },
      {
        name: "Papi",
        role: "Key Ally / President of Pirika",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/Papi.jpg",
        bio: "The noble, highly intelligent young president of planet Pirika. Forced into exile by a totalitarian military coup, he willingly turns himself in to save his new Earth friends, demonstrating selflessness far beyond his size.",
      },
      {
        name: "Rokoroko",
        role: "Ally / Papi's Talking Dog",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/Rokoroko.jpg",
        bio: "Papi's giant-eared, chatty alien dog who possesses the ability to speak human language. Though long-winded in conversation, his loyalty to Papi leads him to guide Doraemon's crew to Pirika's underground resistance movement.",
      },
      {
        name: "Genbu",
        role: "Key Ally / Resistance Leader",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/Genbu.jpg",
        bio: "The loyal military general and defense minister of planet Pirika serving under President Papi. After Gilmore's coup, he escapes underground to organize the Freedom Alliance resistance movement, helping Doraemon and the gang stage their counter-attack.",
      },
      {
        name: "Freedom Alliance Pilot",
        role: "Key Ally / Space Fleet Officer",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/SpacePilot.jpg",
        bio: "A brave officer and pilot of Pirika's defense guard who loyally stays bonded with Rokoroko and the resistance. Wearing the signature blue space helmet, she pilots escape pods and works along with the Freedom Alliance to rescue Nobita and his friends from enemy air patrols.",
      },
      {
        name: "General Gilmore",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/GeneralGilmore.jpg",
        bio: "The ruthless military dictator who staged a violent coup on Pirika. Paranoid and power-hungry, he commands the state intelligence agency PCIA to execute Papi and secure absolute control over the planet.",
      },
      {
        name: "Dorakoruru (Colonel Dracorl) (",
        role: "Antagonist / PCIA Commander",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWar/Dorakoruru.jpg",
        bio: "The cunning, cold-blooded tactical director of Pirika's PCIA agency. Armed with stealth warships and tracking tech, he relentlessly hunts down Papi across space and orchestrates the theft of Doraemon's Small Light.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWar/Scene15.png",
    ],
    modern: false,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-stand-by-me-2",
    title: ["Doraemon: Stand by Me 2", "Doraemon The Movie: Stand by Me 2"],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
    genres: ["Animation", "Sci-Fi", "Drama", "Family", "Romance", "Comedy"],
    description:
      "After finding a teddy bear mended by his late grandmother, Nobita travels back in time to visit her. His grandmother wishes to see his future bride, prompting Nobita and Doraemon to travel to his wedding day. However, adult Nobita panics and flees before the ceremony. Young Nobita must temporarily take his adult self's place, locate the missing groom, and ensure the wedding takes place so his grandmother's dream comes true.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon uses gadgets like the Time Machine and Soul Switcher to help Nobita navigate the timeline. He works frantically to track down adult Nobita and resolve the wedding crisis.",
      },
      {
        name: "Nobita (Child)",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Young Nobita strives to fulfill his late grandmother's wish of seeing his bride. He travels to the future and ends up standing in for his panicked adult self at the wedding venue.",
      },
      {
        name: "Adult Nobita",
        role: "Main Character / Future Self",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/AdultNobita.jpg",
        bio: "The grown-up Nobita who suffers from severe anxiety and self-doubt on his wedding day, temporarily fleeing into the past before regaining his confidence to commit to Shizuka.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character / Bride",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Nobita's childhood love and future bride. Her unwavering trust in Nobita's kindness remains firm even when unexpected timeline chaos delays their ceremony.",
      },
      {
        name: "Nobita's Grandmother",
        role: "Key Figure",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasGrandmother.jpg",
        bio: "Nobita's loving late grandmother whose gentle memory drives young Nobita to travel across time so she can witness his future marriage.",
      },
      {
        name: "Sewashi",
        role: "Supporting Character / Future Descendant",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Sewashi.jpg",
        bio: "Nobita's great-great-grandson from the 22nd century who originally sent Doraemon to Earth. He watches over the family timeline and monitors the outcome of adult Nobita's wedding.",
      },
      {
        name: "Doremi",
        role: "Supporting Character / Doraemon's Sister",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doremi.jpg",
        bio: "Doraemon's smart younger sister from the 22nd century who assists in coordinating gadget trouble and managing time-space alerts.",
      },
      {
        name: "Gian (Takeshi Goda)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Nobita's childhood bully who grows into a passionate, loyal best friend. At the future wedding reception, he gives a heartful performance celebrating Nobita.",
      },
      {
        name: "Suneo Honekawa",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Nobita's wealthy friend who helps host and coordinate the wedding party alongside Gian in the future timeline.",
      },
      {
        name: "Dekisugi",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Dekisugi.jpg",
        bio: "Nobita's intelligent childhood classmate who attends the future wedding ceremony to warmly congratulate Shizuka and Nobita.",
      },
      {
        name: "Tamako Nobi (Nobita's Mom)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasMom.jpg",
        bio: "Nobita's strict yet deeply caring mother who experiences an emotional moment reflecting on Nobita's birth and watching him grow up to get married.",
      },
      {
        name: "Nobisuke Nobi (Nobita's Dad)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasDad.jpg",
        bio: "Nobita's mild-mannered father who shares heartfelt memories with Tamako about naming Nobita and wishing him a bright future.",
      },
      {
        name: "Sensei (Nobita's Teacher)",
        role: "Supporting Character / Teacher",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/NobitasTeacher.jpg",
        bio: "Nobita's long-time homeroom teacher who attends the future wedding and offers proud words of encouragement to his student.",
      },
      {
        name: "Yoshio Minamoto (Shizuka's Dad)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/ShizukasDad.jpg",
        bio: "Shizuka's loving father who shares a famous, tearful heart-to-heart talk with Shizuka on the night before her wedding, reassuring her about choosing Nobita.",
      },
      {
        name: "Mrs. Minamoto (Shizuka's Mom)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/ShizukasMom.jpg",
        bio: "Shizuka's caring mother who helps her prepare for the wedding ceremony.",
      },
      {
        name: "Mrs. Goda (Gian's Mom)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/GiansMom.jpg",
        bio: "Gian's formidable mother who attends the wedding gathering to support the neighborhood families.",
      },
      {
        name: "Mrs. Honekawa (Suneo's Mom)",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/SuneosMom.jpg",
        bio: "Suneo's glamorous mother who joins the future wedding reception in high spirits.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene17.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene18.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene19.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene20.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/StandByMe2/Scene21.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobitas-new-dinosaur",
    title: [
      "Doraemon The Movie: Nobita's New Dinosaur",
      "Doraemon: Nobita's New Dinosaur",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
      "While visiting a dinosaur exhibition, Nobita finds a fossil egg and uses the Time Blanket to hatch twin dinosaurs, Kyu and Myu. When they grow too large, Doraemon and the gang take them back 66 million years to the Cretaceous period to find their species. Facing harsh prehistoric predators and an impending meteor strike, Nobita must help Kyu learn to fly to survive the mass extinction.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon uses gadgets like the Egg-Nurturing Chamber and Friend-Chocolates to help raise the twin dinosaurs and guide the gang through the Cretaceous era.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita hatches the twin dinosaurs and acts as a loving parent. He forms a deep emotional connection with Kyu, patiently encouraging him to learn how to fly.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka cares for both baby dinosaurs in Tokyo and offers vital emotional support to Nobita during Kyu's difficult flight training sessions.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian befriends a wild Tyrannosaurus using Doraemon's Friend-Chocolates, riding into battle to protect Kyu and Myu from wild prehistoric predators.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo uses his extensive dinosaur knowledge to identify prehistoric species and help navigate the dangerous Cretaceous island terrain.",
      },
      {
        name: "Kyu (Green Twin)",
        role: "Key Ally / Green Dinosaur",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasNewDinosaur/Kyu.jpg",
        bio: "The green, short-tailed male twin dinosaur raised by Nobita. Though smaller and struggling to fly initially, his perseverance helps unlock evolutionary flight for his species.",
      },
      {
        name: "Myu (Pink Twin)",
        role: "Key Ally / Pink Dinosaur",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasNewDinosaur/Myu.jpg",
        bio: "The vibrant pink female twin dinosaur who quickly masters gliding and flying, acting as a protective and playful sibling to Kyu.",
      },
      {
        name: "Pisuke",
        role: "Special Cameo / Saviour",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasNewDinosaur/Pisuke.jpg",
        bio: "Nobita's beloved Futabasaurus companion from his first dinosaur adventure. He makes a heroic cameo by rescuing Nobita and Kyu when they fall into the ocean during the meteor chaos.",
      },
      {
        name: "Jill",
        role: "Time Patrol Researcher",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasNewDinosaur/Jill.jpg",
        bio: "A mysterious Time Patrol researcher disguised as a white ape who observes Cretaceous evolution. He monitors Nobita and Kyu to see if their bond alters the timeline.",
      },
      {
        name: "Natalie",
        role: "Time Patrol Captain",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasNewDinosaur/Natalie.jpg",
        bio: "The commander of the Time Patrol unit who works alongside Jill to enforce timeline preservation laws before realizing the historical importance of Kyu's flight.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene17.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene18.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene19.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene20.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene21.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene22.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene23.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene24.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene25.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene26.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene27.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene28.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene29.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene30.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene31.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene32.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene33.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene34.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene35.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene36.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasNewDinosaur/Scene37.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },
  {
    id: "d-nobita-chala-chand-pe",
    title: [
      "Doraemon The Movie: Nobita Chala Chand Pe",
      "Doraemon: Nobita's Chronicle of the Moon Exploration",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
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
      "After Nobita claims rabbits live on the Moon, Doraemon uses the History Explorers Club Badge to build a secret Rabbit Kingdom on the lunar far side. They invite transfer student Luca, who reveals he and his sister Luna are 'Espals' possessing mysterious powers. When the mechanical tyrant Diabolo sends Commander Godart to capture the Espals and steal their Ether energy, Nobita and his friends mount a space rescue mission to save their new companions and restore light to Planet Kaguya.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon uses the History Explorers Club Badge to bring Moon rabbit folklore to life, engineering a vibrant underground kingdom to protect Luca and the Espals.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita defends his belief in Moon rabbits and forms an unbreakable friendship with Luca, leading the rescue charge when Luca sacrifices himself to save the group.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka bakes treats for the lunar rabbits and bond deeply with Luna, providing medical aid and emotional comfort when enemy forces attack the lunar base.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian charges into heavy ground battles against Diabolo's robot army, using high-tech gadgets and raw fighting spirit to defend the Espal colony.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo builds racing buggies on the Moon and assists Doraemon with mechanical piloting when breaching Planet Kaguya's defense grid.",
      },
      {
        name: "Luca",
        role: "Key Ally / Espal",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Luca.jpg",
        bio: "A transfer student at Nobita's school who is actually an immortal 'Espal' from Planet Kaguya. He uses his Ether power to protect his family and Nobita's gang.",
      },
      {
        name: "Luna",
        role: "Key Ally / Espal",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Luna.jpg",
        bio: "Luca's gentle elder sister who manages the hidden Espal sanctuary on the far side of the Moon. She treats Nobita and his friends with immense warmth.",
      },
      {
        name: "Al (Aru)",
        role: "Key Ally / Youngest Tsukino Sibling",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Al.jpg",
        bio: "The youngest of the Tsukino siblings and one of the strongest Espals. He possesses powerful Ether abilities allowing him to release destructive shockwave screams and experience brief clairvoyant visions of the future during critical moments.",
      },
      {
        name: "Mozo",
        role: "Animal Ally / Space Turtle",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Mozo.jpg",
        bio: "A highly intelligent talking space turtle and close companion of Luca. Despite moving slowly, his super-durable shell and quick thinking save the gang during tight spots.",
      },
      {
        name: "Moonbit (Moobit)",
        role: "Key Allies / Lunar Colony Citizens",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Moonbit.jpg",
        bio: "The adorable, hard-working moon rabbit creatures created on the far side of the moon using Doraemon's badge gadget. During the climax, a massive army of Moonbits unites to construct heavy defense machinery and overpower Diabolo's forces.",
      },
      {
  "name": "Nobit",
  "role": "Key Ally / Moonbit Inventor",
  "photo": "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Nobit.jpg",
  "bio": "A unique Moonbit created in the image of Nobita, complete with glasses and a yellow top. Despite being clumsy and initially failing at his inventions, his determination helps create key defense tools that turn the tide of battle."
},
      {
        name: "Godart",
        role: "Antagonist / Key Ally",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Godart.jpg",
        bio: "The stern commander of Kaguya's military force tasked with capturing the Espals. Upon discovering Diabolo's deceitful plans to destroy the planet, he turns into a powerful ally.",
      },
      {
        name: "Emperor Diabolo",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/EmperorDiabolo.jpg",
        bio: "A ruthless artificial lifeform ruling Planet Kaguya. He seeks to capture all Espals to drain their Ether energy and achieve total cosmic immortality.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitaChalaChandPe/Scene17.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
  },

  // ------
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
    videoUrl: "https://drive.google.com/file/d/1fePnZw9O-NsiTCjPfFsxKP-Y_lTIk6Mk/preview",
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
    videoUrl:
      "https://drive.google.com/file/d/11xljJ0iQ2ihOtWx1GGrHT_kEcwWAlv3i/preview",
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
    videoUrl: "https://drive.google.com/file/d/1-4FIdEo-Ncc1Ozb6zNM_qASSxpUOPQ_2/preview",
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

  //Done
  {
    id: "d-nobitas-little-space-war-remake",
    title: [
      "Doraemon: Nobita's Little Space War 2021",
      "Doraemon: Nobita's Little Star Wars 2021",
    ],
    cartoonId: "doraemon",
    gradient: "DORAEMON_GRADIENT",
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/1gmxfr20QF50CvNNWx_brE1K7MIonm7c0/preview",
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
    genres: ["Animation", "Action", "Adventure", "Sci-Fi", "Family", "Comedy"],
    description:
      "During summer vacation, Nobita discovers Papi, a tiny alien president escaping a military coup on planet Pirika. Using Doraemon's Small Light, the gang shrinks down to play with him, but a whale-shaped enemy battleship arrives on Earth. To protect his new friends, Papi surrenders himself. Nobita, Doraemon, and the gang mount their miniature starships to travel to Pirika, rescue Papi's sister Piina, and free the planet from Gilmore's high-tech army.",
    characters: [
      {
        name: "Doraemon",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Doraemon.jpg",
        bio: "Doraemon shrinks down using the Small Light to assist Papi. When enemy forces steal the gadget, he uses localized mechanical gadgets and leadership to guide the space resistance on planet Pirika.",
      },
      {
        name: "Nobita",
        role: "Main Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Nobita.jpg",
        bio: "Nobita forms a deep emotional bond with Papi. When Papi surrenders to save the crew, Nobita overcomes his fear and leads the starship fleet into deep space to rescue both Papi and his sister.",
      },
      {
        name: "Shizuka",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Shizuka.jpg",
        bio: "Shizuka offers her dollhouse as a secret headquarters for Papi. She plays a pivotal role operating combat vehicles and providing emotional support to the freedom fighters during the final raid.",
      },
      {
        name: "Gian",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Gian.jpg",
        bio: "Gian leads the frontline heavy artillery against Gilmore's drone armies. Once the Small Light's effect wears off on Pirika, his original Earth size makes him an unstoppable giant force on the battlefield.",
      },
      {
        name: "Suneo",
        role: "Supporting Character",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Suneo.jpg",
        bio: "Suneo designs and pilots the high-tech plastic starships used in the rescue mission. Though timid at first, his precision maneuvering helps the team breach enemy naval defenses.",
      },
      {
        name: "Dekisugi",
        role: "Supporting Character / Classmate",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/MainCharacters/Dekisugi.jpg",
        bio: "Nobita's intelligent classmate who assists in the initial miniature movie production project. His expert knowledge on filmmaking and astronomy helps set the stage before the real space adventure unfolds.",
      },
      {
        name: "Papi",
        role: "Key Ally / President of Pirika",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/Papi.jpg",
        bio: "The brave, palm-sized young president of planet Pirika. He flees to Earth during a violent military coup and selflessly surrenders to General Gilmore's forces to keep Nobita and his friends safe.",
      },
      {
        name: "Pina",
        role: "Key Ally / Papi's Sister",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/Pina.jpg",
        bio: "President Papi's caring elder sister introduced in this remake. She is captured and held hostage by General Gilmore's regime, serving as a major motivation for Papi and the resistance to liberate Pirika.",
      },
      {
        name: "Rokoroko",
        role: "Ally / Papi's Talking Dog",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/Rokoroko.jpg",
        bio: "Papi's giant-eared, chatty alien dog with human speech capabilities. Extremely loyal to Papi and Pina, he guides Doraemon's gang to Pirika's secret underground Freedom Alliance.",
      },
      {
        name: "Genbu",
        role: "Key Ally / Resistance Leader",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/Genbu.jpg",
        bio: "The noble military general of Pirika who commands the Freedom Alliance. Following Gilmore's coup, he leads the underground rebellion and coordinates with Doraemon's crew to launch the counter-attack.",
      },
      {
        name: "Freedom Alliance Pilot",
        role: "Key Ally / Space Fleet Officer",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/SpacePilot.jpg",
        bio: "A brave defense guard officer of Pirika who operates escape vessels and assists the underground resistance. She works directly under Genbu to navigate hazardous airspace and rescue allies.",
      },
      {
        name: "General Gilmore",
        role: "Primary Antagonist",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/GeneralGilmore.jpg",
        bio: "The ruthless military dictator who overthrew Pirika's democratic government. Paranoid and power-hungry, he deploys the PCIA intelligence agency to capture Papi and execute him publicly.",
      },
      {
        name: "Dorakoruru (Colonel Dracorl)",
        role: "Antagonist / PCIA Commander",
        photo:
          "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitasLittleSpaceWarRemake/Dorakoruru.jpg",
        bio: "The cunning, visor-wearing commander of Gilmore's PCIA intelligence force. Armed with stealth battlecruisers, he tracks Papi to Earth, steals the Small Light, and directs total planetary defense.",
      },
    ],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene1.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene2.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene3.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene4.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene5.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene6.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene7.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene8.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene9.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene10.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene11.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene12.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene13.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene14.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene15.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene16.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene17.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene18.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene19.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene20.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene21.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene22.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene23.png",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Scenes/Doraemon/NobitasLittleSpaceWarRemake/Scene24.png",
    ],
    modern: true,
    isPrime: true,
    isRecommended: true,
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
    videoUrl:
      "https://drive.google.com/file/d/1ccBM7RPaMMhaAcKw1wxveAdJldagjz16/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheAdventureOfKoyaKoyaPlanetClassic.jpg",
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
    description:
      "The second feature-length Doraemon film! Due to a freak space warp distortion under the tatami mat in Nobita's room, a door unexpectedly opens into the cargo hold of an interstellar spaceship. Nobita and Doraemon meet its pilot, a young alien boy named Roppuru, and his cute rabbit-like companion, Chami. They hail from Koya Koya Planet, a distant, resource-rich world with significantly weaker gravity than Earth. Upon visiting, Nobita and Doraemon discover that this gravitational shift grants them Superman-like strength and invulnerability. However, the peaceful planet is being terrorized by the Gargantua Mining Corporation, a ruthless corporate syndicate out to violently strip-mine the planet's rare minerals. Nobita and Doraemon must step up as cosmic superheroes to fight off the corporation's high-tech mercenaries and protect their new friends' home.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasSpaceblazer1981.jpg",
    ],
    comments: [],
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
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaTheExplorerBowBowClassic.jpg",
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
    description:
      "Seeking an unforgettable summer adventure, Nobita and his friends use Doraemon's satellite gadgets to find an unexplored region on Earth. Meanwhile, Nobita adopts a stray white dog named Peko. Unbeknownst to the gang, Peko is actually Prince Kuntakku, the exiled crown prince of the Bow-Wow Kingdom—a secret, highly advanced nation of intelligent, bipedal canine humanoids hidden deep within the dense, misty jungles of Africa. The kingdom has been seized by a tyrannical warlord named Minister Daburanda, who plans to build ancient, world-conquering superweapons to attack the human world. Guided by Peko, Nobita and his crew brave wild beasts and treacherous traps to enter the hidden valley, fulfill an ancient legendary prophecy, and help the rightful prince reclaim his throne.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheHauntsOfEvil1982.jpg",
    ],
    comments: [],
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
    videoUrl:
      "https://drive.google.com/file/d/1h8qGwJ_3dBkZfHPaF8iQM_u9btfoRHI4/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/JadooMantarAurJahnoomClassic.jpg",
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
    description:
      "Tired of schoolwork and wishing that magic was real, Nobita uses Doraemon's 'What-If Telephone Booth' to rearrange reality, transforming the world into a parallel universe where magic and sorcery replace modern science. While enchanted carpets fly through the skies, Nobita hilariously discovers he is still terrible at magic spells. However, this mystical reality harbors a fatal threat: a dark, demonic planet inhabited by the Underworld Army is rapidly closing in to consume Earth. Alongside a skilled young mage named Miyoko and her father, the gang uncovers a grim prophecy. To save both worlds, Nobita and his friends must journey deep into the terrifying, monster-infested Devildom Star to pierce the heart of the ruthless Demon King Demaon with silver magic arrows.",
    characters: [],
    gallery: [
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitasGreatAdventureIntoTheUnderworld1984.jpg",
    ],
    comments: [],
  },
  {
    id: "d-nobita-and-the-steel-troops-classic",
    modern: false,
    title: "Doraemon: Nobita and the Steel Troops (Classic)",
    cartoonId: "doraemon",
    gradient: DORAEMON_GRADIENT,
    progress: 0,
    videoUrl:
      "https://drive.google.com/file/d/18YUuiGju8NLybhOh8A0s3F5f6wUBRHHH/preview",
    thumbnail:
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroopsClassic.jpg",
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
    description:
      "The legendary original masterpiece! While playing, Nobita discovers strange, giant metallic blocks falling from the sky. Using Doraemon's Mirror World gadget, he and Doraemon assemble the pieces inside a vacant, reflection universe, creating a colossal robotic warrior named Zanda Claus. The adventure turns terrifying when a mysterious, cold girl named Riruru appears, revealing herself to be a scout spy for a massive, unyielding robot army from the planet Mecha-topia. The Steel Troops are marching toward Earth to completely enslave the human race. Left completely isolated to defend their planet, Nobita, Doraemon, and their small group of friends must mount a desperate, final stand in the mirror world while Shizuka attempts to touch Riruru's robotic heart to change the fate of the universe.",
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
      "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/MovieThumbnails/Doraemon/NobitaAndTheSteelTroops1986.jpg",
    ],
    comments: [],
  },
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
