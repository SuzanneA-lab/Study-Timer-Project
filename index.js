const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');

let work=1500000; //25 min interval
let short_break=300000; //5 min interval
let long_break=10000;//=600000; //10 min interval
let time; //start time
let current_setting = work;
let remaining_time = current_setting;
let timer = null;
let isRunning = false;
let time_passed = 0;
let stored_time = 0;
let study_sessions = 0;
let autorun = true;

let boughtitem = [true, true, false, false, false, false,]

function start(){
    if (!isRunning){
        time = Date.now() - time_passed;
        
        if (autorun){
            timer = setInterval(updateautorun, 10)
        }

        else{
            timer = setInterval(update, 10)
        }

        isRunning = true;
    }
}

function stop(){
    if (isRunning){
        clearInterval(timer);
        time_passed = Date.now()-time;
        isRunning = false;
    }
}

function reset(){
    if (isRunning){
        clearInterval(timer);
        setdisplay(current_setting);
        time_passed = 0;
        isRunning = false;
    }

    else{
        setdisplay(current_setting);
        time_passed = 0;
        isRunning = false;
    }
}

function update(){
    let newtime = Date.now();
    time_passed = newtime-time;
    remaining_time = current_setting - time_passed;

    let minutes = Math.floor(remaining_time / (1000*60) % 60);
    let seconds = Math.floor(remaining_time / 1000 % 60); 

    if (minutes <= 0 & seconds <= 0){
        document.getElementById("ding").play();
        study_sessions++;
        clearInterval(timer);
    }

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    display.textContent = `${minutes}:${seconds}`;
}

function updateautorun(){
    let newtime = Date.now();
    time_passed = newtime-time;
    remaining_time = current_setting - time_passed;

    let minutes = Math.floor(remaining_time / (1000*60) % 60);
    let seconds = Math.floor(remaining_time / 1000 % 60); 

    if (minutes <= 0 & seconds <= 0){
        document.getElementById("ding").play();
        study_sessions++;

        if (current_setting != work){
            Study();
            start();
        }

        else{
            if (study_sessions%4 == 0){
                LongB();
                start();
            }

            else {
                ShortB();
                start();
            }
        }
    }

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    display.textContent = `${minutes}:${seconds}`;
}


function Study(){
    current_setting = work;
    if (isRunning){
        clearInterval(timer);
    }

    time_passed = 0;
    isRunning = false;
    setdisplay(current_setting)
}

function ShortB(){
    current_setting = short_break;
    if (isRunning){
        clearInterval(timer);
    }

    time_passed = 0;
    isRunning = false;
    setdisplay(current_setting)
}

function LongB(){
    current_setting = long_break;
    if (isRunning){
        clearInterval(timer);
    }

    time_passed = 0;
    isRunning = false;
    setdisplay(current_setting)
}

function setdisplay(current_setting){
    let minutes = Math.floor(current_setting / (1000*60) % 60);
    let seconds = Math.floor(current_setting / 1000 % 60); 

    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    display.textContent = `${minutes}:${seconds}`;
}

function Openmenu(){
    sidebar.style.display = 'flex';
}

function Closemenu(){
    sidebar.style.display = 'none';
}

function BuyEquip(click_id){
    item_num = parseInt(click_id);
    if (boughtitem[item_num-1]){
        changeUIcolours(item_num);
    }

    else{
    }
}

function changeUIcolours(item_num){
    if (item_num == 2){
        document.body.style.backgroundImage = 'url(IMG_0657.png)';
        document.getElementById("Headertext").style.color = 'black';  
        document.getElementById("menuicon").style.color = 'black';
    }

    else {
        document.body.style.backgroundImage = 'url(tempbg3.png)';
        document.getElementById("Headertext").style.color = 'white';  
        document.getElementById("menuicon").style.color = 'white';
    }
}