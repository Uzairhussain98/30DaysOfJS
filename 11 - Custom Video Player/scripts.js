//Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.full');


//build functions 
function togglePlay(){

    video[video.paused ? 'play' : 'pause']()
    // !video.paused ? toggle.innerHTML = "⏸️" : toggle.innerHTML = "►"
}

function updateBtn(){
    const icon = this.paused ? '►' :'❚ ❚'  ;
    toggle.textContent = icon;
}

function skipBtn(){
    console.log("skipping")
    const skiptime =  parseFloat(this.dataset.skip)
    video.currentTime += skiptime
}

function slidermove(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth * video.duration)
    video.currentTime = scrubTime
}

function handleScreen(){
    video.requestFullscreen();
}

//add event listners

video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skipBtn))
ranges.forEach(range => range.addEventListener('change', slidermove))


let mousedown = false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e) )
progress.addEventListener('mousedown',()=> mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
fullscreen.addEventListener('click', handleScreen);

