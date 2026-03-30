export type AudioSample = {
  id: string;
  name: string;
  category: "Nature" | "Music" | "Tech" | "Classroom";
  url: string;
};

export const audioSamples: AudioSample[] = [
  {
    id: "nat-001",
    name: "Horse Sound",
    category: "Nature",
    url: "https://www.w3schools.com/html/horse.mp3", // Link test từ W3Schools
  },

  // Music
  {
    id: "mus-001",
    name: "SoundHelix Chill Beat",
    category: "Music",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Link test nhạc dài
  },
  {
    id: "mus-002",
    name: "Espressif Test Audio",
    category: "Music",
    url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3", // Nhạc test tiêu chuẩn
  },

  // Tech
  {
    id: "tec-001",
    name: "Game Item Get Bleep",
    category: "Tech",
    url: "https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3", // Link âm thanh UI/Tech
  },

  // Classroom (Dùng tạm âm thanh test của MDN Mozilla)
  {
    id: "edu-001",
    name: "T-Rex Roar (MDN Test)",
    category: "Classroom",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
  }
];
