const songs = [
    { name: 'Poison', artist: 'sidhu-moose-wala', source: 'Poison.mp3' },
    { name: 'Sajan', artist: 'Guru-Randhawa', source: 'Sajan.mp3' },
    { name: 'Shikaar', artist: 'Parry-Sarpanch', source: 'Shikaar.mp3' },
    { name: 'Landu_Bande', artist: 'Singga Ft-Karan Aujla', source: 'Landu_Bande.mp3' },
    { name: 'Lehanga', artist: 'Jass-Manak', source: 'Lehanga.mp3' },
    { name: 'Ohi_Yaar', artist: 'Deep-Fateh', source: 'Ohi_Yaar.mp3' },
];

const audioPlayer = document.getElementById('audio-player');
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const progressBar = document.querySelector('.progress');
const playlist = document.getElementById('song-list');

let currentSongIndex = 0;
let isPlaying = false;

function addSongToPlaylist(song, index) {
    const li = document.createElement('li');
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        playSong();
    });
    playlist.appendChild(li);
}

function playSong() {
    const song = songs[currentSongIndex];
    audioPlayer.src = song.source;
    songTitle.textContent = song.name;
    songArtist.textContent = song.artist;
    audioPlayer.play();
    isPlaying = true;
    document.getElementById('play-pause-btn').textContent = '\u275A\u275A';
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById('play-pause-btn').textContent = '\u25BA';
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function updateProgressBar() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
}


function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particlesContainer.appendChild(particle);
    }
}


function init() {
    songs.forEach((song, index) => {
        addSongToPlaylist(song, index);
    });

    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    document.getElementById('next-btn').addEventListener('click', playNextSong);
    document.getElementById('prev-btn').addEventListener('click', playPreviousSong);

    createParticles();
    playSong();
}

init();
