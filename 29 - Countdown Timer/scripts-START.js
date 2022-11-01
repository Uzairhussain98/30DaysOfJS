let countDown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const buzzer = document.querySelector('.buzzer')

let display;


function timer(seconds){
    clearInterval(countDown)
    const now = Date.now()
    const then = now + seconds * 1000
    dispalyTimeLeft(seconds)
    displayEndTime(then)
    countDown = setInterval(()=> {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        // console.log(secondsLeft)
        if(secondsLeft < 0){
            clearInterval(countDown)
            // console.log(buzzer)
            buzzer.play()
            return;
        }
        dispalyTimeLeft(secondsLeft)

    },1000)
    

}


function dispalyTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remaiderSeconds = seconds % 60
    display = `${minutes}:${remaiderSeconds < 10 ? '0' : '' }${remaiderSeconds}`
    timerDisplay.textContent = display
    document.title =display
    console.log({display})
}

function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hours = end.getHours();
    const minutes = end.getMinutes()
    endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`
}
function startTimer(){
    const seconds = parseInt(this.dataset.time)
    console.log(seconds)
    timer(seconds)
}


buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit',function(e){

    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset()
    
}

)