import 'dotenv/config';
import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const UPDATED_MOVIE = {
    movieId: "d-nobita-chala-chand-pe",
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
  "name": "Moonbit (Moobit)",
  "role": "Key Allies / Lunar Colony Citizens",
  "photo": "https://raw.githubusercontent.com/chkrishnaa/PixelTalesMovieImages/main/Characters/Doraemon/NobitaChalaChandPe/Moonbit.jpg",
  "bio": "The adorable, hard-working moon rabbit creatures created on the far side of the moon using Doraemon's badge gadget. During the climax, a massive army of Moonbits unites to construct heavy defense machinery and overpower Diabolo's forces."
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
