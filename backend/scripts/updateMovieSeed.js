import 'dotenv/config';
import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const UPDATED_MOVIE = {
  movieId: "d-nobitas-new-dinosaur",
  title: [
    "Doraemon The Movie: Nobita's New Dinosaur",
    "Doraemon: Nobita's New Dinosaur",
  ],
  cartoonId: "doraemon",
  gradient: "DORAEMON_GRADIENT",
  progress: 0,
  videoUrl:
    "https://www.facebook.com/plugins/video.php?height=313&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1097842376263648%2F&show_text=false&width=560&t=0",
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
};

async function runUpdate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    const result = await Movie.findOneAndUpdate(
      { movieId: UPDATED_MOVIE.movieId },
      { $set: UPDATED_MOVIE },
      { new: true, upsert: true, runValidators: true }
    );

    if (result) {
      console.log(`✨ Successfully upserted: "${result.title[0]}" (movieId: ${result.movieId})`);
    } else {
      console.log('❌ No result returned from upsert');
    }
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Connection closed');
    process.exit(0);
  }
}

runUpdate();
