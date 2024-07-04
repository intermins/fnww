const backBox = document.querySelector('.backBox');

let status = true;
let tutorial = true;
let flash_interval = true;
let flash_count = 3;

function play(src) {
    let sound = new Audio();
    sound.preload = 'auto';
    sound.src = src;
    sound.play();
}

function rand(min, max) {
    return min + Math.floor(Math.random() * (max-min)) 
}

document.querySelectorAll('.moveSensor').forEach((e)=>{
    e.addEventListener('click', (f)=>{
        if(f.target.id == 'left') {
            if(tutorial) {
                document.querySelector('.tutorial').classList.remove('hidden');
            }
            play('sounds/moveLeft.mp3');
            status = false;
            f.target.classList.add('none');
            document.getElementById('right').classList.remove('none')
            backBox.classList.toggle('moved');
        } else {
            document.querySelector('.tutorial').classList.add('hidden')
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
                    document.querySelector('.bar').classList.add('battery_counting')
                }  else {
                    document.querySelector('.bar').style.width = '0%';
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
                    document.querySelector('.bar').classList.remove('battery_counting')
                }, 5000)
            }
            break;
        default:
            break;
    }
})