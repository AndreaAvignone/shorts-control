// Start with an initial value of 20 seconds
const TIME_LIMIT = 0;
async function getTime() {
    let { time = Object.keys(['time']) } = await chrome.storage.local.get('time');
    let { limit = Object.keys(['limit']).toString() } = await chrome.storage.local.get('limit');
    const injElement=document.createElement('div');
    injElement.className='base-timer';
    injElement.innerHTML= `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        ${formatTime(time)}
      </span>
    </div>
    <p>Time spent on Shorts today</p>
    <p>(limit: ${limit})</p> 
    `
    document.body.prepend(injElement);
}
getTime();
/*
const init =function(){
    const injElement=document.createElement('div');
    injElement.className='base-timer';
    injElement.innerHTML= `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        ${formatTime(time)}
      </span>
    </div>
    `
    document.body.prepend(injElement);
}
init();

*/
function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);
    
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

