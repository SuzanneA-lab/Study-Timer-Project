

const display = document.getElementById("clock")
const buttons = document.getElementsByClassName("topbutton");
const icons = document.getElementsByClassName("material-symbols-outlined");
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");

const challenge1 = document.getElementById("ctext1");
const challenge2 = document.getElementById("ctext2");
const challenge3 = document.getElementById("ctext3");

const progress1 = document.getElementById("p1");
const progress2 = document.getElementById("p2");
const progress3 = document.getElementById("p3");

const ThemeColours = new Map();

//theme=key, accent=value 
ThemeColours.set("#0a0f72","white");
ThemeColours.set("white","#0a0f72");

function Task(task, tasknum) {
  this.task = task;
  this.tasknum = tasknum;
}

const Studytask1 = new Task("Use the study timer for 10 minutes", 10);

const Studytask1asdasd = { task: "Use the study timer for 10 minutes", tasknum: 10};
const Studytask2 = { task: "Use the study timer for 15 minutes", tasknum: 15};
const Studytask3 = { task: "Use the study timer for 20 minutes", tasknum: 20};

const Buytask1 = { task: "Purchase 1 item from the shop", tasknum: 1};
const Buytask2 = { task: "Purchase 1 Background from the shop", tasknum: 1};
const Buytask3 = { task: "Purchase 1 StudyBuddy from the shop", tasknum: 1};

const Changetask1 = { task: "Change the background theme 1 time", tasknum: 1};
const Changetask2 = { task: "Change/Equip a StudyBuddy 1 time", tasknum: 1};
const Earntask1 = { task: "Earn 10 coins", tasknum: 10};
const Earntask2 = { task: "Earn 20 coins", tasknum: 20};
const Leveltask1 = { task: "level-up 1 time", tasknum: 1};

const Breaktask1 = { task: "Use the break timer for 10 minutes", tasknum: 10};
const Breaktask2 = { task: "Use the break timer for 15 minutes", tasknum: 15};
const Breaktask3 = { task: "Use the break timer for 20 minutes", tasknum: 20};

const Tasks = ["hsadi", "hisad","hsadi", "hisad","hsadi", "hisad","hsadi", "hisad","hsadi", "hisad","hisad","hisad","hisad","hisad",];

/*[Studytask1, Studytask2, Studytask3, Buytask1, Buytask2, 
    Buytask3, Changetask1, Changetask2, Earntask1, Earntask2, Leveltask1, 
    Breaktask1, Breaktask2, Breaktask3];
*/
function Load(){
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

    else if (page == "to-do"){
        let num = Math.random(14);
        
        let Task1 = Tasks[num];
        let Task2 = Tasks[num];
        let Task3 = Tasks[num];

        challenge1.textContent = Task1.task;
        challenge2.textContent = 0;
        challenge3.textContent = 0;
    }

    if (bg === "Stars"){ //bypass later by changing tag to filename - one line instead of ifs
        document.body.style.backgroundImage = 'url(Stars.png)';
    }

    else if (bg === "Ocean"){
        document.body.style.backgroundImage = 'url(Ocean.png)';
    }
    
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

