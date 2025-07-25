//// Code for all pages
//
//
//

const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");

const root = document.documentElement;
const cover = document.getElementById('cover');

window.onload = Load();

window.addEventListener("DOMContentLoaded", function(){
    cover.remove()
    //cover.style.visibility = "hidden";
});

function Load(){
    let theme = localStorage.getItem("theme");
    let accent = localStorage.getItem("accent");
    let bg = localStorage.getItem("Background");

    if (theme === null || bg === null || accent == null){
        theme = "white";
        accent = "#0a0f72";
        bg = "url(Stars.png)";
    }

    root.style.setProperty('--theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--background', bg);
}

function Openmenu(){
    sidebar.style.display = 'flex';
}

function Closemenu(){
    sidebar.style.display = 'none';
}

function Closehelp(){
    popuphelp.style.display = 'none';
}

function Openhelp(){
    popuphelp.style.display = 'flex';
}

function CloseSettings(){
    popupsettings.style.display = 'none';
}

function OpenSettings(){
    popupsettings.style.display = 'flex';
}

//// Timer code starts here
//
//
// 

let work=1500000; //25 min interval
let short_break=300000; //5 min interval
let long_break=10000;//=600000; //10 min interval (10 second placeholder currently being used for testing)
let time; //start time
let current_setting = work;
let remaining_time = current_setting;
let timer = null;
let isRunning = false;
let time_passed = 0;
let study_sessions = 0;
let autorun = true;

function start(){
    if (!isRunning){
        time = Date.now() - time_passed;
        
        if (autorun){
            timer = setInterval(updateautorun, 100)
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
    let reset = document.getElementById("reseticon");

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
        //study_sessions++;

        clearInterval(timer);
    }

    if (seconds == 0){
        let num = 0;

        if (localStorage.getItem("break_sessions") == null){
            localStorage.setItem("break_sessions",0);
            console.log(localStorage.getItem("null"));
        }

        if (localStorage.getItem("study_sessions") == null){
            localStorage.setItem("study_sessions",0);
            console.log(localStorage.getItem("null"));
        }

        if (current_setting != work){
            num = parseInt(localStorage.getItem("break_sessions")) + 1;
            localStorage.setItem("break_sessions",num);
        }

        else{
            num = parseInt(localStorage.getItem("study_sessions")) + 1;
            localStorage.setItem("study_sessions",num);
        }
    
        console.log(localStorage.getItem("study_sessions"));
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

    if (seconds == 0){
        let num = 0;

        if (localStorage.getItem("break_sessions") == null){
            localStorage.setItem("break_sessions",0);
            console.log(localStorage.getItem("null"));
        }

        if (localStorage.getItem("study_sessions") == null){
            localStorage.setItem("study_sessions",0);
            console.log(localStorage.getItem("null"));
        }

        if (current_setting != work){
            num = parseInt(localStorage.getItem("break_sessions")) + 1;
            localStorage.setItem("break_sessions",num);
        }

        else{
            num = parseInt(localStorage.getItem("study_sessions")) + 1;
            localStorage.setItem("study_sessions",num);
        }
    
        console.log(localStorage.getItem("study_sessions"));
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

//// Shop code starts here
//
//
//

function Equip(click_id){
    if (click_id === "url(Stars.png)"){
        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
    }

    else if (click_id === "url(Ocean.png)"){
        localStorage.setItem("theme", "#000686");
        localStorage.setItem("accent", "white");
    }

    else if (click_id === "url(Chocolate.png)"){
        localStorage.setItem("theme", "#fdf5f0");
        localStorage.setItem("accent", "#5b2828");
    }

    localStorage.setItem("Background", click_id);
    Load();
}

//// Checklist code starts here
//
//
//

const challenge1 = document.getElementById("ctext1");
const challenge2 = document.getElementById("ctext2");
const challenge3 = document.getElementById("ctext3");

const progress1 = document.getElementById("p1");
const progress2 = document.getElementById("p2");
const progress3 = document.getElementById("p3");

function Task(enteredtask, enteredtasknum) {
  this.task = enteredtask;
  this.tasknum = enteredtasknum;
}

const Studytask1 = new Task("Use the study timer for 10 minutes", 10);

function LoadChallenges(){
    challenge1.textContent = "Studytask1.task";
}