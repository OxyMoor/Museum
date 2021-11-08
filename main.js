// ПЛЕЕР
const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');

const player = document.querySelector('.video-poster'); 
const video = document.querySelector('.viewer');
const posterPlay = document.querySelector('.video-poster-play');
const toggle = document.querySelector('.play-button');

const volumeBtn = document.querySelector('.volume-button');

const fullBtn = document.querySelector('.full-button');

let mousedown = false;

// стилизация прогресс-баров 
function stylizeRange() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

// заполнение прогресс-бара
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;

    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
    progress.value = percent; 
}

// изменение громкости
function handleRangeUpdate() {
    const valueVol = volume.value;

    video.volume = valueVol;

    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${valueVol*100}%, #C4C4C4 ${valueVol*100}%, #C4C4C4 100%)`;
    
    if (valueVol === '0') {
        volumeBtn.innerHTML = `<svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.2053 15L35.6703 11.535C35.8901 11.3152 36 11.0474 36 10.7337C36 10.4199 35.8901 10.1522 35.6703 9.93234L34.0677 8.32972C33.8478 8.10991 33.5801 8 33.2663 8C32.9526 8 32.6848 8.10991 32.465 8.32972L29 11.7947L25.535 8.32972C25.3152 8.10991 25.0474 8 24.7337 8C24.4199 8 24.1522 8.10991 23.9323 8.32972L22.3297 9.93234C22.1099 10.1522 22 10.4199 22 10.7337C22 11.0474 22.1099 11.3152 22.3297 11.535L25.7947 15L22.3297 18.465C22.1099 18.6848 22 18.9526 22 19.2663C22 19.5801 22.1099 19.8478 22.3297 20.0677L23.9323 21.6703C24.1522 21.8901 24.4199 22 24.7337 22C25.0474 22 25.3152 21.8901 25.535 21.6703L29 18.2053L32.465 21.6703C32.6848 21.8901 32.9516 22 33.2663 22C33.5811 22 33.8478 21.8901 34.0677 21.6703L35.6703 20.0677C35.8901 19.8478 36 19.5801 36 19.2663C36 18.9526 35.8901 18.6848 35.6703 18.465L32.2053 15Z" fill="#B3B3B3"/>
                                    <path d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z" fill="#B3B3B3"/>
                                </svg>`;
    } else {
        volumeBtn.innerHTML = `<svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.86 0L3.63 10.42V19.07L17.86 29.49C17.83 7.26 17.86 18.17 17.86 0Z" fill="#B3B3B3"/>
                                    <path d="M0 21.9198H7.47V7.55981H0V21.9198Z" fill="#B3B3B3"/>
                                    <path d="M27 29.1399C26.6559 29.1407 26.3193 29.0395 26.0328 28.849C25.7462 28.6586 25.5225 28.3874 25.39 28.0699C25.2993 27.8572 25.2514 27.6286 25.249 27.3974C25.2467 27.1661 25.2899 26.9367 25.3763 26.7221C25.4627 26.5076 25.5905 26.3122 25.7524 26.1471C25.9143 25.982 26.1072 25.8504 26.32 25.7599C27.7344 25.1603 29.0184 24.2907 30.1 23.1999C32.3328 20.9541 33.5873 17.9167 33.59 14.7499C33.5793 11.5788 32.3138 8.5408 30.07 6.29988C28.9863 5.20894 27.7031 4.33644 26.29 3.72988C25.8627 3.547 25.5251 3.20251 25.3509 2.7716C25.1766 2.3407 25.1799 1.85837 25.36 1.42988C25.4463 1.21604 25.5746 1.02173 25.7375 0.858495C25.9003 0.695259 26.0943 0.566432 26.308 0.479673C26.5216 0.392914 26.7505 0.349995 26.9811 0.353466C27.2116 0.356938 27.4391 0.406729 27.65 0.49988C31.3419 2.07523 34.2782 5.02222 35.84 8.71988C36.6452 10.6177 37.0601 12.6583 37.06 14.7199C37.059 16.7804 36.6477 18.82 35.85 20.7199C35.077 22.5565 33.9526 24.2244 32.54 25.6299C31.1475 27.0638 29.4858 28.209 27.65 28.9999C27.4453 29.0907 27.224 29.1384 27 29.1399Z" fill="#B3B3B3"/>
                                    <path d="M23.69 22.0801C23.3094 22.0796 22.9406 21.9476 22.6462 21.7064C22.3518 21.4652 22.1499 21.1297 22.0746 20.7566C21.9992 20.3835 22.0551 19.9959 22.2329 19.6594C22.4106 19.3229 22.6993 19.0581 23.0499 18.9101C23.8655 18.5635 24.5605 17.9838 25.048 17.2438C25.5354 16.5037 25.7936 15.6362 25.79 14.7501C25.7935 14.149 25.6744 13.5535 25.44 13.0001C25.2031 12.4627 24.8634 11.9769 24.44 11.5701C24.0312 11.1489 23.5458 10.8095 23.01 10.5701C22.6564 10.3727 22.3883 10.0515 22.2574 9.66825C22.1264 9.28504 22.1418 8.86693 22.3008 8.49445C22.4597 8.12197 22.7508 7.82146 23.118 7.6508C23.4853 7.48013 23.9028 7.45138 24.29 7.57008C25.4625 8.07189 26.495 8.8522 27.2977 9.84332C28.1005 10.8344 28.6493 12.0064 28.8966 13.2577C29.1439 14.5089 29.0822 15.8016 28.7168 17.0235C28.3515 18.2455 27.6934 19.3599 26.7999 20.2701C26.0941 20.9834 25.2548 21.5508 24.3299 21.9401C24.1281 22.0293 23.9106 22.0769 23.69 22.0801Z" fill="#B3B3B3"/>
                                </svg>`;
    }
}

// воспроизведение / стоп
function togglePlay() {
    if (video.paused) {
        video.play();
        posterPlay.style.display = 'none';
    } else {
        video.pause();
        posterPlay.style.display = 'block';
    }
}

// перемотка по прогрессбару
function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;

    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
    
    if (progress.value === '100') {
        video.pause();
        posterPlay.style.display = 'block';
    }
}

// изменение иконки кнопки воспроизведение / стоп
function updateButton() {
    const iconPlay = this.paused ? `<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.35 14.75L0 0C0 22.23 0 11.32 0 29.49L22.35 14.75Z" fill="#B3B3B3"/>
                                </svg>` 
                             : `<svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 29.0471V0.944802C8 0.421605 7.55026 0 6.98347 0H1.01653C0.449742 0 0 0.421605 0 0.944802V29.0471C0 29.5703 0.449742 30 1.01653 30H6.98347C7.55026 30 8 29.5784 8 29.0471Z" fill="#B3B3B3"/>
                                    <path d="M19.9835 0H14.0165C13.4584 0 13 0.421605 13 0.944802V29.0471C13 29.5703 13.4497 30 14.0165 30H19.9835C20.5416 30 21 29.5784 21 29.0471V0.944802C21 0.421605 20.5503 0 19.9835 0Z" fill="#B3B3B3"/>
                                </svg>`;
                 
    toggle.innerHTML = iconPlay;
}

// вкл/выкл громкость кнопкой
function toggleVolume() {
    if (volumeBtn.classList.contains('volume-on')) {
        volumeBtn.classList.remove('volume-on');
        volumeBtn.innerHTML = `<svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.2053 15L35.6703 11.535C35.8901 11.3152 36 11.0474 36 10.7337C36 10.4199 35.8901 10.1522 35.6703 9.93234L34.0677 8.32972C33.8478 8.10991 33.5801 8 33.2663 8C32.9526 8 32.6848 8.10991 32.465 8.32972L29 11.7947L25.535 8.32972C25.3152 8.10991 25.0474 8 24.7337 8C24.4199 8 24.1522 8.10991 23.9323 8.32972L22.3297 9.93234C22.1099 10.1522 22 10.4199 22 10.7337C22 11.0474 22.1099 11.3152 22.3297 11.535L25.7947 15L22.3297 18.465C22.1099 18.6848 22 18.9526 22 19.2663C22 19.5801 22.1099 19.8478 22.3297 20.0677L23.9323 21.6703C24.1522 21.8901 24.4199 22 24.7337 22C25.0474 22 25.3152 21.8901 25.535 21.6703L29 18.2053L32.465 21.6703C32.6848 21.8901 32.9516 22 33.2663 22C33.5811 22 33.8478 21.8901 34.0677 21.6703L35.6703 20.0677C35.8901 19.8478 36 19.5801 36 19.2663C36 18.9526 35.8901 18.6848 35.6703 18.465L32.2053 15Z" fill="#B3B3B3"/>
                                    <path d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z" fill="#B3B3B3"/>
                                </svg>`;
        volume.value = 0;
        handleRangeUpdate();
    } else {
        volumeBtn.classList.add('volume-on');
        volumeBtn.innerHTML = `<svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.86 0L3.63 10.42V19.07L17.86 29.49C17.83 7.26 17.86 18.17 17.86 0Z" fill="#B3B3B3"/>
                                    <path d="M0 21.9198H7.47V7.55981H0V21.9198Z" fill="#B3B3B3"/>
                                    <path d="M27 29.1399C26.6559 29.1407 26.3193 29.0395 26.0328 28.849C25.7462 28.6586 25.5225 28.3874 25.39 28.0699C25.2993 27.8572 25.2514 27.6286 25.249 27.3974C25.2467 27.1661 25.2899 26.9367 25.3763 26.7221C25.4627 26.5076 25.5905 26.3122 25.7524 26.1471C25.9143 25.982 26.1072 25.8504 26.32 25.7599C27.7344 25.1603 29.0184 24.2907 30.1 23.1999C32.3328 20.9541 33.5873 17.9167 33.59 14.7499C33.5793 11.5788 32.3138 8.5408 30.07 6.29988C28.9863 5.20894 27.7031 4.33644 26.29 3.72988C25.8627 3.547 25.5251 3.20251 25.3509 2.7716C25.1766 2.3407 25.1799 1.85837 25.36 1.42988C25.4463 1.21604 25.5746 1.02173 25.7375 0.858495C25.9003 0.695259 26.0943 0.566432 26.308 0.479673C26.5216 0.392914 26.7505 0.349995 26.9811 0.353466C27.2116 0.356938 27.4391 0.406729 27.65 0.49988C31.3419 2.07523 34.2782 5.02222 35.84 8.71988C36.6452 10.6177 37.0601 12.6583 37.06 14.7199C37.059 16.7804 36.6477 18.82 35.85 20.7199C35.077 22.5565 33.9526 24.2244 32.54 25.6299C31.1475 27.0638 29.4858 28.209 27.65 28.9999C27.4453 29.0907 27.224 29.1384 27 29.1399Z" fill="#B3B3B3"/>
                                    <path d="M23.69 22.0801C23.3094 22.0796 22.9406 21.9476 22.6462 21.7064C22.3518 21.4652 22.1499 21.1297 22.0746 20.7566C21.9992 20.3835 22.0551 19.9959 22.2329 19.6594C22.4106 19.3229 22.6993 19.0581 23.0499 18.9101C23.8655 18.5635 24.5605 17.9838 25.048 17.2438C25.5354 16.5037 25.7936 15.6362 25.79 14.7501C25.7935 14.149 25.6744 13.5535 25.44 13.0001C25.2031 12.4627 24.8634 11.9769 24.44 11.5701C24.0312 11.1489 23.5458 10.8095 23.01 10.5701C22.6564 10.3727 22.3883 10.0515 22.2574 9.66825C22.1264 9.28504 22.1418 8.86693 22.3008 8.49445C22.4597 8.12197 22.7508 7.82146 23.118 7.6508C23.4853 7.48013 23.9028 7.45138 24.29 7.57008C25.4625 8.07189 26.495 8.8522 27.2977 9.84332C28.1005 10.8344 28.6493 12.0064 28.8966 13.2577C29.1439 14.5089 29.0822 15.8016 28.7168 17.0235C28.3515 18.2455 27.6934 19.3599 26.7999 20.2701C26.0941 20.9834 25.2548 21.5508 24.3299 21.9401C24.1281 22.0293 23.9106 22.0769 23.69 22.0801Z" fill="#B3B3B3"/>
                                </svg>`;
        volume.value = 1;
        handleRangeUpdate();
    }
}

// полноэкранный режим
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        video.requestFullscreen();

        fullBtn.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.2554 7.74495H35.9764V12.8119H23.1874V0.0229492H28.2544V7.74395L28.2554 7.74495ZM23.1884 35.976V23.1869H35.9774V28.2539H28.2564V35.9749H23.1894L23.1884 35.976ZM7.74544 7.74495V0.0239492H12.8124V12.8129H0.0234375V7.74595H7.74444L7.74544 7.74495ZM0.0244375 28.2549V23.1879H12.8134V35.977H7.74644V28.2559H0.0254375L0.0244375 28.2549Z" fill="#B3B3B3"/>
                            </svg>`;
    } else if (document.exitFullscreen) {
        video.exitFullscreen();

        fullBtn.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.48 31.6299H23.05V35.8599H35.7001V23.1499H31.48V31.6299Z" fill="#B3B3B3"/>
                                <path d="M4.22 23.1499H0V35.8599H12.65V31.6299H4.22V23.1499Z" fill="#B3B3B3"/>
                                <path d="M0 12.71H4.22V4.24H12.65V0H0V12.71Z" fill="#B3B3B3"/>
                                <path d="M23.05 0V4.24H31.48V12.71H35.7001V0H23.05Z" fill="#B3B3B3"/>
                            </svg>`;
    }
}

// ускорение / замедление видео 
function speedPlus() {
    if (video.playbackRate > 2) {
        return;
    } else {
        video.playbackRate += 0.1;
    }
}

function speedMinus() {
    if (video.playbackRate < 0.5) {
        return;
    } else {
        video.playbackRate -= 0.1;
    }
}

function hotKeys(event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        togglePlay();
    }
    if (event.keyCode === 77) {
        toggleVolume();
    }
    if (event.keyCode === 70) {
        toggleFullScreen();
    }

    if (event.keyCode === 190) {
        speedPlus()
    }
    if (event.keyCode === 188) {
        speedMinus();
    } 
}

// управление с клавиатуры
document.addEventListener('scroll', function() {
    if (window.pageYOffset > 3000 && window.pageYOffset < 4000) {
        window.addEventListener('keydown', hotKeys);
    } else {
        window.removeEventListener('keydown', hotKeys);
    }
});

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
posterPlay.addEventListener('click', togglePlay);

progress.addEventListener('input', stylizeRange);
volume.addEventListener('input', stylizeRange);

video.addEventListener('timeupdate', handleProgress);
volume.addEventListener('change', handleRangeUpdate);

volume.addEventListener('mousemove', handleRangeUpdate);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

volumeBtn.addEventListener('click', toggleVolume);

fullBtn.addEventListener('click', toggleFullScreen);

// МОДАЛЬНОЕ ОКНО booking tickets 
const bookingTickets = document.querySelector('.booking-tickets');
const buyNow = document.querySelector('.buy-button');
const closeBooking = document.querySelector('.booking-close');

buyNow.addEventListener('click', openModal);
closeBooking.addEventListener('click', closeModal);

function openModal() {
    bookingTickets.style.transform = 'translate(-50%, -50%)';
    bookingTickets.style.transition = '0.5s';
}

function closeModal() {
    bookingTickets.style.transform = 'translate(-250%, -50%)';
    bookingTickets.style.transition = '0.8s';
}

// КАЛЬКУЛЯТОР TICKETS 
const ticketsTypes = document.querySelectorAll('.tickets-type-radio');
const totalCost = document.querySelector('.tickets-total-cost');
const basicValue = document.querySelector('.basic-value');
const seniorValue = document.querySelector('.senior-value');

const basicButtons = document.querySelectorAll('.basic-button');
const seniorButtons = document.querySelectorAll('.senior-button');

const permanent = document.querySelector('.permanent');
const temporary = document.querySelector('.temporary');
const combined = document.querySelector('.combined');

let basicCost = 20;
let seniorCost = basicCost / 2;

let tType;

// взять стоимость билетов и общую сумму из localStorage
if (localStorage.getItem('total-sum')) {
    totalCost.innerHTML = localStorage.getItem('total-sum');
} else {
    totalCost.innerHTML = '30';
} 

if (localStorage.getItem('basic-value')) {
    basicValue.value = localStorage.getItem('basic-value');
} else {
    basicValue.value = 1;
}

if (localStorage.getItem('senior-value')) {
    seniorValue.value = localStorage.getItem('senior-value');
} else {
    seniorValue.value = 1;
}

// взять тип билета из localStorage
if (localStorage.getItem('type')) {
    tType = localStorage.getItem('type');

    document.querySelector(`${tType}`).setAttribute('checked', 'true');
} else {
    permanent.setAttribute('checked', 'true');
}

// определение суммы за basic и senior 
ticketsTypes.forEach(type => type.addEventListener('input', function(event) {
    basicCost = event.target.dataset.cost;
    seniorCost = basicCost / 2;

    calcTicketsSum();

    if (event.target.classList.contains('permanent')) {
        event.target.setAttribute('checked', 'true');
        temporary.removeAttribute('checked');
        combined.removeAttribute('checked');

        // положить тип билета в localStorage
        localStorage.setItem('type', '.permanent');
    } else if (event.target.classList.contains('temporary')) {
        event.target.setAttribute('checked', 'true');
        permanent.removeAttribute('checked');
        combined.removeAttribute('checked');

        // положить тип билета в localStorage
        localStorage.setItem('type', '.temporary');
    } if (event.target.classList.contains('combined')) {
        event.target.setAttribute('checked', 'true');
        permanent.removeAttribute('checked');
        temporary.removeAttribute('checked');

        // положить тип билета в localStorage
        localStorage.setItem('type', '.combined');
    }    
}));     

function calcTicketsSum() {
    let sum = basicValue.value * basicCost + seniorValue.value * seniorCost;
    totalCost.innerHTML = sum;

    // кладем сумму в localStorage
    localStorage.setItem('total-sum', sum);
}

// плюс / минус количество билетов
const minusTicket = document.querySelectorAll('.minus-button');
const plusTicket = document.querySelectorAll('.plus-button');

for (let i = 0; i < minusTicket.length; i++) {
    minusTicket[i].addEventListener('click', counterMinus);
    
}
for (let i = 0; i < plusTicket.length; i++) {
    plusTicket[i].addEventListener('click', counterPlus);
}

// кладем количество билетов в localStorage
basicButtons.forEach(basicBtn => basicBtn.addEventListener('click', function() {
    localStorage.setItem('basic-value', basicValue.value);
}));

seniorButtons.forEach(seniorBtn => seniorBtn.addEventListener('click', function() {
    localStorage.setItem('senior-value', seniorValue.value);
}));

function counterMinus(event) {
    let counter = event.target.nextElementSibling;

    if (counter.value <= 0) {
        return;
    } else {
        counter.value --;
        calcTicketsSum();
    }
}

function counterPlus(event) {
    let counter = event.target.previousElementSibling;

    if (counter.value >= 20) {
        return;
    } else {
        counter.value ++;
        calcTicketsSum();
    }
}

// КАЛЬКУЛЯТОР В СЕКЦИИ BOOKING TICKETS
const buyButton = document.querySelector('.buy-button');

const bookingBasic = document.querySelector('.booking-entry-basic');
const bookingSenior = document.querySelector('.booking-entry-senior');

const bookingButtonsBasic = document.querySelector('.booking-buttons-basic');
const bookingButtonsSenior = document.querySelector('.booking-buttons-senior');

const bookingCountBasic = document.querySelector('.booking-count-basic');
const bookingCountSenior = document.querySelector('.booking-count-senior');

const overCountBasic = document.querySelector('.over-count-basic');
const overCountSenior = document.querySelector('.over-count-senior');

const oneBasicCost = document.querySelector('.one-basic-cost');
const oneSeniorCost = document.querySelector('.one-senior-cost');

const allBasicCost = document.querySelector('.all-basic-cost');
const allSeniorCost = document.querySelector('.all-senior-cost');

const overTotalCost = document.querySelector('.total-cost');

const paymentTicketType = document.querySelector('.payment-tickets-type p');

let ticktCost = document.querySelector('.tickets-type-radio[checked="true"]').dataset.cost;

const selectLabelSpan = document.querySelector('.type-label');
const select = document.querySelector('.select');

const paymentDate = document.querySelector('.payment-date p');
const paymentTime = document.querySelector('.payment-time p');

const date = document.querySelector('.date');
const time = document.querySelector('.time');

const minusBookingTicket = document.querySelectorAll('.booking-minus');
const plusBookingTicket = document.querySelectorAll('.booking-plus');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['Janiary', 'Febriary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date;

function renderBookingCard() {
    // переносим тип билета    
    bookingBasic.innerHTML = `Basic 18+ (${ticktCost} €)`;

    bookingSenior.innerHTML = `Senior 65+ (${ticktCost / 2} €)`;
    
    // переносим количество билетов
    bookingCountBasic.value = basicValue.value;
    bookingCountSenior.value = seniorValue.value;

    // количество билетов, их стоимость и общая сумма в overview 
    renderOverview();

    paymentTicketType.innerHTML = document.querySelector('.tickets-type-radio[checked="true"]').nextElementSibling.innerHTML;

    selectLabelSpan.innerHTML = document.querySelector('.tickets-type-radio[checked="true"]').nextElementSibling.innerHTML;


    let pastDay = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    let pastMonth = today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1;

    let pastDate = `${today.getFullYear()}-${pastMonth}-${pastDay}`;
    date.setAttribute('min', pastDate)
}

function renderOverview() {
    overCountBasic.innerHTML = bookingCountBasic.value;
    overCountSenior.innerHTML = bookingCountSenior.value;

    oneBasicCost.innerHTML = `Basic (${ticktCost} €)`;
    oneSeniorCost.innerHTML = `Senior (${ticktCost / 2} €)`;

    allBasicCost.innerHTML = `${bookingCountBasic.value * ticktCost} €`;
    allSeniorCost.innerHTML = `${bookingCountSenior.value * ticktCost / 2} €`;

    overTotalCost.innerHTML = `${(bookingCountBasic.value * ticktCost) + (bookingCountSenior.value * ticktCost / 2)} €`;

    paymentDate.innerHTML = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`;
}

buyNow.addEventListener('click', renderBookingCard);

for (let i = 0; i < minusBookingTicket.length; i++) {
    minusBookingTicket[i].addEventListener('click', counterMinus);
    minusBookingTicket[i].addEventListener('click', renderOverview);
}
for (let i = 0; i < plusBookingTicket.length; i++) {
    plusBookingTicket[i].addEventListener('click', counterPlus);
    plusBookingTicket[i].addEventListener('click', renderOverview);
} 

// селект в секции booking tickets 
function changeSelect() {
    paymentTicketType.innerHTML = select.options[select.selectedIndex].innerHTML;
    ticktCost = select.options[select.selectedIndex].dataset.type;

    paymentTicketType.innerHTML = document.querySelector('.tickets-type-radio[checked="true"]').nextElementSibling.innerHTML;

    selectLabelSpan.innerHTML = document.querySelector('.tickets-type-radio[checked="true"]').nextElementSibling.innerHTML;

    selectLabelSpan.innerHTML = select.options[select.selectedIndex].innerHTML;
    paymentTicketType.innerHTML = select.options[select.selectedIndex].innerHTML;;
}

select.addEventListener('change', changeSelect);

// устанавливаем дату
function setDate() {
    let day = date.value[8] + date.value[9];
    let month = date.value[5] + date.value[6];
    let year = date.value[0] + date.value[1] + date.value[2] + date.value[3];

    let selectedDate = `${day}.${month}.${year}`;

    date.previousElementSibling.innerHTML = selectedDate;
  
    let d = new Date(year, month - 1, day);
    paymentDate.innerHTML = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

// устанавливаем время
function setTime() {
    time.previousElementSibling.innerHTML = time.value;

    paymentTime.innerHTML = time.previousElementSibling.innerHTML;
}

date.addEventListener('change', setDate);
time.addEventListener('change', setTime);

// ВАЛИДАЦИЯ ФОРМЫ
const bookingForm = document.querySelector('.booking-form');

const nameInput = document.querySelector('.name');
const emailInput = document.querySelector('.b-email');
const phoneInput = document.querySelector('.b-phone');

const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const phoneError = document.querySelector('.phone-error');

const nameMessage = 'enter from 3 to 15 symbols including only a-z, A-Z, а-я, А-Я, spaces';
const emailMessage = 'enter email according to the example: username@example.com';
const phoneMessage = 'maximum - 10 digits (can be combined by two digits and separate by space or dash)';

function showErrorMessage(input, error, message) {
    input.classList.add('error-border');

    error.innerHTML = message;
    error.classList.add('error-message');
}

function hideErrorMessage(input, error) {
    input.classList.remove('error-border');

    error.classList.remove('error-message');
    error.innerHTML = '';
}

nameInput.addEventListener('blur', function() {
    let nameReg = nameInput.value.match('^[a-zA-Zа-яА-я ]+$');

    if (!nameReg || nameInput.value.length < 3 || nameInput.value.length > 15) {
        showErrorMessage(nameInput, nameError, nameMessage);
    } else {
        hideErrorMessage(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', function() {
    let emailReg = emailInput.value.match('^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+');

    let userName = emailInput.value.slice(0, emailInput.value.indexOf('@'));
    let domainFirst = emailInput.value.slice(emailInput.value.indexOf('@') + 1, emailInput.value.indexOf('.'));
    let domainSecond = emailInput.value.slice(emailInput.value.indexOf('.') + 1, emailInput.value.length);

    if (!emailReg || userName.length < 3 || userName.length > 15 || domainFirst.length < 4 || domainSecond.length < 2) {
        showErrorMessage(emailInput, emailError, emailMessage);
    } else { 
        hideErrorMessage(emailInput, emailError);
    }
});

phoneInput.addEventListener('blur', function() {
    let phoneReg = phoneInput.value.match('^[0-9- ]+');
    
    let numbers = 0;
    let spaceOrDash = 0;

    for (let i = 0; i < phoneInput.value.length; i++) {
        if (phoneInput.value[i] === ' ' || phoneInput.value[i] === '-') {
            spaceOrDash++;
        } else {
            numbers++;
        }
    }

    if (!phoneReg || phoneInput.value.length > 14 || numbers > 10 || spaceOrDash > 4) {
        showErrorMessage(phoneInput, phoneError, phoneMessage);
    } else {
        hideErrorMessage(phoneInput, phoneError);
    }
});

// ИНТЕРАКТИВНАЯ КАРТА 
// сама карта 
mapboxgl.accessToken = 'pk.eyJ1Ijoib2tzZW4wMzIiLCJhIjoiY2t1aTY5Y3RnMDBjNDJ4bW9lenp3ZDJ6aSJ9.0cqzXLpByXnHdaN1qKLg9Q';
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/light-v10', 
    center: [2.335824, 48.860880],
    zoom: 16
});
// кнопки управления картой 
const nav = new mapboxgl.NavigationControl({
    shoeCompass: true,
    showZoom: true
});

map.addControl(nav, 'top-right');

// маркеры 
const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
            'message': 'Tunnel des Tuileries'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [2.3333015808733486, 48.86033392547728]
            }
        },
        {
            'type': 'Feature',
            'properties': {
            'message': 'Arc de triomphe du Carrousel'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [2.3329, 48.8617]
            }
        },
            {
            'type': 'Feature',
            'properties': {
            'message': 'Rue de Rivoli'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [2.336409, 48.862487]
            }
        },
            {
            'type': 'Feature',
            'properties': {
            'message': 'Sarcophage d\'Abou Roach'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [2.339643, 48.860745]
            }
        },
            {
            'type': 'Feature',
            'properties': {
            'message': 'Louvre Museum'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [2.335824, 48.860880]
            }
        }
    ]
};

for (const marker of geojson.features) {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(assets/marker.svg)`;

    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
}

// СЛАЙДЕР WELCOME 
const slider = document.querySelector('.welcome-slider');
const welcomePrev = document.querySelector('.welcome-prev');
const welcomeNext = document.querySelector('.welcome-next');

const items = document.querySelectorAll('.welcome-slide');
let currentItem = 0;
let isEnabled = true;

const currentSlideNumber = document.querySelector('.current-slide');
const welcomeDots = document.querySelectorAll('.welcome-dot');

// перелистывание кнопками
function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function changeSlideDotNumber() {
    currentSlideNumber.innerHTML = items[currentItem].dataset.number;

    for (let i = 0; i < welcomeDots.length; i++) {
        if (welcomeDots[i].classList.contains(`welcome-dot-${items[currentItem].dataset.number}`)) {
            welcomeDots[i].style.background = '#9D8665';
        } else {
            welcomeDots[i].style.background = '#fff';
        }
    }
}

welcomePrev.addEventListener('click', function () {
    if (isEnabled) {
        previousItem(currentItem);
        changeSlideDotNumber();
    }
});

welcomeNext.addEventListener('click', function () {
    if (isEnabled) {
        nextItem(currentItem);
        changeSlideDotNumber();   
    }
});

// перелистывание свайпами
slider.addEventListener('mousedown', function(event){
    x1 = event.clientX;
    y1 = event.clientY;
})

slider.addEventListener('mouseup', function(event){
    if (!x1 || !y1) {
        return false;
    } else {
        let x2 = event.clientX;
        let y2 = event.clientY;

        let xDiff = x2-x1;
        let yDiff = y2-y1;

        if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0 && isEnabled) { 
            previousItem(currentItem);
            changeSlideDotNumber(); 
        } else if  (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) { 
            nextItem(currentItem);
            changeSlideDotNumber();
        } 
    }
    x1 = null;
    y1 = null;
});

// РИППЛ ЭФФЕКТ КНОПКИ book 
const bookButton = document.querySelector('.payment-button');

bookButton.addEventListener('click', function () {
    const circle = document.createElement('span');

    circle.classList.add('circle');
    circle.style.top = 50 + '%';
    circle.style.left = 50 + '%';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
});

// БУРГЕР МЕНЮ 
let burger = document.querySelector('.burger-menu');
let welcDiscription = document.querySelector('.welcome-discription');
let navColumn = document.querySelector('.navigation-column');

burger.addEventListener('click', function() {
    burger.classList.toggle('burger-christ');
    welcDiscription.classList.toggle('discription-transparent');
    navColumn.classList.toggle('navigation-column-open');
});

// СЛАЙДЕР СЕКЦИИ EXPLORE 
const exploreSlider = document.querySelector('.explore-slider');
const exploreBefore = document.querySelector('.explore-before');
const exploreLine = document.querySelector('.explore-line');

function changeImageWidth(event) {
    let offset = event.pageX - exploreSlider.offsetLeft;
    let exploreSliderWidth = exploreSlider.offsetWidth;

    if (offset < 20) {
        offset = 20;
    }       
    if (offset > exploreSliderWidth - 20) {
        offset = exploreSliderWidth - 20;
    }

    exploreLine.style.left = `calc(${(offset / exploreSliderWidth) * 100}% - 20px)`;
    exploreBefore.style.width = (offset / exploreSliderWidth) * 100 + '%';   
}

exploreLine.addEventListener('dragstart', (event) => false);
exploreLine.addEventListener('mousedown', function() {
    document.addEventListener('mousemove', changeImageWidth);
});

document.addEventListener('mouseup', function() {
    document.removeEventListener('mousemove', changeImageWidth);
});

// АНИМАЦИЯ GALLERY ПРИ ПРОКРУТКЕ
function debounce(func, wait = 20, immediate = true) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;
        
        var later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }

        var callNow = immediate && !timeout;
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    }
} 

const gallery = document.querySelector('.gallery');
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.offsetHeight / 2;   
        
        
        const imageBottom = gallery.offsetTop + sliderImage.offsetTop + sliderImage.offsetHeight;

        const isHalfShown = slideInAt > sliderImage.offsetTop + gallery.offsetTop;
        const isntScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isntScrolledPast) {
            sliderImage.classList.add('gallery-active');
        } else {
            sliderImage.classList.remove('gallery-active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));

// СЛАЙДЕР В СЕКЦИИ VIDEO 
const videoPrevIcon = '<img src="assets/video-slider-prev.svg" alt="icon: prev">';
const videoNextIcon = '<img src="assets/video-slider-next.svg" alt="icon: next">';

$('.owl-carousel').owlCarousel({
    loop : true,
    margin : 40,
    nav : true,
    navText : [ videoPrevIcon, videoNextIcon ],
    responsive : {
        420 : { items : 2 },
        1024 : { items : 3 }
    }
});

console.log(`
1.	Слайдер в секции Welcome +22
•	Реализовала все, кроме возможности перелистывания слайдов кликами по буллетам
2.	Слайдер в секции Video +10
Сделано: 
•	если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание +1
•	есть возможность перелистывания слайдов влево и вправо кликами по стрелкам. Слайды перелистываются по одному +1
•	слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) +2
•	перелистывание слайдов бесконечное (зацикленное) +2
•	даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2
3.	Кастомный видеоплеер +33
•	Реализовала все, кроме навигационной панели в полноэкранном режиме (она у меня пропадает)
4.	Слайдер сравнения изображений в секции Explore +10
5.	Анимация при прокрутке изображений в секции Galery +8
6.	Калькулятор продажи билетов в секции Tiskets +10
7.	Калькулятор продажи билетов в форме продажи билетов +14
8.	Валидация формы +16
9.	Интерактивная карта в секции Contacts +10
•	Все сделано, только внешний вид маркеров слегка отличается от макета

Всего: 133
`)
