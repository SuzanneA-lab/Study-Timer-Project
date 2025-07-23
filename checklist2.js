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

//add new property to Tasks representing progress made in them (ex: 3 for 3/10) (?)
//put the tasks currently being done in local storage with relevant info (?)

const Studytask1 = new Task("Use the study timer for 10 minutes", 10);
const Studytask2 = new Task("Use the study timer for 15 minutes", 15);
const Studytask3 = new Task("Use the study timer for 20 minutes", 20);

const Buytask1 = new Task("Purchase 1 item from the shop", 1);
const Buytask2 = new Task("Purchase 1 Background from the shop", 1)
const Buytask3 = new Task("Purchase 1 StudyBuddy from the shop", 1);

const Changetask1 = new Task("Change the background theme 1 time", 1);
const Changetask2 = new Task("Change/Equip a StudyBuddy 1 time", 1);
const Earntask1 = new Task("Earn 10 coins", 10);
const Earntask2 = new Task("Earn 20 coins", 20);
const Leveltask1 = new Task("level-up 1 time", 1);

const Breaktask1 = new Task( "Use the break timer for 10 minutes", 10);
const Breaktask2 = new Task( "Use the break timer for 15 minutes", 15);
const Breaktask3 = new Task( "Use the break timer for 20 minutes", 20);

const tasks10 = [ Earntask1, Studytask1, Breaktask1, Changetask1];
const tasks15 = [ Breaktask2, Buytask1, Changetask2, Studytask2, Earntask2];
const tasks20 = [ Studytask3, Buytask2, Breaktask3, Leveltask1, Buytask3];

//Currently being used for testing - delete later
localStorage.removeItem("task10");
localStorage.removeItem("task15");
localStorage.removeItem("task20");

//need to make this only choose new challenges on first open (local storage check of which checks have been done)
function LoadChallenges(){
    //let num = Math.floor(Math.random() * 14);
    
    let current10 = localStorage.getItem("task10");
    let progress10 = localStorage.getItem("progress10");

    let current15 = localStorage.getItem("task15");
    let progress15 = localStorage.getItem("progress15");

    let current20 = localStorage.getItem("task20");
    let progress20 = localStorage.getItem("progress20");

    if (current10 == null || progress10 == null){
        localStorage.setItem("task10", 0);
        localStorage.setItem("progress10", 0);
        
        current10 = localStorage.getItem("task10");
        progress10 = localStorage.getItem("progress10");
    }

    challenge1.textContent = tasks10[current10].task;
    progress1.textContent =  progress10 + "/" + tasks10[current10].tasknum;

    if (current15 == null || progress15 == null){
        localStorage.setItem("task15", 0);
        localStorage.setItem("progress15", 0);

        current15 = localStorage.getItem("task15");
        progress15 = localStorage.getItem("progress15");
    }
    
    challenge2.textContent = tasks15[current15].task;
    progress2.textContent =  progress15 + "/" + tasks15[current15].tasknum;

    if (current20 == null || progress20 == null){
        localStorage.setItem("task20", 0);
        localStorage.setItem("progress20", 0);

        current20 = localStorage.getItem("task20");
        progress20 = localStorage.getItem("progress20");
    }
    
    challenge3.textContent = tasks20[current20].task;
    progress3.textContent =  progress20 + "/" + tasks20[current20].tasknum;
}

//// Code for all pages
//
//
//

const root = document.documentElement;
const cover = document.getElementById('cover');

const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");

window.onload = Load();

window.addEventListener("DOMContentLoaded", function(){
    //cover.remove()
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

    LoadChallenges();
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

