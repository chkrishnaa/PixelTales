import 'dotenv/config';
import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const UPDATED_MOVIE = {
    movieId: "d-stand-by-me-2",
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
