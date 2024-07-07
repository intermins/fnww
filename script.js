const backBox = document.querySelector('.backBox');

let status = true;
let camera_status = false;
let tutorial = true;
let vent_tutorial = true;
let flash_interval = true;
let flash_count = 10;
let vent_status = false;
let oxygen = 100;
let active_camera = 'k3';
let move_chance = 10;
let thing_move_chance = 10;
let wednesday_wait_time = 15;
let thing_wait_time = 8;
let dead_soul_chance = 35;
let dead_soul = false;
let dead_soul_wait_time = 15;
let phoneguy_move_chance = 15;
let phoneguy_wait_time = 6;
let phoneguy_status = false;
let phoneguy_wait = 2;

let win = false;

let night_index = 0;

let positions = {};
let steps = {};

positions['w'] = 'k6';
steps['w'] = 1;
positions['t'] = 'k1';
steps['t'] = 1;
positions['p'] = 'k2';
steps['p'] = 1;

let graph = {};

graph['k6'] = 'k5';
graph['k5'] = 'k4';
graph['k4'] = 'player';
graph['k1'] = 'k3';
graph['k2'] = 'k4';
graph['k3'] = 'player';
graph['player'] = 'player'

let vent_door_limiter = true;
let camera_open_limiter = true;

let time_walk;
let vallet_check;
let loop;

document.getElementById('count_flash').innerHTML = flash_count;

let time = 0;

function set_night() {
    setting_key = nights[nights_keys[night_index]];
    flash_count = setting_key[0];
    move_chance = setting_key[1];
    thing_move_chance = setting_key[2];
    wednesday_wait_time = setting_key[3];
    thing_wait_time = setting_key[4];
    dead_soul_chance = setting_key[5];
    dead_soul_wait_time = setting_key[6];
    phoneguy_move_chance = setting_key[7];
    phoneguy_wait_time = setting_key[8];
    phoneguy_wait = setting_key[9];
    document.getElementById('count_flash').innerHTML = flash_count;
    document.getElementById('night-res').innerHTML = nights_keys[night_index]
}

set_night()

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
    }, 1000)
    time_walk = setInterval(() => {
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
            clearInterval(vallet_check)
            clearInterval(loop)
            win = true;
            setTimeout(() => {
                location.reload()
            }, 6000)
        }
    }, 75000);
    vallet_check = setInterval(() => {
        if(vent_status) {
            oxygen -= 0.7;
        } else {
            oxygen += 0.4
        }
        if(oxygen > 100) {
            oxygen = 100;
        }
        if(oxygen < 0) {
            oxygen = 0;
            if(!win) {
                over('oxygen')
            }
        }
        document.querySelector('#oxygen_bar').style.width = `${oxygen}%`
    }, 80)
    loop = setInterval(() => {
        Object.keys(positions).forEach((key) => {
            if(positions[key] != 'player') {
                if(key == 'w' && rand(0, move_chance) == Math.floor(move_chance/2)) {
                    if(steps[key] < 2) {
                        steps[key]++;
                    } else {
                        steps[key] = 1;
                        positions[key] = graph[positions[key]]
                    }
                    if(active_camera == positions[key]) {
                        addition = ''
                        addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    } else {
                        addition = '';
                        Object.keys(positions).forEach((key)=>{
                            if(positions[key] == active_camera) {
                                addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                            }
                        })
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    }
                    if(positions['w'] == 'player') {
                        setTimeout(() => {
                            if(positions['w'] == 'player' && !win) {
                                over('wednesday');
                            }
                        }, wednesday_wait_time*1000)
                    }
                }
                if(key == 'p' && rand(0, phoneguy_move_chance) == Math.floor(phoneguy_move_chance/2) && phoneguy_wait <= time) {
                    if(steps[key] < 2) {
                        steps[key]++;
                    } else {
                        steps[key] = 1;
                        positions[key] = graph[positions[key]]
                    }
                    if(active_camera == positions[key]) {
                        addition = ''
                        addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    } else {
                        addition = '';
                        Object.keys(positions).forEach((key)=>{
                            if(positions[key] == active_camera) {
                                addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                            }
                        })
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    }
                    if(positions['p'] == 'player') {
                        phoneguy_status = true;
                        setTimeout(() => {
                            positions['p'] = 'k2';
                            steps['p'] = 1;
                            phoneguy_status = false;
                        }, phoneguy_wait_time*1000);
                    }
                }
                if(key == 't' && rand(0, thing_move_chance) == Math.floor(thing_move_chance/2)) {
                    if(steps[key] < 2) {
                        steps[key]++;
                    } else {
                        steps[key] = 1;
                        positions[key] = graph[positions[key]]
                    }
                    if(active_camera == positions[key]) {
                        addition = ''
                        addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    } else {
                        addition = '';
                        Object.keys(positions).forEach((key)=>{
                            if(positions[key] == active_camera) {
                                addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
                            }
                        })
                        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
                    }
                    if(positions['t'] == 'player') {
                        setTimeout(() => {
                            if(!vent_status && !win) {
                                over('thing');
                            } else {
                                play('sounds/thing_run.mp3')
                                positions['t'] = 'k1'
                                steps['t'] = 1
                            }
                        }, thing_wait_time * 1000)
                    }
                }
            }
        })
        if(status && rand(0, dead_soul_chance) == Math.floor(dead_soul_chance/2) && !dead_soul) {
            document.querySelector('.dead_soul').classList.remove('none');
            dead_soul = true;
            let soul = document.createElement('audio');
            soul.preload = 'auto';
            soul.loop = 'true';
            soul.src = 'sounds/dead_soul.mp3'
            soul.id = 'soul';
            soul.play();
            document.body.appendChild(soul)
            setTimeout(() => {
                if(dead_soul && !win) {
                    over('dead soul');
                    document.getElementById('soul').remove();
                }
            }, dead_soul_wait_time * 1000)
        }
    }, 3000);
}
function over(screamer) {
    clearInterval(time_walk)
    clearInterval(vallet_check)
    clearInterval(loop)
    document.getElementById('atmosphere').remove()
    play('sounds/over.mp3');
    setTimeout(() => {
        play('sounds/over_menu.mp3');
        document.querySelector('.over-menu').classList.remove('none');
        setTimeout(() => {
            document.querySelector('.over-menu-flash').classList.remove('flash-out')
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 6000)
    }, 400)
    switch(screamer) {
        case 'wednesday':
            document.querySelector('.hint').innerHTML = 'Не забывайте светить на Уенсдей!'
            document.querySelector('.scream-wednesday').classList.remove('dead_soul-run')
            break;
        case 'dead soul':
            document.querySelector('.hint').innerHTML = 'Светите на мертвеца в коридоре!'
            document.querySelector('.scream-wednesday').style.background = `url('images/dead_soul.png') center / cover`;
            document.querySelector('.scream-wednesday').classList.remove('dead_soul-run')
            break;
        case 'thing':
            document.querySelector('.scream-thing').classList.remove('hidden_thing')
            document.querySelector('.hint').innerHTML = 'Закрывайте вентиляцию перед вещью!'
            break;
        case 'oxygen':
            document.querySelector('.hint').innerHTML = 'Следите за кислородом!'
            break;
        case 'phoneguy':
            document.querySelector('.scream-wednesday').style.background = `url('images/phoneguy.png') center / cover`;
            document.querySelector('.scream-wednesday').classList.remove('dead_soul-run')
            document.querySelector('.hint').innerHTML = 'Старайтесь не светить на фонгая!';
            break;
        default:
            break;
    }
} 

document.querySelectorAll('.moveSensor').forEach((e)=>{
    e.addEventListener('click', (f)=>{
        if(f.target.id == 'left') {
            if(tutorial) {
                document.querySelector('.tutorial').innerHTML = 'Space to Flash'
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
                if(phoneguy_status) {
                    document.querySelector('.phoneguy-scream').classList.remove('none');
                    setTimeout(() => {
                        document.querySelector('.phoneguy-scream').classList.add('fade-out');
                    }, 400);
                    setTimeout(() => {
                        over('phoneguy')
                    }, 1300)
                }
                if(dead_soul) {
                    dead_soul = false;
                    document.getElementById('soul').remove();
                    play('sounds/scream.mp3');
                    setTimeout(() => {
                        document.querySelector('.dead_soul').classList.add('dead_soul-run');
                    }, 200)
                    setTimeout(() => {
                        document.querySelector('.dead_soul').classList.add('none');
                        document.querySelector('.dead_soul').classList.remove('dead_soul-run')
                    }, 400);
                }
                if(positions['w'] == 'player') {
                    play('sounds/scream.mp3');
                    document.querySelector('.wednesday_box').classList.remove('none');
                    setTimeout(() => {
                        document.querySelector('.wednesday').classList.add('wednesday_run');
                        positions['w'] = 'k6';
                        steps['w'] = 1
                    }, 200);
                    setTimeout(() => {
                        document.querySelector('.wednesday_box').classList.add('none');
                        document.querySelector('.wednesday').classList.remove('wednesday_run')
                    }, 2000);
                }
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
            if(status && vent_door_limiter && !camera_status) {
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
                    }, 200)
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

document.querySelectorAll('.camera-btn').forEach((e) => {
    e.addEventListener('click', (e) => {
        play('sounds/nextCamera.mp3');
        document.getElementById(active_camera).classList.remove('activated-camera');
        e.target.classList.add('activated-camera');
        active_camera = e.target.id;
        addition = '';
        Object.keys(positions).forEach((key)=>{
            if(positions[key] == e.target.id) {
                addition += `url('images/cameras/${key}_${positions[key]}_${steps[key]}.png') center / cover, `
            }
        })
        document.querySelector('.camera').style.background = `url('images/camera_decor.png') center left / 50% no-repeat, ${addition} url('images/${active_camera}.jpg') center / cover no-repeat, url('images/no signal.jpg') center / cover`;
    })
})

document.querySelectorAll('.select').forEach((key) => {
    key.addEventListener('click', (e)=>{
        if(e.target.id == 'night-back') {
            night_index--;
            if(night_index < 0) {
                night_index = nights_keys.length-1;
            }
        } else {
            night_index++;
            if(night_index > nights_keys.length-1) {
                night_index = 0;
            }
        }
        set_night()
    })
})
document.getElementById('tutorials').addEventListener('click', (e)=>{
    if(tutorial) {
        tutorial = false;
        vent_tutorial = false;
        e.target.innerHTML = 'OFF'
    } else {
        tutorial = true;
        vent_tutorial = true;
        e.target.innerHTML = 'ON'
    }
})