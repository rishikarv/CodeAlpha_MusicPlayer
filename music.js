const songs=[
    {  title:"Water",
        artist:"Kontra Mantis",
        cover:"images/water.jpg",
        src:"kontraa-water-afro-pop-music-445661.mp3" 
    },
    {  title:"Beautiful Dream",
        artist:"Diego Nava",
        cover:"images/dream.jpg",
        src:"mixkit-beautiful-dream-493.mp3" 
    },
    {  title:"Hazy Afterhours",
        artist:"Alejandro Magaña",
        cover:"images/hazy.jpg",
        src:"mixkit-hazy-after-hours-132.mp3" 
    },
     {  title:"Valley Sunset",
        artist:"Alejandro Magaña",
        cover:"images/valley.jpg",
        src:"mixkit-valley-sunset-127.mp3" 
   }
];
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playbtn = document.getElementById("play");
const nextbtn = document.getElementById("next");
const prevbtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("curtime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let curSong = 0;
let isPlaying = false;

function loadSong(index){
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
}

loadSong(curSong);

audio.addEventListener("loadedmetadata",()=>{

    progress.value = 0;

    duration.textContent =
    formatTime(audio.duration);

});

playbtn.addEventListener("click",()=>{

    if(isPlaying){
        audio.pause();
        playbtn.textContent="▶";
    }
    else{
        audio.play();
        playbtn.textContent="⏸";

    }
    isPlaying = !isPlaying;
});
nextbtn.addEventListener("click",()=>{
    curSong++;
    if(curSong >= songs.length){
       curSong=0;
    }
    loadSong(curSong);
    audio.play();

    isPlaying=true;
    playbtn.textContent="⏸";
});
prevbtn.addEventListener("click",()=>{
    curSong--;
    if(curSong<0){
        curSong = songs.length-1;
    }
    loadSong(curSong);
    audio.play();

    isPlaying = true;
    playbtn.textContent="⏸";
});

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime / audio.duration) * 100;

        currentTime.textContent =
        formatTime(audio.currentTime);

        duration.textContent =
        formatTime(audio.duration);

    }

});

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)
    * audio.duration;

});
volume.addEventListener("input" , ()=>{
    audio.volume = volume.value;
})
function formatTime(time){
    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    if(seconds <10){
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;

}

audio.addEventListener("ended" , ()=>{
    curSong++;
    if(curSong >= songs.length){
        curSong = 0;
    }

    loadSong(curSong);
    audio.play();

    isPlaying=true;
    playbtn.textContent = "⏸";
});

songs.forEach((song,index)=>{

    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;

    li.addEventListener("click" , ()=>{
        curSong=index;
        loadSong(curSong);

        audio.play();
        isPlaying=true;

        playbtn.textContent="⏸";
    });

    playlist.appendChild(li);

})