const display = document.getElementById("clock")
const buttons = document.getElementsByClassName("topbutton");
const icons = document.getElementsByClassName("material-symbols-outlined");
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");
const coincount = document.getElementById("CoinCounter");

//All variables required for Timer functions

let work=1500000; //25 min interval
let short_break=300000; //5 min interval
let long_break=10000;//=600000; //10 min interval (10 second placeholder currently being used for testing)
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

localStorage.setItem("Stars", "Own");
localStorage.setItem("Ocean", "Own");

const ThemeColours = new Map();

//theme=key, accent=value 
ThemeColours.set("#0a0f72","white");
ThemeColours.set("white","#0a0f72");

function Load(){
/*
    let theme = localStorage.getItem("theme");
    let bg = localStorage.getItem("Background");
    let accent;

    if (theme === null || bg === null || !ThemeColours.has(theme)){
        theme = "white";
        accent = "#0a0f72";
        bg = "Stars";
    }

    else {
        accent = ThemeColours.get(theme);
    }

    document.getElementById("Headertext").style.color = theme;  
    coincount.style.background = theme;
    coincount.style.color = accent;

    if (page == "main"){
        for (i=0, len = icons.length; i < len; i++){
            icons[i].style.color = theme;
        }

        for (i=0, len = buttons.length; i < len; i++){
            buttons[i].style.color = accent;
            buttons[i].style.background = theme;
        }

        display.style.color = accent;
        display.style.background = theme;
    }

    if (bg === "Stars"){ //bypass later by changing tag to filename - one line instead of ifs
        document.body.style.backgroundImage = 'url(Stars.png)';
    }

    else if (bg === "Ocean"){
        document.body.style.backgroundImage = 'url(Ocean.png)';
    }
*/
}

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
    let status = localStorage.getItem(click_id)

    if (status === "Own"){
        if (click_id === "Stars"){
            localStorage.setItem("theme", "white");
        }

        else if (click_id === "Ocean"){
            localStorage.setItem("theme", "#0a0f72");
        }
        
        localStorage.setItem("Background", "hi");
        Load();
    }

    localStorage.setItem("Background", click_id);
    Load();
}

/*
function changeUIcolours(item_num){
    if (item_num == 2){
        document.body.style.backgroundImage = 'url(IMG_065.png)';
        document.getElementById("Headertext").style.color = 'black';  
        document.getElementById("menuicon").style.color = 'black';
    }

    else {
        document.body.style.backgroundImage = 'url(tempbg3.png)';
        document.getElementById("Headertext").style.color = 'white';  
        document.getElementById("menuicon").style.color = 'white';
    }
}
*/

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