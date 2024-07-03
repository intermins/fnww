const backBox = document.querySelector('.backBox');

let status = true;

function play(src) {
    let sound = new Audio();
    sound.preload = 'auto';
    sound.src = src;
    sound.play();
}

document.querySelectorAll('.moveSensor').forEach((e)=>{
    e.addEventListener('click', (f)=>{
        if(f.target.id == 'left') {
            play('sounds/moveLeft.mp3');
            status = false;
            f.target.classList.add('none');
            document.getElementById('right').classList.remove('none')
            backBox.classList.toggle('moved');
        } else {
            play('sounds/moveRight.mp3')
            status = true;
            f.target.classList.add('none');
            document.getElementById('left').classList.remove('none')
            backBox.classList.toggle('moved');
        }
    })
})