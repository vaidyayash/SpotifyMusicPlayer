const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Enable CORS for all origins (you can restrict it to specific origins later)
app.use(cors());

// Serve albums with song names, album details, and cover images
app.get("/albums", (req, res) => {
  const albums = [
    {
      albumName: "Chill Vibes",
      artistName: "Ethereal Waves",
      coverImage: "/songs/album1.jpg",
      songs: [
        {
          songName: "Ocean Breeze",
          artistName: "Ethereal Waves",
          fileName: "song1.mp3",
        },
        {
          songName: "Serenity",
          artistName: "Mindful Tunes",
          fileName: "song2.mp3",
        },
        {
          songName: "Tranquility",
          artistName: "Ethereal Waves",
          fileName: "song3.mp3",
        },
        {
          songName: "Calm Waters",
          artistName: "Mindful Tunes",
          fileName: "song4.mp3",
        },
        {
          songName: "Sunset Glow",
          artistName: "Ethereal Waves",
          fileName: "song5.mp3",
        },
        {
          songName: "Peaceful Shores",
          artistName: "Mindful Tunes",
          fileName: "song6.mp3",
        },
        {
          songName: "Moonlit Sky",
          artistName: "Ethereal Waves",
          fileName: "song7.mp3",
        },
        {
          songName: "Gentle Waves",
          artistName: "Mindful Tunes",
          fileName: "song8.mp3",
        },
        {
          songName: "Evening Calm",
          artistName: "Ethereal Waves",
          fileName: "song9.mp3",
        },
      ],
    },
    {
      albumName: "Rock Legends",
      artistName: "The Rockers",
      coverImage: "/songs/album2.jpg",
      songs: [
        {
          songName: "Highway Rebel",
          artistName: "The Rockers",
          fileName: "song10.mp3",
        },
        {
          songName: "Echoes of Thunder",
          artistName: "Storm Chasers",
          fileName: "song11.mp3",
        },
        {
          songName: "Rolling Storm",
          artistName: "The Rockers",
          fileName: "song12.mp3",
        },
        {
          songName: "Steel Strings",
          artistName: "Storm Chasers",
          fileName: "song13.mp3",
        },
        {
          songName: "Electric Fury",
          artistName: "The Rockers",
          fileName: "song14.mp3",
        },
        {
          songName: "Thundering Skies",
          artistName: "Storm Chasers",
          fileName: "song15.mp3",
        },
        {
          songName: "Power Chords",
          artistName: "The Rockers",
          fileName: "song16.mp3",
        },
        {
          songName: "Lightning Strikes",
          artistName: "Storm Chasers",
          fileName: "song17.mp3",
        },
        {
          songName: "Heavy Metal",
          artistName: "The Rockers",
          fileName: "song18.mp3",
        },
      ],
    },
    {
      albumName: "Deep House Beats",
      artistName: "DJ Blaze",
      coverImage: "/songs/album3.jpg",
      songs: [
        {
          songName: "Midnight Groove",
          artistName: "DJ Blaze",
          fileName: "song19.mp3",
        },
        {
          songName: "Techno Vibes",
          artistName: "DJ Blaze",
          fileName: "song20.mp3",
        },
        { songName: "Pulse", artistName: "DJ Blaze", fileName: "song21.mp3" },
        {
          songName: "Nightlife",
          artistName: "DJ Blaze",
          fileName: "song22.mp3",
        },
        {
          songName: "Bassline Drop",
          artistName: "DJ Blaze",
          fileName: "song23.mp3",
        },
        {
          songName: "Synth Wave",
          artistName: "DJ Blaze",
          fileName: "song24.mp3",
        },
        {
          songName: "Electro Mood",
          artistName: "DJ Blaze",
          fileName: "song25.mp3",
        },
        {
          songName: "House Party",
          artistName: "DJ Blaze",
          fileName: "song26.mp3",
        },
        {
          songName: "Groove Machine",
          artistName: "DJ Blaze",
          fileName: "song27.mp3",
        },
      ],
    },
    {
      albumName: "Jazz Classics",
      artistName: "Miles Davis",
      coverImage: "/songs/album4.jpg",
      songs: [
        {
          songName: "So What",
          artistName: "Miles Davis",
          fileName: "song28.mp3",
        },
        {
          songName: "Freddie Freeloader",
          artistName: "Miles Davis",
          fileName: "song29.mp3",
        },
        {
          songName: "Blue in Green",
          artistName: "Miles Davis",
          fileName: "song30.mp3",
        },
        {
          songName: "All Blues",
          artistName: "Miles Davis",
          fileName: "song31.mp3",
        },
        {
          songName: "Flamenco Sketches",
          artistName: "Miles Davis",
          fileName: "song32.mp3",
        },
        {
          songName: "Jazz Nights",
          artistName: "Miles Davis",
          fileName: "song33.mp3",
        },
        {
          songName: "Smooth Vibes",
          artistName: "Miles Davis",
          fileName: "song34.mp3",
        },
        {
          songName: "Sax Serenade",
          artistName: "Miles Davis",
          fileName: "song35.mp3",
        },
      ],
    },
    {
      albumName: "Electronic Dreams",
      artistName: "Sasha",
      coverImage: "/songs/album5.jpg",
      songs: [
        {
          songName: "Dancing in the Dark",
          artistName: "Sasha",
          fileName: "song36.mp3",
        },
        { songName: "Dreamscape", artistName: "Sasha", fileName: "song37.mp3" },
        {
          songName: "Neon Lights",
          artistName: "Sasha",
          fileName: "song38.mp3",
        },
        {
          songName: "Cosmic Waves",
          artistName: "Sasha",
          fileName: "song39.mp3",
        },
        {
          songName: "Parallel Universe",
          artistName: "Sasha",
          fileName: "song40.mp3",
        },
        { songName: "Starlight", artistName: "Sasha", fileName: "song41.mp3" },
        {
          songName: "Infinity Beat",
          artistName: "Sasha",
          fileName: "song42.mp3",
        },
        {
          songName: "Space Odyssey",
          artistName: "Sasha",
          fileName: "song43.mp3",
        },
        {
          songName: "Echo Chamber",
          artistName: "Sasha",
          fileName: "song44.mp3",
        },
      ],
    },
    {
      albumName: "Hip-Hop Beats",
      artistName: "Kendrick Lamar",
      coverImage: "/songs/album6.jpg",
      songs: [
        {
          songName: "DNA.",
          artistName: "Kendrick Lamar",
          fileName: "song45.mp3",
        },
        {
          songName: "HUMBLE.",
          artistName: "Kendrick Lamar",
          fileName: "song46.mp3",
        },
        {
          songName: "ELEMENT.",
          artistName: "Kendrick Lamar",
          fileName: "song47.mp3",
        },
        {
          songName: "LOYALTY.",
          artistName: "Kendrick Lamar",
          fileName: "song48.mp3",
        },
        {
          songName: "PRIDE.",
          artistName: "Kendrick Lamar",
          fileName: "song49.mp3",
        },
        {
          songName: "LOVE.",
          artistName: "Kendrick Lamar",
          fileName: "song50.mp3",
        },
        {
          songName: "FEAR.",
          artistName: "Kendrick Lamar",
          fileName: "song51.mp3",
        },
        {
          songName: "GOD.",
          artistName: "Kendrick Lamar",
          fileName: "song52.mp3",
        },
        {
          songName: "DUCKWORTH.",
          artistName: "Kendrick Lamar",
          fileName: "song53.mp3",
        },
      ],
    },
    {
      albumName: "Indie Pop Hits",
      artistName: "Lorde",
      coverImage: "/songs/album7.jpg",
      songs: [
        { songName: "Royals", artistName: "Lorde", fileName: "song54.mp3" },
        {
          songName: "Tennis Court",
          artistName: "Lorde",
          fileName: "song55.mp3",
        },
        {
          songName: "Green Light",
          artistName: "Lorde",
          fileName: "song56.mp3",
        },
        {
          songName: "Perfect Places",
          artistName: "Lorde",
          fileName: "song57.mp3",
        },
        { songName: "Team", artistName: "Lorde", fileName: "song58.mp3" },
        {
          songName: "Buzzcut Season",
          artistName: "Lorde",
          fileName: "song59.mp3",
        },
        { songName: "The Louvre", artistName: "Lorde", fileName: "song60.mp3" },
        { songName: "Melodrama", artistName: "Lorde", fileName: "song61.mp3" },
      ],
    },
    {
      albumName: "Classical Piano",
      artistName: "Ludovico Einaudi",
      coverImage: "/songs/album8.jpg",
      songs: [
        {
          songName: "Nuvole Bianche",
          artistName: "Ludovico Einaudi",
          fileName: "song62.mp3",
        },
        {
          songName: "Una Mattina",
          artistName: "Ludovico Einaudi",
          fileName: "song63.mp3",
        },
        {
          songName: "Divenire",
          artistName: "Ludovico Einaudi",
          fileName: "song64.mp3",
        },
        {
          songName: "Le Onde",
          artistName: "Ludovico Einaudi",
          fileName: "song65.mp3",
        },
        {
          songName: "Elegy for the Arctic",
          artistName: "Ludovico Einaudi",
          fileName: "song66.mp3",
        },
        {
          songName: "Andare",
          artistName: "Ludovico Einaudi",
          fileName: "song67.mp3",
        },
        {
          songName: "Primavera",
          artistName: "Ludovico Einaudi",
          fileName: "song68.mp3",
        },
        {
          songName: "Experience",
          artistName: "Ludovico Einaudi",
          fileName: "song69.mp3",
        },
        {
          songName: "Walk",
          artistName: "Ludovico Einaudi",
          fileName: "song70.mp3",
        },
        {
          songName: "Cloudland",
          artistName: "Ludovico Einaudi",
          fileName: "song71.mp3",
        },
        {
          songName: "Island",
          artistName: "Ludovico Einaudi",
          fileName: "song72.mp3",
        },
      ],
    },
  ];
  res.json(albums);
});

// Serve the song files from the 'songs' folder
app.use(
  "/public/songs",
  express.static(path.join(__dirname, "public", "songs"))
);

// Serve the images from the 'images' folder
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public", "images"))
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:3000`);
});
