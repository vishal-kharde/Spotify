console.log("Welcome to Spotify")


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
//let masterPlay = document.getElementById('masterPlay')
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName')
let currentPausedTime = 0;
let prevPlayedSong = 'NA';

let songs = [
    { songName: "Wario", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Salam A ishq", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula dena", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari kasam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Chip Thrills", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

songItems.forEach((element, i) => {
    //  console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});




//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }

})

//List to evetns
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100

})

const makeAllPlays = (e) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play-circle');
    })
}




Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log('clicked event');

        if (e.target.classList.contains('fa-circle-pause')) {
            console.log('clicked event inside if' + audioElement.currentTime);
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-circle-pause');
            currentPausedTime = audioElement.currentTime;
            prevPlayedSong = audioElement.src;
            //audioElement.currentTime = audioElement.currentTime ;
        }

        else {
            console.log('clicked event inside else');

            songIndex = parseInt(e.target.id);
            console.log(audioElement.paused + ' time is' + audioElement.currentTime);

            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;
            if (audioElement.paused && prevPlayedSong == audioElement.src) {
                console.log('pasused if ' + currentPausedTime);
                audioElement.currentTime = currentPausedTime;
            } else {
                console.log('pasused else so setting current time as 0');

                audioElement.currentTime = 0;
            }
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-circle-pause')
        }
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 10) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause')


})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause')


})