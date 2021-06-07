const { fromEvent } = rxjs;

const startStopBtn = document.getElementById('startStop');
const waitBtn = document.getElementById('wait');
const resetBtn = document.getElementById('reset');
const display = document.getElementById('display');

let second = '00';
let minute = '00';
let hour = '00';

const start = () => {
    window.timerId = window.setInterval(() => {
        second = +second + 1;

        if (second < 10) {
            second = '0' + second;
        } else if (second > 60) {
            second = '00';
            minute = +minute + 1;
        }   

        if (minute < 10) {
            minute = '0' + +minute;
        } else if (minute > 60) {
            minute = '00';
            hour = +hour + 1;
        }
        
        if (hour < 10) {
            hour = '0' + +hour;
        }

        display.textContent = `${hour}:${minute}:${second}`;
    }, 1000);
    startStopBtn.dataset.track = '1';
};

const stop = () => {
    startStopBtn.dataset.track = '0';
    window.clearInterval(window.timerId);
    second = '00';
    minute = '00';
    hour = '00'; 
    display.textContent = `${hour}:${minute}:${second}`;
};

const startStop = () => {
    if (startStopBtn.dataset.track === '0') {
        start()
    } else {
        stop();
    }
};

let firstClickTime = 0;
const wait = () => {
    const date = new Date();
    const secondClickTime = date.getTime();
    if((secondClickTime - firstClickTime) < 300) {
        startStopBtn.dataset.track = '0';
        window.clearInterval(window.timerId);
    }
    firstClickTime = secondClickTime;
};

const reset = () => {
    stop();
    start();
};

fromEvent(startStopBtn, 'click').subscribe(() => startStop());
fromEvent(waitBtn, 'click').subscribe(() => wait());
fromEvent(resetBtn, 'click').subscribe(() => reset());