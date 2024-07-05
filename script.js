const backBox = document.querySelector('.backBox');

let status = true;
let camera_status = false;
let tutorial = true;
let vent_tutorial = true;
let flash_interval = true;
let flash_count = 5;
let vent_status = false;
let oxygen = 100;

let vent_door_limiter = true;
let camera_open_limiter = true;

document.getElementById('count_flash').innerHTML = flash_count;

let time = 0;

function play(src) {
    let sound = new Audio();
    sound.preload = 'auto';
    sound.src = src;
    sound.play();
}

function rand(min, max) {
    return min + Math.floor(Math.random() * (max-min)) 
}
function start() {
    document.querySelector('.start').classList.add('out');
    setTimeout(() => {
        let atmosphere = document.createElement('audio');
        atmosphere.preload = 'auto';
        atmosphere.loop = 'true';
        atmosphere.src = 'sounds/atmosphere.mp3'
        atmosphere.id = 'atmosphere';
        atmosphere.play();
        document.body.appendChild(atmosphere)
    }, 2000)
    let time_walk = setInterval(() => {
        time++;
        if(time < 6) {
            document.getElementById('time').innerHTML = time;
        } else {
            play('sounds/endOfNight.mp3');
            document.querySelector('.end').classList.add('get');
            setTimeout(() => {
                document.getElementById('box').classList.add('endofnight');
            }, 3000);
            document.getElementById('atmosphere').remove()
            clearInterval(time_walk)
        }
    }, 75000);
    let vallet_check = setInterval(() => {
        if(vent_status) {
            oxygen -= 1;
        } else {
            oxygen += 2
        }
        if(oxygen > 100) {
            oxygen = 100;
        }
        if(oxygen < 0) {
            oxygen = 0;
        }
        document.querySelector('#oxygen_bar').style.width = `${oxygen}%`
    }, 80)

}

document.querySelectorAll('.moveSensor').forEach((e)=>{
    e.addEventListener('click', (f)=>{
        if(f.target.id == 'left') {
            if(tutorial) {
                document.querySelector('.tutorial').classList.remove('hidden');
            }
            document.querySelector('.cameraSensor').classList.add('cameraSensorOut')
            play('sounds/moveLeft.mp3');
            status = false;
            f.target.classList.add('none');
            document.getElementById('right').classList.remove('none')
            backBox.classList.toggle('moved');
        } else {
            document.querySelector('.tutorial').classList.add('hidden')
            if(vent_tutorial) {
                document.querySelector('.tutorial').innerHTML = 'Enter to close vent'
                document.querySelector('.tutorial').classList.remove('hidden');
            }
            document.querySelector('.cameraSensor').classList.remove('cameraSensorOut')
            play('sounds/moveRight.mp3')
            status = true;
            f.target.classList.add('none');
            document.getElementById('left').classList.remove('none')
            backBox.classList.toggle('moved');
        }
    })
})

document.addEventListener('keydown', (e)=>{
    switch(e.key) {
        case ' ':
            if(!status && flash_interval && flash_count > 0) {
                play('sounds/flash.mp3');
                flash_count--;
                document.getElementById('count_flash').innerHTML = flash_count;
                if(flash_count > 0) {
                    document.querySelector('#flash_bar').classList.add('battery_counting')
                }  else {
                    document.querySelector('#flash_bar').style.width = '0%';
                }
                tutorial = false;
                document.getElementById('left_f').classList.add('flashed');
                setTimeout(() => {
                    document.getElementById('left_f').classList.remove('flashed')
                }, 2000)
                document.querySelector('.tutorial').classList.add('hidden')
                flash_interval = false;
                setTimeout(() => {
                    flash_interval = true;
                    if(flash_count > 0) {
                        play('sounds/flash_battery.mp3');
                    }
                    document.querySelector('#flash_bar').classList.remove('battery_counting')
                }, 5000)
            }
            break;
        case 'Enter':
            if(status && vent_door_limiter) {
                vent_tutorial = false;
                vent_door_limiter = false;
                setTimeout(() => {
                    vent_door_limiter = true;
                }, 2000)
                document.querySelector('.tutorial').classList.add('hidden')
                if(!vent_status) {
                    setTimeout(() => {
                        vent_status = true;
                    }, 2000)
                    play('sounds/vent-up.mp3');
                    document.querySelector('.vent-door').classList.toggle('vent-open')
                } else {
                    setTimeout(() => {
                        vent_status = false;
                    }, 2000)
                    play('sounds/vent-up.mp3');
                    document.querySelector('.vent-door').classList.toggle('vent-open')
                }
            }
            break;
        default:
            break;
    }
})

document.querySelector('.cameraSensor').addEventListener('click', (e)=>{
    if(!camera_status && camera_open_limiter) {
        camera_open_limiter = false;
        setTimeout(() => {
            camera_open_limiter = true;
        }, 300)
        camera_status = true;
        play('sounds/camera_open.mp3')
        document.querySelector('.camera').classList.toggle('camera-close')
    } else if(camera_status && camera_open_limiter) {
        camera_open_limiter = false;
        setTimeout(() => {
            camera_open_limiter = true;
        }, 300)
        camera_status = false;
        play('sounds/camera_close.mp3')
        document.querySelector('.camera').classList.toggle('camera-close')
    }
})