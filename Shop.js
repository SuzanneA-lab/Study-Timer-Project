//// Code for all pages
//
//
//

const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");
const coindisplaynum = document.getElementById("numcoins");

const root = document.documentElement;
const cover = document.getElementById('cover');

window.onload = Load();

window.addEventListener("DOMContentLoaded", function(){
    //cover.remove()
    //cover.style.visibility = "hidden";
});

function Load(){
    let theme = localStorage.getItem("theme");
    let accent = localStorage.getItem("accent");
    let bg = localStorage.getItem("Background");
    let storedcoins = localStorage.getItem("coins");

    if (theme === null || bg === null || accent == null || storedcoins == null){
        theme = "white";
        accent = "#0a0f72";
        bg = "url(Stars.png)";
        storedcoins = 0;

        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
        localStorage.setItem("Background", "url(Stars.png)");
        localStorage.setItem("coins", 0);
    }

    root.style.setProperty('--theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--background', bg);
    
    coindisplaynum.textContent = storedcoins.padStart(3,"0");
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